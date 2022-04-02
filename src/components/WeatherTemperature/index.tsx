import AnimatedNumbers from 'react-native-animated-numbers'
import Animated, {
  FadeInRight,
  FadeOutLeft,
  Layout
} from 'react-native-reanimated'

import { useTheme } from 'config/theme'

import { colorMode, useOrientation } from 'helper/mode'
import { useTemperature } from 'helper/weather'

import Box from '../Box'
import Heading from '../Heading'
import TemperatureCard from '../TemperatureCard'
import { counterStyles, wrapperStyles } from './styles'

const WeatherTemperature = () => {
  const theme = useTheme()

  const { isPortrait } = useOrientation()

  const { now, min, max } = useTemperature()

  return (
    <Box dir="column" align="stretch" justify="flex-end" css={wrapperStyles}>
      <Animated.View
        layout={Layout}
        entering={FadeInRight}
        exiting={FadeOutLeft}
      >
        <Box dir="row" align="center" justify="flex-end">
          <AnimatedNumbers
            animateToNumber={now}
            fontStyle={{
              ...counterStyles.font,
              color: colorMode(theme.colors.black, theme.colors.white)
            }}
          />
          <Heading size="$headline" color={colorMode('$dark', '$white')} isBold>
            º
          </Heading>
        </Box>
      </Animated.View>
      <Box
        dir={isPortrait ? 'column' : 'row'}
        align={isPortrait ? 'stretch' : 'center'}
        justify="flex-end"
      >
        <Animated.View
          layout={Layout}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <TemperatureCard value={max} spacing="$xs" isMax />
        </Animated.View>
        <Animated.View
          layout={Layout}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <TemperatureCard value={min} />
        </Animated.View>
      </Box>
    </Box>
  )
}

export default WeatherTemperature
