import { useMemo } from 'react'

import { colorMode, useOrientation } from 'helper/mode'

import Box from '../Box'
import Text from '../Text'

interface Props {
  value: number

  unit?: string
  spacing?: string

  isMax?: boolean
}

const TemperatureCard = ({
  value,
  spacing,
  unit = 'C',
  isMax = false
}: Props) => {
  const { isPortrait } = useOrientation()

  const fullLabel = useMemo(() => {
    const label = isMax ? 'Máx.' : 'Mín.'

    return `${label}: ${value}º ${unit}`
  }, [isMax, value, unit])

  return (
    <Box
      br={12}
      css={{
        borderWidth: 1,
        borderColor: isPortrait
          ? colorMode('$darkAlpha100', '$lightAlpha100')
          : 'transparent'
      }}
      py="$xs"
      px="$xs"
      mb={isPortrait ? spacing : 0}
    >
      <Text
        size="$body-sm"
        align="center"
        color={colorMode('$black', '$white')}
        isBold
      >
        {fullLabel}
      </Text>
    </Box>
  )
}

export default TemperatureCard
