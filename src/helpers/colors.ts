import { Main } from 'type/weather'

import { colorMode } from './mode'

const weatherColors = {
  Thunderstorm: [
    ['', '', ''],
    ['', '', '']
  ],
  Drizzle: [
    colorMode('#C4F1F9', '#C4F1F9'),
    colorMode('#76E4F7', '#76E4F7'),
    colorMode('#9DECF9', '#9DECF9'),
    colorMode('#000000', '#000000'),
    colorMode('dark-content', 'dark-content')
  ],
  Rain: [
    colorMode('#4A5568', '#4A5568'),
    colorMode('#1A202C', '#1A202C'),
    colorMode('#2D3748', '#2D3748'),
    colorMode('#000000', '#FFFFFF'),
    colorMode('dark-content', 'dark-content')
  ],
  Snow: [],
  Clear: [
    ['#C6F6D5', '#68D391', '#9AE6B4', '#000000', 'dark-content'],
    ['', '', '']
  ],
  Clouds: [
    colorMode('#4A5568', '#4A5568'),
    colorMode('#1A202C', '#1A202C'),
    colorMode('#2D3748', '#2D3748'),
    colorMode('#000000', '#FFFFFF'),
    colorMode('dark-content', 'light-content')
  ]
}

export const getPaletterFromWeather = (weather: Main) => {
  return weatherColors[weather]
}
