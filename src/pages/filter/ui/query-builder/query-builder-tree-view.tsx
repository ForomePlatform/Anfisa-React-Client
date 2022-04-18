import { ReactElement, useEffect } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { FinalStep } from './ui/final-step'
import { NextStep } from './ui/next-step'

export const QueryBuilderTreeView = observer((): ReactElement => {
  const { filteredStepData, pointCounts } = dtreeStore

  useEffect(() => {
    dtreeStore.updatePointCounts(pointCounts)
    dtreeStore.setAcceptedVariants()
  }, [pointCounts])

  return (
    <div id="parent" className="flex flex-col overflow-auto h-full">
      {filteredStepData.map((element, index: number) => {
        const key = element.groups
          ? JSON.stringify(element.groups) + element.startFilterCounts + index
          : index

        return element.isFinalStep ? (
          <FinalStep key={key} index={index} />
        ) : (
          <NextStep
            key={key}
            index={index}
            changeIndicator={dtreeStore.resultsChangeIndicator}
            isContentExpanded={dtreeStore.isResultsContentExpanded}
          />
        )
      })}
    </div>
  )
})
