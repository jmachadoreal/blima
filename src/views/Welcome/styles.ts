import { Animated } from 'react-native'

import PagerView from 'react-native-pager-view'

import { styled } from 'config/theme'

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

export const Pager = styled(AnimatedPagerView, {
  flex: 1,
  height: '100%',
  align: 'stretch'
})
