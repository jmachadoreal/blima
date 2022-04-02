import axios from 'axios'

const http = axios.create({
  baseURL: 'https://api.openweathermap.org/',
  params: {
    appid: '82287a02a84034d708f5b011edb20021',
    units: 'metric',
    exclude: 'minutely,hourly'
  }
})

export const fetcher = (path: string) => http.get(path).then(res => res.data)

export default http
