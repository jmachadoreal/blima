import { useCallback, useMemo, useRef, useState } from 'react'
import { Animated, StatusBar, useWindowDimensions } from 'react-native'

import * as Location from 'expo-location'
import * as Notifications from 'expo-notifications'

import { useNavigation } from '@react-navigation/native'
import PagerView, {
  PagerViewOnPageScrollEventData
} from 'react-native-pager-view'
import { Edge, SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Feather'
import type { NavigationParameters } from 'route/index'

import { useTheme } from 'config/theme'

import Box from 'component/Box'
import Button from 'component/Button'
import Heading from 'component/Heading'
import Pagination from 'component/Pagination'
import Presentation from 'component/Presentation'

import { colorMode, useOrientation } from 'helper/mode'

import messages from './messages'
import { Pager } from './styles'

const Welcome: React.FC = () => {
  const theme = useTheme()

  const navigation = useNavigation<NavigationParameters>()

  const { width } = useWindowDimensions()
  const { isPortrait, isLandscape } = useOrientation()

  const inputRange = [0, messages.length]

  const pagerRef = useRef<PagerView>(null)
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current
  const positionAnimatedValue = useRef(new Animated.Value(0)).current

  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, messages.length * width]
  })

  const [step, setStep] = useState(0)

  const safeEdges = useMemo<Edge[] | undefined>(() => {
    if (isPortrait) {
      return undefined
    }

    return ['top', 'right']
  }, [isPortrait])

  const onPageScroll = useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue
            }
          }
        ],
        {
          useNativeDriver: false
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const changePage = useCallback(
    (page: number) => {
      pagerRef.current?.setPage(page)
    },
    [pagerRef]
  )

  const requestLocationPermission = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      return false
    }

    setStep(prev => prev + 1)
    changePage(2)
  }, [changePage])

  const requestNotificationPermission = useCallback(async () => {
    const { status } = await Notifications.requestPermissionsAsync()

    if (status !== 'granted') {
      return false
    }

    navigation.replace('App')
  }, [navigation])

  const handleNext = useCallback(() => {
    switch (step) {
      case 0:
        setStep(prev => prev + 1)

        return changePage(1)
      case 1:
        return requestLocationPermission()
      case 2:
        return requestNotificationPermission()
    }
  }, [
    step,
    changePage,
    requestLocationPermission,
    requestNotificationPermission
  ])

  return (
    <SafeAreaView
      edges={safeEdges}
      style={{
        flex: 1,
        backgroundColor: colorMode(theme.colors.white, theme.colors.dark)
      }}
    >
      <StatusBar barStyle={colorMode('dark-content', 'light-content')} />
      <Box
        flex={1}
        dir={isPortrait ? 'column' : 'row'}
        align="stretch"
        justify="space-between"
      >
        <Pager
          ref={pagerRef}
          initialPage={step}
          scrollEnabled={false}
          onPageScroll={onPageScroll}
          css={{
            width: isPortrait ? width : width * 0.66
          }}
        >
          {messages.map(({ key, ...props }) => (
            <Presentation key={key} {...props} isActive={key === step} />
          ))}
        </Pager>
        <Box
          css={{
            width: isPortrait ? width : width * 0.44
          }}
          dir="column"
          align="stretch"
          justify="flex-end"
          pl={isLandscape ? '$md' : 0}
          py={isLandscape ? '$md' : 0}
          pb={isPortrait ? '$md' : 0}
        >
          {isLandscape && (
            <Heading
              color={colorMode('$purple900', '$white')}
              size="$super"
              isBold
            >
              {messages[step].description}
            </Heading>
          )}
          <Box
            dir="row"
            align="flex-end"
            justify="space-between"
            p={isPortrait ? '$md' : 0}
            pb={isLandscape ? '$sm' : 0}
            mt={isLandscape ? '$2xl' : 0}
            css={{ position: 'relative' }}
          >
            <Pagination scrollX={scrollX} pages={3} />
            <Button
              icon={
                <Icon
                  name="arrow-right"
                  color={colorMode(theme.colors.white, theme.colors.black)}
                  size={16}
                />
              }
              onPress={handleNext}
            >
              Prosseguir
            </Button>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  )
}

export default Welcome
