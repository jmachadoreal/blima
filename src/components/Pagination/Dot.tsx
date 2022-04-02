import { useMemo } from 'react'
import { Animated, useWindowDimensions } from 'react-native'

import { useTheme } from 'config/theme'

import { colorMode } from 'helper/mode'

import { styles } from './styles'

interface Props {
  pos: number
  scrollX: Animated.AnimatedInterpolation
}

const Dot = ({ pos, scrollX }: Props) => {
  const theme = useTheme()

  const { width: deviceWidth } = useWindowDimensions()

  const inputRange = useMemo(
    () => [(pos - 1) * deviceWidth, pos * deviceWidth, (pos + 1) * deviceWidth],
    [pos, deviceWidth]
  )

  const width = scrollX.interpolate({
    inputRange,
    outputRange: [theme.sizes.sm, theme.sizes.lg, theme.sizes.sm],
    extrapolate: 'clamp'
  })

  const backgroundColor = scrollX.interpolate({
    inputRange,
    outputRange: [
      colorMode(theme.colors.gray200, theme.colors.lightAlpha200),
      colorMode(theme.colors.black, theme.colors.white),
      colorMode(theme.colors.gray200, theme.colors.lightAlpha200)
    ],
    extrapolate: 'clamp'
  })

  return <Animated.View style={[styles.dot, { width }, { backgroundColor }]} />
}

export default Dot
