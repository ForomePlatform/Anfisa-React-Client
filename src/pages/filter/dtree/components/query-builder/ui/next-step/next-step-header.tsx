import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { formatNumber } from '@core/format-number'
import { usePopover } from '@core/hooks/use-popover'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import stepStore from '@store/dtree/step.store'
import { Icon } from '@ui/icon'
import { Radio } from '@ui/radio'
import { DecisionTreesResultsDataCy } from '@data-testid'
import { changeStep } from '@utils/changeStep'
import { ExpandContentButton } from '../expand-content-button'
import { StepDivider } from '../step-divider'
import { DtreeConditionsOptionsPopover } from './dtree-condition-options/dtree-conditions-options-popover'

interface INextStepHeaderProps {
  isExpanded: boolean
  expandContent: () => void
  index: number
  isExcluded: boolean
}

export const NextStepHeader = observer(
  ({
    isExpanded,
    expandContent,
    index,
    isExcluded,
  }: INextStepHeaderProps): ReactElement => {
    const { isPopoverOpen, popoverAnchor, onToggle, closePopover } =
      usePopover()

    const currentStep = stepStore.filteredSteps[index]
    const { returnPointIndex } = currentStep

    const difference =
      returnPointIndex !== null
        ? dtreeStore.pointCounts[returnPointIndex]?.[dtreeStore.isXl ? 0 : 1]
        : null

    const toggleExclude = (
      stepIndex: number,
      action: 'BOOL-TRUE' | 'BOOL-FALSE',
    ) => {
      dtreeStore.toggleIsExcluded(stepIndex)
      changeStep(stepIndex, action)
    }

    const isEmptyStep = currentStep.groups.length === 0
    const isFirstStep = index === 0
    const isEmptyFirstStep = isEmptyStep && isFirstStep

    return (
      <>
        <div
          style={{ minHeight: 43 }}
          className="flex w-full justify-between items-center mt-1 step-content-area"
        >
          <div className="relative flex items-center">
            {!isEmptyFirstStep && (
              <>
                <div onClick={e => onToggle(e.currentTarget)}>
                  <Icon
                    dataTestId={DecisionTreesResultsDataCy.optionsMenu}
                    name="Options"
                    className="cursor-pointer text-blue-bright"
                    stroke={false}
                  />
                </div>

                <DtreeConditionsOptionsPopover
                  index={index}
                  isOpen={isPopoverOpen}
                  anchorEl={popoverAnchor}
                  onClose={closePopover}
                />
              </>
            )}

            <div className="text-base font-medium">
              {t('dtree.step')}{' '}
              {dtreeStore.algorithmFilterValue ? currentStep.step : index + 1}
            </div>

            {!isExpanded && (difference || difference === 0) && (
              <div className="ml-2 text-14 text-grey-blue font-normal">
                {`(${formatNumber(difference)} variants are ${
                  isExcluded ? 'excluded' : 'included'
                })`}
              </div>
            )}

            <div
              className={cn('flex ml-4', {
                hidden: !currentStep.groups || currentStep.groups.length === 0,
              })}
            >
              <Radio
                id={index + 'include'}
                checked={!currentStep.excluded}
                onChange={() => toggleExclude(index, 'BOOL-TRUE')}
                className="flex items-center mr-3"
              >
                <div className="text-sm font-normal">{t('dtree.include')}</div>
              </Radio>

              <Radio
                id={index + 'exclude'}
                checked={currentStep.excluded}
                onChange={() => toggleExclude(index, 'BOOL-FALSE')}
                className="flex items-center mr-3"
              >
                <div className="text-sm font-normal">{t('dtree.exclude')}</div>
              </Radio>
            </div>
          </div>

          <div className="flex">
            <ExpandContentButton
              isVisible={isExpanded}
              isStep
              expandContent={expandContent}
            />
          </div>
        </div>
        {isExpanded && <StepDivider />}
      </>
    )
  },
)
