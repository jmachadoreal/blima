import type { ScaleValue } from 'stitches-native'

export const border = {
  br: (value: ScaleValue<'radii'>) => ({
    borderRadius: value
  })
}
