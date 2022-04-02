import { useEffect, useMemo, useRef } from 'react'
import { StyleProp, useWindowDimensions, ViewStyle } from 'react-native'

import LottieView from 'lottie-react-native'

import { useOrientation } from 'helper/mode'
import { useAnimationFrame } from 'helper/weather'

const WeatherFrame = () => {
  const animation = useAnimationFrame()

  const { isPortrait } = useOrientation()

  const lottieRef = useRef<LottieView>(null)

  const { width } = useWindowDimensions()

  const style = useMemo<StyleProp<ViewStyle>>(() => {
    if (isPortrait) {
      const size = width / 1.4

      return {
        position: 'absolute',
        width: size,
        height: size,
        left: -(width / 14)
      }
    }

    const size = width / 6

    return {
      position: 'absolute',
      width: size,
      height: size,
      left: 24
    }
  }, [width, isPortrait])

  useEffect(() => {
    if (lottieRef) {
      lottieRef.current?.play()
    }
  }, [lottieRef, animation])

  if (!animation) {
    return null
  }

  return (
    <LottieView
      ref={lottieRef}
      style={style}
      resizeMode="contain"
      source={animation}
    />
  )
}

export default WeatherFrame
