import { useCallback, useEffect, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'

import * as ScreenOrientation from 'expo-screen-orientation'

import { getHook, setHook } from 'react-hooks-outside'

setHook('colorScheme', useColorScheme)

type OrientationResult = {
  isPortrait: boolean
  isLandscape: boolean
}

export const useOrientation = (): OrientationResult => {
  const [orientation, setOrientation] = useState('portrait')

  const isPortrait = useMemo(() => orientation === 'portrait', [orientation])
  const isLandscape = useMemo(() => orientation === 'landscape', [orientation])

  const watchOrientation = useCallback(({ orientationInfo }) => {
    setOrientation(orientationInfo.orientation <= 2 ? 'portrait' : 'landscape')
  }, [])

  useEffect(() => {
    ScreenOrientation.getOrientationAsync().then(result => {
      setOrientation(result <= 2 ? 'portrait' : 'landscape')
    })

    const sub = ScreenOrientation.addOrientationChangeListener(watchOrientation)

    return () => {
      ScreenOrientation.removeOrientationChangeListener(sub)
    }
  }, [watchOrientation])

  return {
    isPortrait,
    isLandscape
  }
}

export const colorMode = (light: any, dark: any) => {
  const colorScheme = getHook('colorScheme')

  const isDark = colorScheme === 'dark'

  if (isDark) return dark

  return light
}

setHook('orientation', useOrientation)

export const orientationMode = (portrait: any, landscape: any) => {
  const { isPortrait } = getHook('orientation')

  if (isPortrait) return portrait

  return landscape
}
