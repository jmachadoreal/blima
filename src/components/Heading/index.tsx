import type { MarginProps } from 'type/theme'

import type { TextProps as RNTextProps } from 'react-native'

import type { VariantProps } from 'stitches-native'

import { Wrapper } from './styles'

type DefaultProps = VariantProps<typeof Wrapper> & RNTextProps & MarginProps

interface Props extends DefaultProps {
  children: string | React.ReactNode
  color?: string
  size?: string
  isBold?: boolean
}

const Heading = ({
  children,
  size: fontSize,
  color,
  isBold = false,
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  ...props
}: Props) => {
  return (
    <Wrapper
      testID="heading"
      {...props}
      css={{
        m,
        mt,
        mr,
        mb,
        ml,
        mx,
        my,
        color,
        fontSize,
        fontFamily: isBold ? '$headingBold' : '$heading'
      }}
    >
      {children}
    </Wrapper>
  )
}

export default Heading
