import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import stepStore from '@store/dtree/step.store'
import {
  AttributeKinds,
  TCondition,
  TNumericConditionBounds,
} from '@service-providers/common'
import { ContentItemHeader } from './content-item-header'
import { ContentItemValues } from './content-item-values'

interface INextStepContentItemProps {
  group: any
  index: number
  stepNo: number
  groupNo: number
  expanded: boolean
  setExpandOnClick: () => void
}

export const NextStepContentItem = observer(
  ({
    group,
    index,
    stepNo,
    groupNo,
    expanded,
    setExpandOnClick,
  }: INextStepContentItemProps): ReactElement => {
    const stepType: AttributeKinds = group[0]
    const groupName: string = group[1]
    const currentStep = stepStore.filteredSteps[index]
    const currentGroup: TCondition = currentStep.groups[groupNo]
    const conditionValue: string[] | TNumericConditionBounds = group.find(
      Array.isArray,
    )

    return (
      <div className="flex flex-col h-auto mb-3">
        <div className="flex flex-col w-full h-auto mr-2 px-2 py-3 rounded-md border border-grey-light step-content-area">
          <ContentItemHeader
            currentStep={currentStep}
            stepType={stepType}
            groupName={groupName}
            stepNo={stepNo}
            groupNo={groupNo}
          />

          <ContentItemValues
            currentGroup={currentGroup}
            stepType={stepType}
            conditionValue={conditionValue}
            groupName={groupName}
            expanded={expanded}
            setExpandOnClick={setExpandOnClick}
          />
        </div>
      </div>
    )
  },
)
