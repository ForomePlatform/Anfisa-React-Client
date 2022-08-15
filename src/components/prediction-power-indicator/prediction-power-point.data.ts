import styles from './prediction-power-point.module.css'

const maxPowerStyles = [
  styles.powerPoint_t4,
  styles.powerPoint_t7,
  styles.powerPoint_t6,
  styles.powerPoint_t5,
]

const midPowerStyles = [
  styles.powerPoint_t4,
  styles.powerPoint_t6,
  styles.powerPoint_t3,
  styles.powerPoint_t5,
]

const lowPowerStyles = [
  styles.powerPoint_t5,
  styles.powerPoint_t2,
  styles.powerPoint_t4,
  styles.powerPoint_t3,
]

const minPowerStyles = [
  styles.powerPoint_t2,
  styles.powerPoint_t4,
  styles.powerPoint_t1,
  styles.powerPoint_t3,
]

export const powerStyles = [
  maxPowerStyles,
  midPowerStyles,
  lowPowerStyles,
  minPowerStyles,
]
