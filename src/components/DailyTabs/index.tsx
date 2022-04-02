import type { ReactNode } from 'react'

import Animated from 'react-native-reanimated'

import { useOrientation } from 'helper/mode'

import Box from '../Box'

interface Props {
  children: ReactNode
}

const DailyTabs = ({ children }: Props) => {
  const { isPortrait } = useOrientation()

  return (
    <Box flex={isPortrait ? 1 : 1.8}>
      <Animated.ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={isPortrait}
      >
        {children}
      </Animated.ScrollView>
    </Box>
  )
}
export default DailyTabs
