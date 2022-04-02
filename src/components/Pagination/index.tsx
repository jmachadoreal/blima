import type {
  BorderProps,
  FlexProps,
  MarginProps,
  PaddingProps
} from 'type/theme'

import { Animated } from 'react-native'

import Box from '../Box'
import Dot from './Dot'
import { Wrapper } from './styles'

type DefaultProps = MarginProps & PaddingProps & FlexProps & BorderProps

interface Props extends DefaultProps {
  pages: number
  scrollX: Animated.AnimatedInterpolation
}

const Pagination = ({ pages: length, scrollX, ...boxStyles }: Props) => {
  return (
    <Box {...boxStyles}>
      <Wrapper>
        {Array.from({ length }).map((_, i: number) => (
          <Dot key={`dot-${i}`} pos={i} scrollX={scrollX} />
        ))}
      </Wrapper>
    </Box>
  )
}

export default Pagination
