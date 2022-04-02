import { useLocation } from 'context/Location'

import { getPaletterFromWeather } from './colors'
import { getMoment } from './date'
import { colorMode } from './mode'
import { getMainTranslation } from './strings'

const animationByState = {
  morn: {
    Clear: require('asset/animations/weather/clear-morn.json'),
    Clouds: require('asset/animations/weather/clouds-morn.json'),
    Drizzle: require('asset/animations/weather/drizzle-morn.json'),
    Mist: require('asset/animations/weather/drizzle-morn.json'),
    Rain: require('asset/animations/weather/rain-morn.json'),
    Snow: require('asset/animations/weather/snow-morn.json'),
    Thunderstorm: require('asset/animations/weather/thunderstorm-morn.json')
  },
  day: {
    Clear: require('asset/animations/weather/clear-day.json'),
    Clouds: require('asset/animations/weather/clouds-day.json'),
    Drizzle: require('asset/animations/weather/drizzle-day.json'),
    Mist: require('asset/animations/weather/drizzle-day.json'),
    Rain: require('asset/animations/weather/rain-day.json'),
    Snow: require('asset/animations/weather/snow-day.json'),
    Thunderstorm: require('asset/animations/weather/thunderstorm-day.json')
  },
  eve: {
    Clear: require('asset/animations/weather/clear-day.json'),
    Clouds: require('asset/animations/weather/clouds-day.json'),
    Drizzle: require('asset/animations/weather/drizzle-day.json'),
    Mist: require('asset/animations/weather/drizzle-day.json'),
    Rain: require('asset/animations/weather/rain-day.json'),
    Snow: require('asset/animations/weather/snow-day.json'),
    Thunderstorm: require('asset/animations/weather/thunderstorm-day.json')
  },
  night: {
    Clear: require('asset/animations/weather/clear-night.json'),
    Clouds: require('asset/animations/weather/clouds-night.json'),
    Drizzle: require('asset/animations/weather/drizzle-night.json'),
    Mist: require('asset/animations/weather/drizzle-night.json'),
    Rain: require('asset/animations/weather/rain-night.json'),
    Snow: require('asset/animations/weather/snow-night.json'),
    Thunderstorm: require('asset/animations/weather/thunderstorm-night.json')
  }
}

export const useAnimationFrame = () => {
  const { data, day, isCurrent } = useLocation()

  if (!data) return undefined

  const moment = getMoment()
  let state = data.daily[day].weather[0].main

  if (isCurrent) {
    state = data.current.weather[0].main
    return animationByState[moment][state]
  }

  return animationByState.day[state]
}

export const usePaletteColors = () => {
  const { data, day, isCurrent } = useLocation()

  if (!data) return colorMode('$white', '$dark')

  const { current, daily } = data

  if (isCurrent) {
    const { main } = current.weather[0]

    return getPaletterFromWeather(main)
  }

  const { main } = daily[day].weather[0]

  return getPaletterFromWeather(main)
}

export const useResume = () => {
  const { data, day, isCurrent } = useLocation()

  if (!data) {
    return ' '
  }

  if (isCurrent) {
    const { weather } = data.current

    return getMainTranslation(weather[0].main)
  }

  const { weather } = data.daily[day]

  return getMainTranslation(weather[0].main)
}

export const useTemperature = () => {
  const { data, day, isCurrent } = useLocation()

  const result = {
    now: 0,
    min: 0,
    max: 0
  }

  if (data) {
    const { current, daily } = data

    const fromDay = daily[day]

    result.min = Number(fromDay.temp.min.toFixed(0))
    result.max = Number(fromDay.temp.max.toFixed(0))

    if (isCurrent) {
      result.now = Number(current.temp.toFixed(0))
    } else {
      result.now = Number(fromDay.temp.day.toFixed(0))
    }
  }

  return result
}

export const useAlert = () => {
  const { data } = useLocation()

  let hasAlert = false
  const payload = {
    title: '',
    description: ''
  }

  if (data && data.alerts) {
    const [alert] = data.alerts

    hasAlert = true
    payload.title = alert.event
    payload.description = alert.description
  }

  return {
    hasAlert,
    payload
  }
}
