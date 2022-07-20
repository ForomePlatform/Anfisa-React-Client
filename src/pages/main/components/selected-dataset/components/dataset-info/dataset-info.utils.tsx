import styles from './dataset-info.module.css'

import cn from 'classnames'

import { t } from '@i18n'
import { CardTitle } from '@ui/card'
import { IDsInfoReceipt } from '@service-providers/dataset-level'
import { Row } from './dataset-info.interfaces'

export const renderRow =
  <T,>(info: T) =>
  ({ field, fieldName, render, optional }: Row<keyof T>, i: number) => {
    const value = info[field]

    if (optional && (!value || (render && !render(value)))) {
      return null
    }

    return (
      <tr key={fieldName + i} className={cn(styles.datasetInfo__table_row)}>
        <td className={cn(styles.datasetInfo__table_row_title)}>{fieldName}</td>
        <td>{render ? render(value) : value}</td>
      </tr>
    )
  }

export const renderAncestor = (receipt: IDsInfoReceipt) => {
  const isFilter = receipt.kind === 'filter'

  const title = `${t(
    `home.infoPanel.filter.${isFilter ? 'filterHeader' : 'dtreeHeader'}`,
  )} ${receipt.base}`
  const fdPrefix = t(
    `home.infoPanel.filter.${isFilter ? 'filterName' : 'dtreeName'}`,
  )
  const fdName = isFilter ? receipt['filter-name'] : receipt['dtree-name']
  const conditions = isFilter
    ? receipt['f-presentation']
    : receipt['dtree-code']?.split(/\n/)

  const updated = receipt['eval-update-info']
  const panelSupply = receipt['panels-supply']

  return (
    <div key={receipt.base}>
      <CardTitle
        text={title}
        size="sm"
        className={cn(styles.datasetInfo__title)}
      />
      {fdName && (
        <span className={styles.datasetInfo__ancestor__filter}>
          {fdPrefix}
          <span className={styles.datasetInfo__ancestor__filter_name}>
            {fdName}
          </span>
          {updated?.every(Boolean) && (
            <>
              &nbsp;
              {t('home.infoPanel.filter.updated', {
                at: updated[0],
                from: updated[1],
              })}
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
          {Object.entries(panelSupply).map(panel => (
            <span key={panel[0]}>
              {t('home.infoPanel.filter.suppliedPanels')}
              <span className={styles.datasetInfo__ancestor__filter_name}>
                {panel[0]}
              </span>
              : {panel[1].join(', ')}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
