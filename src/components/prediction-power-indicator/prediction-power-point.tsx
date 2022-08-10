import styles from './prediction-power-point.module.css'

import cn from 'classnames'

import { getPowerStylesByValue } from './prediction-power-point.utils'

interface IPredictionPowerPointProps {
  value: number
}

export const PredictionPowerPoint = ({ value }: IPredictionPowerPointProps) => {
  const powerStyles = getPowerStylesByValue(value)
  return (
    <>
      {powerStyles.map(powerStyle => (
        <div className={cn(styles.powerPoint, powerStyle)} />
      ))}
    </>
  )
}
