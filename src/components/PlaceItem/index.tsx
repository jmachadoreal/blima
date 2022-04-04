import { Pressable } from 'react-native'

import Box from 'component/Box'
import Text from 'component/Text'

import { colorMode } from 'helper/mode'

interface Props {
  label: string
  onPress: () => void
}

const PlaceItem = ({ label, onPress }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        p="$sm"
        br="$md"
        mb="$xxs"
        css={{
          backgroundColor: colorMode('$gray100', '$lightAlpha100')
        }}
      >
        <Text numberOfLines={1} color={colorMode('$gray400', '$lightAlpha300')}>
          {label}
        </Text>
      </Box>
    </Pressable>
  )
}

export default PlaceItem
