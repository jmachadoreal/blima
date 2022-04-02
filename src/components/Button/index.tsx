import type { MarginProps } from 'type/theme'

import type { ReactElement } from 'react'
import type { PressableProps } from 'react-native'

import type { VariantProps } from 'stitches-native'

import { colorMode } from 'helper/mode'

import Box from '../Box'
import Text from '../Text'
import { Wrapper } from './styles'

type DefaultProps = VariantProps<typeof Wrapper> & PressableProps & MarginProps

interface Props extends DefaultProps {
  children: string
  icon?: ReactElement
}

const Button = ({ children, icon, ...props }: Props) => {
  return (
    <Wrapper
      {...props}
      css={{
        backgroundColor: colorMode('$dark', '$white')
      }}
    >
      <Text color={colorMode('$white', '$black')} isBold>
        {children}
      </Text>
      {icon && <Box ml="$sm">{icon}</Box>}
    </Wrapper>
  )
}

export default Button
