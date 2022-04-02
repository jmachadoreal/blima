import type {
  BorderProps,
  FlexProps,
  MarginProps,
  PaddingProps
} from 'type/theme'

import type { CSS } from 'stitches-native'

import { Wrapper } from './styles'

type DefaultProps = MarginProps & PaddingProps & FlexProps & BorderProps

export interface BoxProps extends DefaultProps {
  children?: React.ReactNode
  css?: CSS
}

const Box = ({ children, css, ...styles }: BoxProps) => {
  // @ts-ignore
  return <Wrapper css={{ ...styles, ...css }}>{children}</Wrapper>
}

export default Box
