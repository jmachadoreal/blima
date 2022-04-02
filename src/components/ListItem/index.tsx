import Icon from 'react-native-vector-icons/Feather'

import { useTheme } from 'config/theme'

import Box from 'component/Box'
import Text from 'component/Text'

import { colorMode } from 'helper/mode'

import { containerStyles, iconStyles } from './styles'

interface Props {
  icon: string
  title: string
  value: string
}

const ListItem = ({ icon, title, value }: Props) => {
  const theme = useTheme()

  return (
    <Box
      dir="row"
      align="center"
      br="$md"
      p="$sm"
      css={{
        ...containerStyles,
        borderColor: colorMode('$darkAlpha50', '$lightAlpha100')
      }}
    >
      <Box
        align="center"
        justify="center"
        mr="$sm"
        css={{
          ...iconStyles,
          backgroundColor: colorMode('$gray100', '$lightAlpha100')
        }}
      >
        <Icon
          name={icon}
          size={20}
          color={colorMode(theme.colors.purple500, theme.colors.purple400)}
        />
      </Box>
      <Box>
        <Text
          size="$caption"
          color={colorMode('$darkAlpha300', '$lightAlpha300')}
        >
          {title}
        </Text>
        <Text size="$body-lg" color={colorMode('$black', '$white')} isBold>
          {value}
        </Text>
      </Box>
    </Box>
  )
}

export default ListItem
