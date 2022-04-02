import type { MarginProps } from 'type/theme'

import type { TextProps as RNTextProps } from 'react-native'

import type { VariantProps } from 'stitches-native'

import { removeEmpty } from 'helper/object'

import { Wrapper } from './styles'

type DefaultProps = VariantProps<typeof Wrapper> & RNTextProps & MarginProps

interface Props extends DefaultProps {
  children: string
  color?: string
  size?: string
  align?: 'left' | 'center' | 'right'
  isBold?: boolean
}

const Text = ({
  children,
  size: fontSize,
  color,
  isBold = false,
  align = 'left',
  ...defaultProps
}: Props) => {
  const { m, mt, mr, mb, ml, mx, my, ...props } = defaultProps

  return (
    <Wrapper
      {...props}
      css={{
        ...removeEmpty({ m, mx, my, mt, mr, mb, ml }),
        color,
        fontSize,
        textAlign: align,
        fontFamily: isBold ? '$bodyBold' : '$body'
      }}
    >
      {children}
    </Wrapper>
  )
}

export default Text
