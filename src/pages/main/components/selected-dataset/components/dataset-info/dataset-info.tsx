import styles from './dataset-info.module.css'

import { FC, useMemo, useRef } from 'react'
import cn, { Argument } from 'classnames'
import { startCase } from 'lodash'
import { observer } from 'mobx-react-lite'

import { useFullScreenView } from '@core/hooks/use-fullscreen-view'
import { t } from '@i18n'
import datasetStore from '@store/dataset/dataset'
import { Card, CardTitle } from '@ui/card'
import { Icon } from '@ui/icon'
import { Loader } from '@ui/loader'
import { Ancestors } from '@pages/main/components/selected-dataset/components/dataset-info/components/ancestors'
import { TableRows } from '@pages/main/components/selected-dataset/components/dataset-info/components/table-rows'
import { Versions } from '@service-providers/dataset-level'
import { INFO } from './dataset-info.constants'
import { Row } from './dataset-info.interfaces'

interface IDatasetInfoProps {
  className?: Argument
}

export const DatasetInfo: FC<IDatasetInfoProps> = observer(({ className }) => {
  const ref = useRef<HTMLDivElement>(null)

  const [isExpanded, toggle] = useFullScreenView(ref)

  const { dsInfoData: info, isLoading } = datasetStore
  const versions = info?.meta.versions
  const receipts = info?.receipts

  const versionsRows = useMemo(
    () =>
      Object.keys(versions || {}).map(
        (key: string): Row<keyof Versions> => ({
          fieldName: startCase(key),
          field: key as keyof Versions,
          optional: true,
        }),
      ),
    [versions],
  )

  return (
    <Card ref={ref} className={cn(styles.datasetInfo, className)}>
      <header
        className={cn(
          styles.datasetInfo_header,
          styles.datasetInfo__title,
          styles.datasetInfo__title_first,
        )}
      >
        <CardTitle text={t('home.infoPanel.title')} size="sm" />

        <button
          onClick={toggle}
          className={cn(styles.datasetInfo_header_button)}
        >
          <Icon name={isExpanded ? 'Collapse' : 'Expand'} />
        </button>
      </header>

      {isLoading && (
        <Loader size="m" className={cn(styles.datasetInfo__loader)} />
      )}

      {!isLoading && info && (
        <>
          <table>
            <tbody>
              <TableRows info={info} rows={INFO} />

              <tr>
                <td colSpan={2}>
                  <CardTitle
                    text={t('home.infoPanel.annotations')}
                    size="sm"
                    className={cn(styles.datasetInfo__title)}
                  />
                </td>
              </tr>

              <TableRows info={versions} rows={versionsRows} />
            </tbody>
          </table>

          <Ancestors receipts={receipts} />
        </>
      )}
    </Card>
  )
})
