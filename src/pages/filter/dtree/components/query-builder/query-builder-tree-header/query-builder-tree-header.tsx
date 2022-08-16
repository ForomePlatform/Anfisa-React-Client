import styles from './query-builder-tree-header.module.css'

import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'
import { observer } from 'mobx-react-lite'

import { EvalStatus } from '@core/enum/eval-status'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { QueryBuilderSearch } from '../query-builder-search'

interface IQueryBuilderTreeHeaderProps {
  className?: Argument
}

export const QueryBuilderTreeHeader = observer(
  ({ className }: IQueryBuilderTreeHeaderProps): ReactElement => {
    return (
      <div
        className={cn(
          styles.queryBuilderTreeHeader,
          'flex bg-grey-tertiary',
          className,
        )}
      >
        <div
          className={cn(
            styles.queryBuilderTreeHeader__treeHeader,
            'border-r border-grey-light pl-4',
          )}
        >
          <div className="font-medium mr-2">{t('dtree.tree')}</div>
        </div>

        <div
          className={cn(styles.queryBuilderTreeHeader__resultsHeader, 'px-4')}
        >
          {dtreeStore.evalStatus === EvalStatus.Runtime && (
            <>
              <div className="flex px-2 whitespace-nowrap text-red-light text-12 bg-red-lighter rounded-xl">
                {t('error.runtimeProblem')}
              </div>

              <div className="h-1/3 w-1 bg-grey-disabled mx-3" />
            </>
          )}

          <div className="font-medium mr-3">{t('dtree.algorithm')}</div>

          <QueryBuilderSearch
            value={dtreeStore.algorithmFilterValue}
            onChange={(e: string) => dtreeStore.setAlgorithmFilterValue(e)}
            showSwitcher
            isSwitched={dtreeStore.algorithmFilterFullWord}
            onSwitch={dtreeStore.setAlgorithmFilterFullWord}
          />
        </div>
      </div>
    )
  },
)
