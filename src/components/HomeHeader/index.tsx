import Box from 'component/Box'
import SearchAction from 'component/SearchAction'
import Text from 'component/Text'

import { colorMode } from 'helper/mode'
import { useResume } from 'helper/weather'

const HomeHeader = () => {
  const resume = useResume()

  return (
    <Box px="$md" pt="$sm">
      <SearchAction />
      <Text
        align="center"
        size="$body-lg"
        mt="$sm"
        color={colorMode('$darkAlpha300', '$lightAlpha300')}
      >
        {resume}
      </Text>
    </Box>
  )
}

export default HomeHeader
