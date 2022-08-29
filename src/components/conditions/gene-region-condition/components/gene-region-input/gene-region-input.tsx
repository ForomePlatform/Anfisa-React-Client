import styles from './gene-region-input.module.css'

import { FC } from 'react'
import cn from 'classnames'

import { Input } from '@ui/input'
import { IGeneRegionInputProps } from '../../gene-region.interface'
import { LocusPlaceholder } from '../../gene-region-condition.data'

export const GeneRegionInput: FC<IGeneRegionInputProps> = ({
  value,
  onChange,
  classname,
}) => (
  <div className={cn(styles.container, classname)}>
    <Input
      type="text"
      value={value}
      onChange={e => {
        onChange(e.target.value)
      }}
      className={styles.input}
      placeholder={LocusPlaceholder}
      shape="brick"
      size="m"
    />
  </div>
)
