import { useCallback, useMemo, useRef } from 'react'
import { Pressable, StatusBar } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef
} from 'react-native-google-places-autocomplete'
import Animated, {
  FadeInLeft,
  FadeInRight,
  Layout
} from 'react-native-reanimated'
import { Edge, SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Feather'
import type { NavigationParameters } from 'route/index'

import { useTheme } from 'config/theme'

import { useLocation } from 'context/Location'

import Box from 'component/Box'

import { colorMode, useOrientation } from 'helper/mode'

import { styles } from './styles'

const Browser = () => {
  const theme = useTheme()

  const inputRef = useRef<GooglePlacesAutocompleteRef>(null)

  const navigation = useNavigation<NavigationParameters>()

  const { defaultLoc, label, updateLabel, updateLoc, updateDay } = useLocation()

  const { isPortrait } = useOrientation()

  const safeEdges = useMemo<Edge[] | undefined>(() => {
    if (isPortrait) {
      return ['top', 'right', 'left']
    }

    return ['top']
  }, [isPortrait])

  const myPlace = useMemo(
    () => ({
      description: label,
      geometry: { location: { lat: defaultLoc[0], lng: defaultLoc[1] } }
    }),
    [defaultLoc, label]
  )

  const handleSelectPlace = useCallback(
    (_, { formatted_address, geometry }) => {
      const { lat, lng } = geometry.location

      updateLabel(formatted_address)
      updateLoc([lat, lng])
      updateDay(0)

      navigation.goBack()
    },
    [updateLabel, updateLoc, updateDay, navigation]
  )

  return (
    <SafeAreaView
      edges={safeEdges}
      style={[
        {
          flex: 1,
          flexDirection: isPortrait ? 'column' : 'row-reverse',
          backgroundColor: colorMode(theme.colors.white, theme.colors.dark)
        }
      ]}
    >
      <StatusBar barStyle={colorMode('dark-content', 'light-content')} />
      <Box flex={1}>
        <Box
          align="center"
          dir="row"
          p="$md"
          pt="$sm"
          css={{ position: 'relative', width: '100%' }}
        >
          <Animated.View
            layout={Layout}
            entering={FadeInRight}
            exiting={FadeInLeft}
          >
            <Pressable
              onPress={navigation.goBack}
              style={[
                styles.backButton,
                {
                  backgroundColor: colorMode(
                    theme.colors.yellow500,
                    theme.colors.black
                  )
                }
              ]}
            >
              <Icon
                name="arrow-left"
                size={16}
                color={colorMode(theme.colors.black, theme.colors.yellow600)}
              />
            </Pressable>
          </Animated.View>
          <GooglePlacesAutocomplete
            ref={inputRef}
            placeholder="Buscar por cidade..."
            onPress={handleSelectPlace}
            query={{
              key: 'AIzaSyCGHi3g25kqUbduOze4KBoeW1_7nEZ6Xi4',
              language: 'pt-BR'
            }}
            onFail={error => console.log(error)}
            textInputProps={{
              autoFocus: true,
              clearButtonMode: 'never',
              placeholderTextColor: colorMode(
                theme.colors.darkAlpha300,
                theme.colors.lightAlpha300
              )
            }}
            fetchDetails
            keepResultsAfterBlur
            keyboardShouldPersistTaps="always"
            enablePoweredByContainer={false}
            predefinedPlaces={[myPlace]}
            numberOfLines={1}
            styles={{
              container: {
                marginLeft: 8,
                borderRadius: 100
              },
              textInputContainer: {
                height: 56,
                fontFamily: 'DMSans700',
                borderRadius: 64
              },
              textInput: {
                height: 52,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 24,
                paddingRight: 24,
                borderRadius: 64,
                backgroundColor: colorMode(
                  theme.colors.gray100,
                  theme.colors.black
                ),
                borderWidth: 1,
                borderColor: colorMode(
                  theme.colors.darkAlpha100,
                  theme.colors.black
                ),
                fontFamily: 'DMSans700',
                color: colorMode(theme.colors.black, theme.colors.white),
                margin: 0,
                fontSize: 14
              },
              listView: {
                position: 'absolute',
                top: 72,
                left: -52,
                right: 0,
                backgroundColor: colorMode(
                  theme.colors.white,
                  theme.colors.black
                ),
                borderRadius: 16,
                marginTop: 10,
                borderColor: colorMode(
                  theme.colors.gray200,
                  theme.colors.black
                ),
                borderWidth: 1
              },
              description: {
                fontSize: 16,
                color: colorMode(theme.colors.black, theme.colors.white)
              },
              row: {
                padding: 20,
                backgroundColor: theme.colors.lightAlpha200,
                borderBottomColor: theme.colors.black,
                height: 58
              },
              predefinedPlacesDescription: {
                color: theme.colors.yellow300
              }
            }}
          />
        </Box>
      </Box>
    </SafeAreaView>
  )
}

export default Browser
