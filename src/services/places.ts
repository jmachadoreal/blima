import axios from 'axios'
import useSWR from 'swr'

const http = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/',
  params: {
    key: 'AIzaSyCGHi3g25kqUbduOze4KBoeW1_7nEZ6Xi4'
  }
})

const fetcher = (path: string) => http.get(path).then(res => res.data)

export const useAutocomplete = (search?: string) => {
  const { data, error } = useSWR(
    search &&
      `place/autocomplete/json?language=pt-br&types=geocode&input=${search}`,
    {
      fetcher
    }
  )

  return {
    data,
    error,
    isLoading: !data && !error
  }
}

export const usePlaceDetail = (placeId?: string) => {
  const { data, error } = useSWR(
    placeId &&
      `place/details/json?language=pt-br&fields=formatted_address,geometry&place_id=${placeId}`,
    {
      fetcher
    }
  )

  return {
    data,
    error,
    isLoading: !data && !error
  }
}
