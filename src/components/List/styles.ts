import { StyleSheet } from 'react-native'

import Animated from 'react-native-reanimated'

export const Scroller = Animated.ScrollView

export const styles = StyleSheet.create({
  content: {
    paddingLeft: 12,
    paddingRight: 24
  }
})
