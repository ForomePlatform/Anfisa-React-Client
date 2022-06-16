import styles from './samples-cell.module.css'

import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { alpha, parseColor } from '@core/colors'
import { theme } from '@theme'
import zoneStore from '@store/ws/zone'
import { ShadowScroller } from '@ui/shadow-scroller'
import { ICellProps } from '../cell.interface'
import { handleSampleMouseEnter } from './samples-cell.utils'

const shadowColor = alpha(parseColor(theme('colors.blue.hover')), 0.15)

export const SamplesCell = observer(({ className, row, style }: ICellProps) => {
  const value = row.Samples
  const { specialSamples } = zoneStore

  const entries = Object.entries(value)

  const content = entries.map(([key, sample], index) => (
    <div
      key={key}
      className={cn(
        styles.samples__sample,
        specialSamples[index] && styles[`samples__sample_${index}`],
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
  ))

  return (
    <td className={cn(className, styles.samples)} style={style}>
      {content.length > 3 ? (
        <ShadowScroller
          hideScrollbars
          shadowSize={16}
          shadowColor={shadowColor}
          direction="horizontal"
          className={styles.samples__scroller}
          contentClassName={styles.samples__scrollerContent}
        >
          {content}
        </ShadowScroller>
      ) : (
        <div className={styles.samples__wrapper}>{content}</div>
      )}
    </td>
  )
})

SamplesCell.displayName = 'SamplesCell'
