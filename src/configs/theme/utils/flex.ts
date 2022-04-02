import type { FlexDirection, FlexPosition } from 'type/generic'

export const flex = {
  dir: (value: FlexDirection) => ({
    flexDirection: value
  }),
  align: (value: FlexPosition) => ({
    alignItems: value
  }),
  justify: (value: FlexPosition) => ({
    justifyContent: value
  })
}
