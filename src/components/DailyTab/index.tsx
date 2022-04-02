import { Daily } from 'type/weather'

import { useMemo } from 'react'
import { Pressable, useWindowDimensions } from 'react-native'

import dayjs from 'dayjs'
import Animated, { FadeInDown, FadeInUp, Layout } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Feather'

import { useTheme } from 'config/theme'

import { useOrientation, colorMode } from 'helper/mode'

import Box from '../Box'
import Heading from '../Heading'
import Text from '../Text'

interface Props {
  i: number
  tz: string

  item: Daily

  isActive: boolean

  onPress: () => void
}

const DailyTab = ({ i, item, tz, isActive, onPress }: Props) => {
  const theme = useTheme()

  const { isPortrait } = useOrientation()

  const { bottom, left, right } = useSafeAreaInsets()
  const { width } = useWindowDimensions()

  const backgroundColor = useMemo(
    () => (isActive ? colorMode('$yellow500', '$yellow700') : '$yellow200'),
    [isActive]
  )

  const safeIsRight = useMemo(() => right > left, [left, right])
  const safePadding = useMemo(
    () => (left > right ? left : right),
    [left, right]
  )

  const icon = useMemo(() => {
    const { main } = item.weather[0]

    switch (main) {
      case 'Thunderstorm':
        return 'cloud-lightning'
      case 'Drizzle':
        return 'cloud-drizzle'
      case 'Rain':
        return 'cloud-rain'
      case 'Snow':
        return 'cloud-snow'
      case 'Clear':
        return 'sun'
      case 'Clouds':
        return 'cloud'
    }
  }, [item])

  const date = useMemo(() => {
    const { dt } = item

    const date = dayjs(dt * 1000).tz(tz)

    if (date.isToday()) {
      return 'Hoje'
    }

    if (date.isTomorrow()) {
      return 'Amanhã'
    }

    return date.format('DD [de] MMM')
  }, [item, tz])

  return (
    <Animated.View
      entering={FadeInDown.delay(i * 100)}
      exiting={FadeInUp.delay(i * 100)}
      layout={Layout}
    >
      <Pressable onPress={onPress}>
        <Box
          dir={isPortrait ? 'column' : 'row'}
          align={isPortrait ? 'stretch' : 'flex-start'}
          justify="space-between"
          css={{
            backgroundColor,
            height: isPortrait ? '100%' : 'auto',
            width: isPortrait ? width / 2.4 : '100%',
            pt: '$md',
            pl: isPortrait || safeIsRight ? '$md' : safePadding + 8,
            pr: isPortrait || !safeIsRight ? '$md' : safePadding + 8,
            pb: isPortrait ? bottom + theme.space.xs : '$md'
          }}
        >
          <Box
            dir={isPortrait ? 'row' : 'column'}
            align={isPortrait ? 'center' : 'flex-start'}
            justify="space-between"
          >
            <Icon
              name={icon}
              size={isPortrait ? 24 : 32}
              color={colorMode(
                theme.colors.darkAlpha400,
                theme.colors.darkAlpha400
              )}
            />
            <Text
              mt={isPortrait ? 0 : '$xs'}
              size={isPortrait ? undefined : '$body-lg'}
              color={isPortrait ? '$darkAlpha300' : '$black'}
              isBold={!isPortrait}
            >
              {date}
            </Text>
          </Box>
          <Heading
            size={isPortrait ? '$title' : '$super'}
            color={colorMode('$black', '$black')}
            isBold
          >
            {item.temp.day.toFixed(0)}ºC
          </Heading>
        </Box>
      </Pressable>
    </Animated.View>
  )
}

export default DailyTab
