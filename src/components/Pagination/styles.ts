import { Animated, StyleSheet } from 'react-native'

import { styled } from 'config/theme'

export const Wrapper = styled(Animated.View, {
  position: 'absolute',
  flexDirection: 'row',
  alignSelf: 'center',
  bottom: 20,
  left: 0
})

export const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginHorizontal: 4
  }
})
