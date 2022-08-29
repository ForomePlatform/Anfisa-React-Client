import styles from './filter-right-column.module.css'

import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { copyToClipboard } from '@core/copy-to-clipboard'
import { formatNumber } from '@core/format-number'
import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset/dataset'
import filterStore from '@store/filter'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { Loader } from '@ui/loader'
import { FilterRefinerStatCounts } from '@pages/filter/refiner/components/right-column/filter-refiner-stat-counts'
import { showToast } from '@utils/notifications/showToast'
import { FilterConditions } from './filter-conditions'

interface IFilterRightColumnProps {
  className?: string
  onViewVariants: () => void
}

export const FilterRightColumn = observer(
  ({ className, onViewVariants }: IFilterRightColumnProps): ReactElement => {
    const history = useHistory()
    const params = useParams()

    const {
      conditions,
      isConditionsFetching,
      selectedConditionIndex,
      selectedCondition,
      stat: { filteredCounts },
    } = filterStore

    const filteredVariantsCount = filteredCounts?.variants

    const handleApplyClick = () => {
      const conditions = JSON.stringify(filterStore.conditions)

      filteredVariantsCount == null || filteredVariantsCount > 2600
        ? showToast(t('filter.tooMuchVariants'), 'error')
        : history.push(
            `${Routes.WS}?ds=${params.get('ds')}&conditions=${conditions}`,
            {
              prevPage: 'refiner',
            },
          )
    }

    const clearSelectedFilter = () => {
      if (!selectedCondition) {
        return
      }
      filterStore.removeCondition(selectedConditionIndex)
    }

    const copySelectedFilter = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!selectedCondition) {
        return
      }

      copyToClipboard(selectedCondition[1])
      showToast(t('ds.copied'), 'info')
    }

    const isDisabledApplyButton =
      isConditionsFetching ||
      filteredVariantsCount == null ||
      !conditions.length ||
      !filteredVariantsCount

    return (
      <div className={cn(styles.querySelected, className)}>
        <div
          className={cn(
            styles.querySelected__results,
            'flex items-center px-4 py-3 border-b border-grey-disabled bg-grey-tertiary',
          )}
        >
          <div>
            <span className="font-bold text-20">{t('dtree.results')}</span>
            <FilterRefinerStatCounts
              className="text-12 font-medium leading-14px mt-1"
              counts={!isConditionsFetching ? filteredCounts : undefined}
            />
          </div>

          {datasetStore.isXL ? (
            <Button
              className="ml-auto"
              onClick={onViewVariants}
              text={t('dtree.viewVariants')}
            />
          ) : (
            <Button
              className="ml-auto"
              text={t('filter.viewVariants', {
                amount: formatNumber(filteredVariantsCount),
              })}
              disabled={isDisabledApplyButton}
              onClick={handleApplyClick}
            />
          )}
        </div>
        {!isConditionsFetching && conditions.length > 0 && (
          <div
            className={cn(
              styles.querySelected__count,
              'flex items-center flex-row-reverse px-7 py-3 text-14',
            )}
          >
            <Icon
              name="Delete"
              className={cn(
                styles.querySelected__actionIcon,
                selectedCondition && styles.querySelected__actionIcon_active,
              )}
              onClick={clearSelectedFilter}
            />
            <Icon
              name="Copy"
              className={cn(
                styles.querySelected__actionIcon,
                selectedCondition && styles.querySelected__actionIcon_active,
              )}
              onClick={copySelectedFilter}
            />
          </div>
        )}
        {isConditionsFetching ? (
          <Loader />
        ) : (
          <FilterConditions className={styles.querySelected__conditions} />
        )}
      </div>
    )
  },
)
