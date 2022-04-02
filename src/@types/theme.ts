import type { ScaleValue } from 'stitches-native'

import { FlexDirection, FlexPosition } from './generic'

export type UtilsValue = number | string

export type MarginUtils = 'm' | 'mt' | 'mr' | 'mb' | 'ml' | 'mx' | 'my'
export type PaddingUtils = 'p' | 'pt' | 'pr' | 'pb' | 'pl' | 'px' | 'py'

export type MarginProps = {
  [key in MarginUtils]?: ScaleValue<'space'> | number | string
}

export type PaddingProps = {
  [key in PaddingUtils]?: ScaleValue<'space'> | number | string
}

export type BorderProps = {
  br?: ScaleValue<'radii'> | number | string
}

export type FlexProps = {
  flex?: number
  dir?: FlexDirection
  align?: FlexPosition
  justify?: FlexPosition
}
