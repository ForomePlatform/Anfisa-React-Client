import styles from './dataset-info.module.css'

import { FC, useMemo } from 'react'
import cn, { Argument } from 'classnames'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'

import { useFullScreenView } from '@core/hooks/use-fullscreen-view'
import datasetStore from '@store/dataset/dataset'
import { Card, CardTitle } from '@ui/card-main'
import { Loader } from '@ui/loader'
import { IDsInfo, Versions } from '@service-providers/dataset-level'
import { INFO } from './dataset-info.constants'
import { Row } from './dataset-info.interfaces'
import { renderAncestor, renderRow } from './dataset-info.utils'

interface IDatasetInfoProps {
  className?: Argument
}

export const DatasetInfo: FC<IDatasetInfoProps> = observer(({ className }) => {
  const id = 'InfoDetailsContaoner'

  const [isExpanded, toggle] = useFullScreenView(id)

  const isLoading = datasetStore.isLoading
  const info = datasetStore.dsInfoData
  const versions = info?.meta.versions
  const receipts = info?.receipts

  const versionsRaws = useMemo(
    () =>
      Object.keys(versions || {}).map(
        (it: string): Row<keyof Versions> => ({
          fieldName: _.startCase(it),
          field: it as keyof Versions,
          optional: true,
        }),
      ),
    [versions],
  )

  return (
    <Card id={id} className={cn(styles.datasetInfo, className)}>
      <CardTitle showExpandButton onExpand={toggle} isExpanded={isExpanded}>
        Info
      </CardTitle>

      {isLoading && (
        <Loader size="m" className={cn(styles.datasetInfo__loader)} />
      )}

      {!isLoading && info && (
        <>
          <table>
            <tbody>
              {INFO.map(renderRow<IDsInfo>(info))}

              <tr>
                <td colSpan={2}>
                  <CardTitle className={cn(styles.datasetInfo__title)}>
                    Annotation sources versions
                  </CardTitle>
                </td>
              </tr>

              {versions && versionsRaws.map(renderRow<Versions>(versions))}
            </tbody>
          </table>

          {receipts && receipts.map(renderAncestor)}
        </>
      )}
    </Card>
  )
})
