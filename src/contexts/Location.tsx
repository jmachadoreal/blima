import { WeatherResponse } from 'type/weather'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import * as Location from 'expo-location'

import AnimatedSplash from 'react-native-animated-splash-screen'
import type { KeyedMutator } from 'swr'

import { useTheme } from 'config/theme'

import { useWeather } from 'service/weather'

import { colorMode } from 'helper/mode'

interface Context {
  day: number

  defaultLoc: number[]
  loc: number[]
  label: string

  data: WeatherResponse

  isCurrent: boolean
  isLoading: boolean

  mutate: KeyedMutator<any>

  updateLabel: (label: string) => void
  updateLoc: (loc: number[]) => void
  updateDay: (index: number) => void
}

const LocationContext = createContext({} as Context)

const LocationProvider: React.FC = ({ children }) => {
  const theme = useTheme()

  const [day, updateDay] = useState(0)

  const [defaultLoc, setMyLoc] = useState([0, 0])

  const [loc, updateLoc] = useState([0, 0])
  const [label, updateLabel] = useState('')

  const [isDecoding, setDecoding] = useState(true)

  const { data, error, mutate, isValidating } = useWeather(loc)

  const isLoading = useMemo(
    () => (!data && !error) || isDecoding,
    [data, error, isDecoding]
  )

  const isCurrent = useMemo(() => day === 0, [day])

  const getUserLocation = useCallback(async () => {
    setDecoding(true)

    const {
      coords: { latitude, longitude }
    } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced
    })

    updateLoc([latitude, longitude])

    const [location] = await Location.reverseGeocodeAsync({
      latitude,
      longitude
    })

    setMyLoc([latitude, longitude])

    updateLabel(
      `${location.city}, ${location.region} - ${location.isoCountryCode}`
    )

    setDecoding(false)
  }, [])

  useEffect(() => {
    getUserLocation()
  }, [getUserLocation])

  return (
    <AnimatedSplash
      isLoaded={!isLoading || !isValidating}
      logoImage={require('asset/brand.png')}
      backgroundColor={colorMode(theme.colors.white, theme.colors.dark)}
      logoHeight={56}
      logoWidth={56}
    >
      <LocationContext.Provider
        value={{
          defaultLoc,
          loc,
          day,
          label,

          data,

          isLoading,
          isCurrent,

          mutate,

          updateLoc,
          updateDay,
          updateLabel
        }}
      >
        {children}
      </LocationContext.Provider>
    </AnimatedSplash>
  )
}

export const useLocation = () => {
  const location = useContext(LocationContext)

  return location
}

export default LocationProvider
