import type { Timezone } from './timezone'

export type Main =
  | 'Thunderstorm'
  | 'Drizzle'
  | 'Rain'
  | 'Snow'
  | 'Clear'
  | 'Clouds'

export type Weather = {
  id: number
  main: Main
  description: string
  icon: string
}

export type Alert = {
  sender_name: string
  event: string
  description: string
  start: number
  end: number
  tags: Main[]
}

export type Current = {
  dt: number
  sunrise: number
  sunset: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  win_gust: number
  weather: Weather[]
}

export type Temperature = {
  day: number
  min: number
  max: number
  night: number
  eve: number
  morn: number
}

export type FeelsLike = Omit<Temperature, 'min' | 'max'>

export type Daily = Omit<Current, 'temp' | 'feels_like'> & {
  moonrise: number
  moonset: number
  moon_phase: number
  pop: number
  rain: number
  temp: Temperature
  feels_like: FeelsLike
}

export interface WeatherResponse {
  lat: number
  long: number
  timezone: Timezone
  timezone_offset: number
  current: Current
  daily: Daily[]
  alerts?: Alert[]
}
