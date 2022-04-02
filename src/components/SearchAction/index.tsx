import { useCallback, useMemo } from 'react'
import { Pressable } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import { NavigationParameters } from 'route/index'

import { useTheme } from 'config/theme'

import { useLocation } from 'context/Location'

import { colorMode } from 'helper/mode'

import Box from '../Box'
import Text from '../Text'
import { containerStyle } from './styles'

const SearchAction = () => {
  const theme = useTheme()

  const navigation = useNavigation<NavigationParameters>()

  const { label, isLoading } = useLocation()

  const memoisedLabel = useMemo(() => {
    if (isLoading) {
      return 'Carregando...'
    }

    return label
  }, [isLoading, label])

  const handlePress = useCallback(() => {
    navigation.push('Browser')
  }, [navigation])

  return (
    <Pressable onPress={handlePress}>
      <Box
        py="$sm"
        px="$xl"
        dir="row"
        br="$full"
        align="center"
        justify="center"
        css={{
          ...containerStyle,
          backgroundColor: colorMode('$gray100', '$black'),
          borderColor: colorMode('$darkAlpha50', '$black')
        }}
      >
        <Box mr="$xs" css={{ position: 'relative' }}>
          <Icon
            size={16}
            name="search"
            testID="search-action-icon"
            color={theme.colors.yellow600}
          />
        </Box>
        <Text
          isBold
          color={colorMode('$dark', '$white')}
          size="$body-sm"
          testID="search-action-label"
          numberOfLines={1}
        >
          {memoisedLabel}
        </Text>
      </Box>
    </Pressable>
  )
}

export default SearchAction
