import { Pressable } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import Animated, {
  FadeInLeft,
  FadeInRight,
  Layout
} from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Feather'
import type { NavigationParameters } from 'route/index'

import { useTheme } from 'config/theme'

import { colorMode } from 'helper/mode'

const BackButton: React.FC = () => {
  const theme = useTheme()

  const navigation = useNavigation<NavigationParameters>()

  return (
    <Animated.View layout={Layout} entering={FadeInRight} exiting={FadeInLeft}>
      <Pressable
        onPress={navigation.goBack}
        style={{
          position: 'relative',
          width: 52,
          height: 52,
          borderRadius: 52,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colorMode(theme.colors.yellow500, theme.colors.black)
        }}
      >
        <Icon
          name="arrow-left"
          size={16}
          color={colorMode(theme.colors.black, theme.colors.yellow600)}
        />
      </Pressable>
    </Animated.View>
  )
}

export default BackButton
