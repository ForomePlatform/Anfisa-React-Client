import styles from './samples-cell.module.css'

import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ICellProps } from '../cell.interface'
import { handleSampleMouseEnter } from './samples-cell.utils'

export const SamplesCell = observer(
  ({ className, row, style, samples }: ICellProps) => {
    const value = row.Samples

    return (
      <td className={cn(className, styles.samples)} style={style}>
        {Object.entries(value).map(([key, sample]) => (
          <div
            key={key}
            className={cn(
              styles.samples__sample,
              samples.includes(key) && styles[`samples__sample_${key}`],
            )}
            onMouseEnter={handleSampleMouseEnter}
          >
            <div className={styles.samples__text}>
              {key}
              <br />
              {sample.genotype}
              <br />
              {sample.g_quality}
            </div>
          </div>
        ))}
      </td>
    )
  },
)
