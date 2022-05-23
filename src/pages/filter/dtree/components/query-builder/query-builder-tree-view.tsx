import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import stepStore from '@store/dtree/step.store'
import { FinalStep } from './ui/final-step'
import { NextStep } from './ui/next-step/next-step'

export const QueryBuilderTreeView = observer((): ReactElement => {
  return (
    <div id="parent" className="flex flex-col overflow-auto h-full">
      {stepStore.steps.map((element, index: number) => {
        const key = element.groups
          ? JSON.stringify(element.groups) + index
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
