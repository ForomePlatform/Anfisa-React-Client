import { ReactElement, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { t } from '@i18n'
import stepStore from '@store/dtree/step.store'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import { TCondition, TNumericConditionBounds } from '@service-providers/common'
import { DropDownJoin } from '../dropdown-join'
import { ContentItemHeader } from './content-item-header'
import { ContentItemValues } from './content-item-values'

const JoinType = styled.div`
  width: 34px;
  height: 28px;
`

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
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const stepType: FilterKindEnum = group[0]
    const groupName: string = group[1]
    const currentStep = stepStore.filteredSteps[index]
    const currentGroup: TCondition = currentStep.groups[groupNo]
    const conditionValue: string[] | TNumericConditionBounds = group.find(
      Array.isArray,
    )

    return (
      <div className="flex flex-col h-auto">
        {groupNo > 0 && (
          <div
            className={cn(
              'flex w-full h-2/5 py-2 text-14 font-normal items-center relative step-content-area',
              currentStep.isActive && 'bg-blue-tertiary',
            )}
            data-testid={DecisionTreeModalDataCy.joinByLabel}
          >
            <div className="mr-1">{t('dtree.joinBy')}</div>
            <JoinType className="flex items-center justify-center bg-orange-light text-orange-bright">
              {group.includes('or') && 'OR'}
              {group.includes('and') && 'AND'}
            </JoinType>

            {isVisible && (
              <DropDownJoin
                close={() => setIsVisible(false)}
                index={index}
                groupNo={groupNo}
              />
            )}
          </div>
        )}

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
