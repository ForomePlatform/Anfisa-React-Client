import styles from '@pages/main/components/selected-dataset/components/dataset-info/dataset-info.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { CardTitle } from '@ui/card'
import { IDsInfoReceipt } from '@service-providers/dataset-level'

interface IAncestorsProps {
  receipts: IDsInfoReceipt[] | undefined
}

export const Ancestors = ({
  receipts,
}: IAncestorsProps): ReactElement | null => {
  if (!receipts) {
    return null
  }

  return (
    <>
      {receipts.map((receipt: IDsInfoReceipt) => {
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
      })}
    </>
  )
}
