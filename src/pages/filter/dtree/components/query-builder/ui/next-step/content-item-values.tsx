import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import {
  AttributeKinds,
  ConditionJoinMode,
  TCondition,
  TNumericConditionBounds,
} from '@service-providers/common'
import { getNumericExpression } from '@utils/getNumericExpression'
import { AllModeWrapper } from './all-mode-wrapper'
import { NotModeWrapper } from './not-mode-wrapper'

interface IContentItemValuesProps {
  currentGroup: TCondition
  stepType: AttributeKinds
  groupName: string
  conditionValue: string[] | TNumericConditionBounds
  expanded: boolean
  setExpandOnClick: () => void
}

const LIMIT_SIZE = 3

export const ContentItemValues = observer(
  ({
    currentGroup,
    stepType,
    groupName,
    conditionValue,
    expanded,
    setExpandOnClick,
  }: IContentItemValuesProps): ReactElement => {
    const isStepNonNumericAndValid: boolean =
      stepType !== AttributeKinds.NUMERIC && stepType !== AttributeKinds.ERROR

    const isNotMode = currentGroup[2] === ConditionJoinMode.NOT
    const isAllMode = currentGroup[2] === ConditionJoinMode.AND

    const getButtonMessage = () => {
      if (stepType === AttributeKinds.NUMERIC) return ''

      const size = conditionValue.length - LIMIT_SIZE

      return expanded ? `Hide ${size} variants` : `Show ${size} variants`
    }

    return (
      <div className="flex flex-row step-content-area">
        {isNotMode && (
          <NotModeWrapper className="flex items-center justify-center">
            {'not'}
          </NotModeWrapper>
        )}

        {isAllMode && (
          <AllModeWrapper className="flex items-center justify-center rounded-sm">
            {'all'}
          </AllModeWrapper>
        )}

        <div className="flex flex-col text-14 font-normal h-full flex-wrap mt-1 pl-1">
          {stepType === AttributeKinds.NUMERIC &&
            getNumericExpression(conditionValue, groupName)}

          {isStepNonNumericAndValid &&
            conditionValue
              ?.slice(0, expanded ? Number.MAX_SAFE_INTEGER : LIMIT_SIZE)
              .map(item => <div key={Math.random()}>{item}</div>)}

          {isStepNonNumericAndValid && conditionValue?.length > 3 && (
            <div
              className="text-blue-bright cursor-pointer"
              onClick={setExpandOnClick}
            >
              {getButtonMessage()}
            </div>
          )}
        </div>
      </div>
    )
  },
)
