import { memo, useEffect, useMemo, useRef } from 'react'
import { useWindowDimensions } from 'react-native'

import LottieView from 'lottie-react-native'

import { colorMode, useOrientation } from 'helper/mode'

import Box from '../Box'
import Heading from '../Heading'

interface Props {
  description: string
  lightAnimation: any
  darkAnimation: any
  isActive: boolean
}

const Presentation = ({
  description,
  lightAnimation,
  darkAnimation,
  isActive
}: Props) => {
  const lottieRef = useRef<LottieView>(null)

  const { isPortrait, isLandscape } = useOrientation()

  const { width } = useWindowDimensions()

  const bgColor = useMemo(() => {
    if (isPortrait) {
      return 'transparent'
    }

    return colorMode('$gray100', '$black')
  }, [isPortrait])

  useEffect(() => {
    const lottie = lottieRef.current

    if (isActive) {
      setTimeout(() => {
        lottie?.reset()
        lottie?.play()
      }, 100)
    } else {
      lottie?.pause()
    }

    return () => {
      lottie?.pause()
    }
  }, [lottieRef, isActive, isPortrait])

  return (
    <Box
      css={{ height: '100%', backgroundColor: bgColor }}
      align="stretch"
      justify={isPortrait ? 'space-between' : 'stretch'}
      px={isPortrait ? '$md' : 0}
      pr={isPortrait ? '$md' : 0}
      pt={isPortrait ? '$2xl' : '$md'}
      pb={isPortrait ? '$md' : '$xl'}
    >
      <Box pl={isLandscape ? '$lg' : 0}>
        <LottieView
          ref={lottieRef}
          style={{
            width: isPortrait ? width : '100%',
            height: isPortrait ? '80%' : '100%',
            right: -10
          }}
          resizeMode="contain"
          source={colorMode(lightAnimation, darkAnimation)}
        />
      </Box>
      {isPortrait && (
        <Heading color={colorMode('$purple900', '$white')} size="$super" isBold>
          {description}
        </Heading>
      )}
    </Box>
  )
}

export default memo(Presentation)
