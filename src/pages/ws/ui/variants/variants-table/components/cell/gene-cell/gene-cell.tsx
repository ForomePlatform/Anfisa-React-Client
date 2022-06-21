import styles from './gene-cell.module.css'

import cn from 'classnames'

import { ICellProps } from '../cell.interface'

export const GeneCell = ({ className, style, row }: ICellProps) => {
  const {
    ColorCode: color,
    GeneColored: [value],
  } = row

  return (
    <td className={className} style={style}>
      <div className={styles.gene}>
        {color && (
          <span
            className={cn(styles.gene__icon, styles[`gene__icon_${color}`])}
          />
        )}
        <div className={styles.gene__name}>
          {value.map(gene => (
            <div key={gene}>{gene}</div>
          ))}
        </div>
      </div>
    </td>
  )
}
