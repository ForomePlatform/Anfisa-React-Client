import styles from './prediction-power-point.module.css'

import cn from 'classnames'

import { getPowerStylesByValue } from './prediction-power-point.utils'

interface IPredictionPowerPointProps {
  value: number
}

export const PredictionPowerPoint = ({ value }: IPredictionPowerPointProps) => {
  const powerStyle = getPowerStylesByValue(value)
  return (
    <>
      <div className={cn(styles.powerPoint, powerStyle[0])} />
      <div className={cn(styles.powerPoint, powerStyle[1])} />
      <div className={cn(styles.powerPoint, powerStyle[2])} />
      <div className={cn(styles.powerPoint, powerStyle[3])} />
    </>
  )
}
