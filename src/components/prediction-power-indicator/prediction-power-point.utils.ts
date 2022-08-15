import { powerStyles } from './prediction-power-point.data'

export const getPowerStylesByValue = (value: number): string[] => {
  if (value <= 0.01) {
    return powerStyles[3]
  }

  if (value <= 0.1) {
    return powerStyles[2]
  }

  if (value <= 0.2) {
    return powerStyles[1]
  }

  return powerStyles[0]
}
