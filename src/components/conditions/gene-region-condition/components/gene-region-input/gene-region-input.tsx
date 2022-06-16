import styles from './gene-region-input.module.css'

import { FC } from 'react'
import cn from 'classnames'

import { IGeneRegionInputProps } from '../../gene-region.interface'

export const GeneRegionInput: FC<IGeneRegionInputProps> = ({
  value,
  onChange,
  classname,
}) => (
  <div className={cn(styles.container, classname)}>
    <input
      type="text"
      value={value}
      onChange={e => {
        onChange(e.target.value)
      }}
      className={styles.input}
    />
  </div>
)
