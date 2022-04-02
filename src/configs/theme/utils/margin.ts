import type { ScaleValue } from 'stitches-native'

type Value = ScaleValue<'space'> | number | string

export const margin = {
  m: (value: Value) => ({
    margin: value
  }),
  mt: (value: Value) => ({
    marginTop: value
  }),
  mr: (value: Value) => ({
    marginRight: value
  }),
  mb: (value: Value) => ({
    marginBottom: value
  }),
  ml: (value: Value) => ({
    marginLeft: value
  }),
  mx: (value: Value) => ({
    marginLeft: value,
    marginRight: value
  }),
  my: (value: Value) => ({
    marginTop: value,
    marginBottom: value
  })
}
