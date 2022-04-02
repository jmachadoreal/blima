import { colorMode } from 'helper/mode'

import Box from '../Box'
import Text from '../Text'

interface Props {
  title: string
  description: string
}

const Alert = ({ title, description }: Props) => {
  return (
    <Box px="$md">
      <Box
        p="$sm"
        br="$xl"
        css={{ backgroundColor: colorMode('$darkAlpha50', '$lightAlpha100') }}
        mb="$sm"
      >
        <Text mb="$xxs" color={colorMode('$dark', '$white')} isBold>
          {title}
        </Text>
        <Text
          size="$caption"
          color={colorMode('$darkAlpha400', '$lightAlpha400')}
        >
          {description}
        </Text>
      </Box>
    </Box>
  )
}

export default Alert
