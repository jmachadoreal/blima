export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'
export type FlexPosition =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'space-between'

export type OmitGet<T> = {
  [K in keyof T as K extends `get${infer _}` ? never : K]: T[K]
}
