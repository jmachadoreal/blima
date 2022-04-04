import { useEffect, useState } from 'react'

import { useDebounce } from 'use-debounce'

import { useAutocomplete, usePlaceDetail } from 'service/places'

import { colorMode } from 'helper/mode'

import { Input } from './styles'

interface Props {
  selected?: string
  onResult: (result: any) => void
  onProcess: (data: any) => void
}

const AutocompleteInput = ({ selected, onResult, onProcess }: Props) => {
  const [value, setValue] = useState('')
  const [debouncedValue] = useDebounce(value, 100)

  const { data, isLoading } = useAutocomplete(debouncedValue)

  const { data: place } = usePlaceDetail(selected)

  useEffect(() => {
    if (!isLoading) {
      const { predictions } = data

      if (predictions && predictions.length > 0) {
        onResult?.(
          predictions.map((prediction: any) => ({
            description: prediction.description,
            placeId: prediction.place_id
          }))
        )
      }
    }
  }, [data, onResult, isLoading])

  useEffect(() => {
    if (place) {
      onProcess(place)
    }
  }, [place, onProcess])

  return (
    <Input
      placeholder="Busque por uma cidade"
      value={value}
      onChangeText={setValue}
      autoFocus
      css={{
        backgroundColor: colorMode('$gray100', '$black'),
        borderColor: colorMode('$gray200', '$black'),
        color: colorMode('$black', '$white')
      }}
    />
  )
}

export default AutocompleteInput
