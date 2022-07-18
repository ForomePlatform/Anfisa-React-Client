import styles from './dataset-info.module.css'

import cn from 'classnames'

import { CardTitle } from '@ui/card-main'
import { IDsInfoReceipt } from '@service-providers/dataset-level'
import { Row } from './dataset-info.interfaces'

export const renderRow =
  <T,>(info: T) =>
  (it: Row<keyof T>) => {
    const value = info[it.field]

    if (it.optional && (!value || (it.render && !it.render(value)))) {
      return null
    }

    return (
      <tr key={it.fieldName} className={cn(styles.datasetInfo__table_row)}>
        <td className={cn(styles.datasetInfo__table_row_title)}>
          {it.fieldName}
        </td>
        <td>{it.render ? it.render(value) : value}</td>
      </tr>
    )
  }

export const renderAncestor = (it: IDsInfoReceipt) => {
  const isFilter = it.kind === 'filter'

  const title = `${
    isFilter ? 'Filter applied in' : 'Decision tree code applied in'
  } ${it.base}`
  const fdPrefix = isFilter ? 'Filter name: ' : 'Tree name: '
  const fdName = isFilter ? it['filter-name'] : it['dtree-name']
  const conditions = isFilter
    ? it['f-presentation']
    : it['dtree-code']?.split(/\n/)

  const updated = it['eval-update-info']
  const panelSupply = it['panels-supply']

  return (
    <div key={it.base}>
      <CardTitle className={cn(styles.datasetInfo__title)}>{title}</CardTitle>
      {fdName && (
        <span className={styles.datasetInfo__ancestor__filter}>
          {fdPrefix}
          <span className={styles.datasetInfo__ancestor__filter_name}>
            {fdName}
          </span>
          {updated?.every(Boolean) && (
            <>
              &nbsp;updated at {updated[0]} from {updated[1]}
            </>
          )}
        </span>
      )}
      <div className={styles.datasetInfo__ancestor__conditions}>
        {conditions?.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
      {panelSupply && (
        <div className={styles.datasetInfo__ancestor__supplyPanel}>
          {Object.entries(panelSupply).map(it => (
            <span key={it[0]}>
              Supplied panels for type{' '}
              <span className={styles.datasetInfo__ancestor__filter_name}>
                {it[0]}
              </span>
              : {it[1].join(', ')}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
