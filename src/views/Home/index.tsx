import { useMemo } from 'react'
import { StatusBar } from 'react-native'

import { Edge, SafeAreaView } from 'react-native-safe-area-context'

import { useTheme } from 'config/theme'

import { useLocation } from 'context/Location'

import Box from 'component/Box'
import DailyTab from 'component/DailyTab'
import DailyTabs from 'component/DailyTabs'
import Header from 'component/HomeHeader'
import Infos from 'component/WeatherInfos'
import Hero from 'component/WeatherStats'

import { colorMode, useOrientation } from 'helper/mode'

import { styles } from './styles'

const Home = () => {
  const theme = useTheme()

  const { data, day, updateDay } = useLocation()

  const { isPortrait } = useOrientation()

  const safeEdges = useMemo<Edge[] | undefined>(() => {
    if (isPortrait) {
      return ['top', 'right', 'left']
    }

    return ['top']
  }, [isPortrait])

  const items = useMemo(() => {
    if (!data) return []

    return data.daily.map((item: any, index: number) => ({
      key: `daily-${index}`,
      i: index,
      tz: data.timezone,
      item,
      isActive: day === index,
      onPress: () => updateDay(index)
    }))
  }, [data, day, updateDay])

  return (
    <SafeAreaView
      edges={safeEdges}
      style={[
        styles.page,
        {
          flexDirection: isPortrait ? 'column' : 'row-reverse',
          backgroundColor: colorMode(theme.colors.white, theme.colors.dark)
        }
      ]}
    >
      <StatusBar barStyle={colorMode('dark-content', 'light-content')} />
      <Box flex={4.2}>
        <Header />
        <Hero />
        <Infos />
      </Box>
      <DailyTabs>
        {items.map((item: any) => (
          <DailyTab key={item.key} {...item} />
        ))}
      </DailyTabs>
    </SafeAreaView>
  )
}

export default Home
