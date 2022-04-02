import useSWR from 'swr'

export const useWeather = (loc: number[]) => {
  const [lat, lon] = loc

  let query: string | undefined

  if (lat !== 0 && lon !== 0) {
    query = `/data/2.5/onecall?lat=${lat}&lon=${lon}`
  }

  const { data, error, mutate, isValidating } = useSWR(query)

  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading: !data && !error
  }
}
