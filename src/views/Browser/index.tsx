import { useCallback, useMemo, useState } from 'react'
import { StatusBar } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { Edge, SafeAreaView } from 'react-native-safe-area-context'
import { NavigationParameters } from 'route/index'

import { useTheme } from 'config/theme'

import { useLocation } from 'context/Location'

import AutocompleteInput from 'component/AutocompleteInput'
import BackButton from 'component/BackButton'
import Box from 'component/Box'
import PlaceItem from 'component/PlaceItem'

import { colorMode, useOrientation } from 'helper/mode'

type Item = {
  placeId: string
  description: string
}

const Browser = () => {
  const theme = useTheme()
  const navigation = useNavigation<NavigationParameters>()

  const { updateLabel, updateLoc, updateDay } = useLocation()

  const [items, setItems] = useState<Item[]>([])
  const [selected, updateSelected] = useState<string | undefined>()

  const { isPortrait } = useOrientation()

  const safeEdges = useMemo<Edge[] | undefined>(() => {
    if (isPortrait) {
      return ['top', 'right', 'left']
    }

    return ['top']
  }, [isPortrait])

  const handleSelect = (index: string) => () => {
    updateSelected(index)
  }

  const handleProcess = useCallback(
    ({ result }: any) => {
      const { formatted_address, geometry } = result
      const { lat, lng } = geometry.location

      updateLabel(formatted_address)
      updateLoc([lat, lng])
      updateDay(0)

      navigation.goBack()
    },
    [navigation, updateLabel, updateLoc, updateDay]
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
      <Box>
        <Box align="center" dir="row" p="$md" pt="$sm">
          <Box mr="$sm">
            <BackButton />
          </Box>
          <AutocompleteInput
            selected={selected}
            onResult={setItems}
            onProcess={handleProcess}
          />
        </Box>
      </Box>
      <Box flex={1} pt={0} p="$md">
        {items.map(item => (
          <PlaceItem
            key={item.placeId}
            label={item.description}
            onPress={handleSelect(item.placeId)}
          />
        ))}
      </Box>
    </SafeAreaView>
  )
}

export default Browser
