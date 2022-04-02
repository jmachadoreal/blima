import Box from 'component/Box'

import Frame from '../WeatherFrame'
import Temperature from '../WeatherTemperature'

const WeatherStats: React.FC = () => {
  return (
    <Box
      dir="row"
      align="center"
      justify="flex-end"
      px="$md"
      py="$md"
      css={{ position: 'relative' }}
      flex={1}
    >
      <Frame />
      <Temperature />
    </Box>
  )
}

export default WeatherStats
