import { useMemo } from 'react'

import { useLocation } from 'context/Location'

import { useOrientation } from 'helper/mode'
import { useAlert } from 'helper/weather'

import Alert from '../Alert'
import Box from '../Box'
import List from '../List'
import ListItem from '../ListItem'

const WeatherInfos = () => {
  const { data, day } = useLocation()

  const { isPortrait } = useOrientation()

  const { hasAlert, payload } = useAlert()

  const items = useMemo(() => {
    if (!data) return []

    const { current, daily } = data

    const other = daily[day]

    const items = [
      {
        icon: 'thermometer',
        title: 'Sensação térmica',
        value: `${other.feels_like.day.toFixed(0)}°C`
      },
      {
        icon: 'sun',
        title: 'Índice UV',
        value: `${other.uvi.toFixed(0)}`
      },
      {
        icon: 'droplet',
        title: 'Umidade',
        value: `${other.humidity.toFixed(0)}%`
      },
      {
        icon: 'compass',
        title: 'Veloc. dos Ventos',
        value: `${other.wind_speed.toFixed(2)} km/h`
      }
    ]

    if (day === 0) {
      items[0].value = `${current.feels_like.toFixed(0)}°C`
    }

    return items
  }, [data, day])

  return (
    <Box py="$md" pb={isPortrait ? '$md' : '$lg'}>
      {isPortrait && hasAlert && <Alert {...payload} />}
      <List>
        {items.map((item, index) => (
          <ListItem key={`info-${index}`} {...item} />
        ))}
      </List>
    </Box>
  )
}

export default WeatherInfos
