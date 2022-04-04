import axios from 'axios'
import useSWR from 'swr'

const http = axios.create({
  baseURL: 'https://api.openweathermap.org/',
  params: {
    appid: '82287a02a84034d708f5b011edb20021',
    units: 'metric',
    exclude: 'minutely,hourly'
  }
})

const fetcher = (path: string) => http.get(path).then(res => res.data)

export const useWeather = (loc: number[]) => {
  const [lat, lon] = loc

  let query: string | undefined

  if (lat !== 0 && lon !== 0) {
    query = `/data/2.5/onecall?lat=${lat}&lon=${lon}`
  }

  const { data, error, mutate, isValidating } = useSWR(query, {
    fetcher
  })

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading: !data && !error
  }
}
