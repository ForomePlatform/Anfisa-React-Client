import { EnumValue, Glb } from '@glb/glb'

export type RangeSliderValue =
  | [number | null | undefined, number | null | undefined]
  | [number | null | undefined]

export const RangeSliderMode = Glb.makeEnum({
  Single: 'single',
  Range: 'range',
})

export type RangeSliderMode = EnumValue<typeof RangeSliderMode>

export const RangeSliderScale = Glb.makeEnum({
  Linear: 'linear',
  Logarithmic: 'logarithmic',
})

export type RangeSliderScale = EnumValue<typeof RangeSliderScale>

export enum RangeSliderSide {
  None = 0,
  Left = 1,
  Right = 2,
  Both = 3,
}
