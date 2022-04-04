import React, { useCallback, useEffect, useMemo, useState } from 'react'

import {
  DMSans_400Regular as DMSans400,
  DMSans_700Bold as DMSans700
} from '@expo-google-fonts/dm-sans'
import {
  Montserrat_400Regular as Montserrat400,
  Montserrat_700Bold as Montserrat700,
  Montserrat_800ExtraBold as Montserrat800
} from '@expo-google-fonts/montserrat'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import * as Location from 'expo-location'
import * as Notifications from 'expo-notifications'

import { NavigationContainer } from '@react-navigation/native'
import dayjs from 'dayjs'
import todayPlugin from 'dayjs/plugin/isToday'
import tomorrowPlugin from 'dayjs/plugin/isTomorrow'
import relativePlugin from 'dayjs/plugin/relativeTime'
import timezonePlugin from 'dayjs/plugin/timezone'
import utcPlugin from 'dayjs/plugin/utc'
import { ReactHooksWrapper } from 'react-hooks-outside'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SWRConfig } from 'swr'

import { theme, ThemeProvider } from 'config/theme'

import 'dayjs/locale/pt-br'
import Routes from './routes'

dayjs.extend(utcPlugin)
dayjs.extend(todayPlugin)
dayjs.extend(tomorrowPlugin)
dayjs.extend(timezonePlugin)
dayjs.extend(relativePlugin)
dayjs.locale('pt-br')

export default function Main() {
  const [fontsLoaded] = useFonts({
    Montserrat400,
    Montserrat700,
    Montserrat800,
    DMSans400,
    DMSans700
  })

  const [hasPermissions, setPermissions] = useState<boolean>()

  const initialRoute = useMemo(
    () => (hasPermissions ? 'App' : 'Welcome'),
    [hasPermissions]
  )

  const checkPermissions = useCallback(async () => {
    const locationPermission = await Location.getForegroundPermissionsAsync()
    const notificationPermissions = await Notifications.getPermissionsAsync()

    const locationAccess = locationPermission.status === 'granted'
    const notificationAccess = notificationPermissions.status === 'granted'

    setPermissions(locationAccess && notificationAccess)
  }, [])

  useEffect(() => {
    checkPermissions()
  }, [checkPermissions])

  if (!fontsLoaded || hasPermissions === undefined) {
    return <AppLoading />
  }

  return (
    <SWRConfig>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <ReactHooksWrapper />
          <NavigationContainer>
            <Routes initialRoute={initialRoute} />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </SWRConfig>
  )
}
