import { ScaleValue } from 'stitches-native'

type Value = ScaleValue<'space'> | number | string

export const padding = {
  p: (value: Value) => ({
    padding: value
  }),
  pt: (value: Value) => ({
    paddingTop: value
  }),
  pr: (value: Value) => ({
    paddingRight: value
  }),
  pb: (value: Value) => ({
    paddingBottom: value
  }),
  pl: (value: Value) => ({
    paddingLeft: value
  }),
  px: (value: Value) => ({
    paddingLeft: value,
    paddingRight: value
  }),
  py: (value: Value) => ({
    paddingTop: value,
    paddingBottom: value
  })
}
