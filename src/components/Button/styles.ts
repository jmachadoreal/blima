import { styled } from 'config/theme'

import { colorMode } from 'helper/mode'

export const Wrapper = styled('Pressable', {
  dir: 'row',
  align: 'center',
  justify: 'center',
  backgroundColor: colorMode('$black', '$white'),
  br: '$4xl',
  px: '$md',
  py: '$sm'
})
