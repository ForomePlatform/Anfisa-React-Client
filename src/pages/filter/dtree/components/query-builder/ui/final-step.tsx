import styles from './next-step/next-step.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import stepStore, {
  ActiveStepOptions,
  CreateEmptyStepPositions,
} from '@store/dtree/step.store'
import { Button } from '@ui/button'
import { Radio } from '@ui/radio'
import { changeStep } from '@utils/changeStep'
import { NextStepRoute } from './next-step/next-step-route'
import { StepDivider } from './step-divider'

interface IFinalStepProps {
  index: number
}

export const FinalStep = observer(
  ({ index }: IFinalStepProps): ReactElement => {
    const currentStep = stepStore.filteredSteps[index]
    const stepNo = stepStore.filteredSteps[index].step
    const isPrevStepEmpty =
      !stepStore.steps[stepStore.steps.length - 2].groups.length

    const setStepActive = (stepIndex: number, event: any) => {
      const classList = Array.from(event.target.classList)

      const shouldMakeActive = classList.includes('step-content-area')

      if (shouldMakeActive) {
        stepStore.makeStepActive({
          index: stepNo,
          option: ActiveStepOptions.StartedVariants,
        })
      }
    }

    const toggleExclude = (
      stepIndex: number,
      action: 'BOOL-TRUE' | 'BOOL-FALSE',
    ) => {
      dtreeStore.toggleIsExcluded(stepIndex)
      changeStep(stepIndex, action)
    }

    return (
      <div className="flex flex-col mb-2">
        <div className="flex">
          <div
            className={cn(
              styles.nextStep__treeView,
              'pr-3',
              currentStep.isReturnedVariantsActive ? 'bg-blue-tertiary' : '',
            )}
          >
            <NextStepRoute
              isExpanded={true}
              index={index}
              stepNo={stepNo}
              isIncluded={!currentStep.excluded}
            />
          </div>

          <div
            className={cn(
              styles.nextStep__resultsView,
              'border-l border-grey-light font-medium px-5 relative',
              currentStep.isActive && 'bg-blue-tertiary',
            )}
            onClick={event => setStepActive(index, event)}
          >
            <div className="flex w-full items-center step-content-area">
              <div className="mb-2 mt-2 text-base font-medium">
                {t('dtree.finalStep')}
              </div>

              <div className="flex ml-4">
                <Radio
                  id={index + 'include'}
                  checked={!currentStep.excluded}
                  onChange={() => toggleExclude(index, 'BOOL-TRUE')}
                  className="flex items-center mr-3"
                >
                  <div className="text-sm font-normal">
                    {t('dtree.include')}
                  </div>
                </Radio>

                <Radio
                  id={index + 'exclude'}
                  checked={currentStep.excluded}
                  onChange={() => toggleExclude(index, 'BOOL-FALSE')}
                  className="flex items-center mr-3"
                >
                  <div className="text-sm font-normal">
                    {t('dtree.exclude')}
                  </div>
                </Radio>
              </div>
            </div>
            <StepDivider />
            <div className="text-14 text-grey-blue font-normal step-content-area self-start mt-2 mb-2">
              {t('dtree.initialStep')}
            </div>
            <Button
              size="sm"
              text={t('dtree.addStep')}
              className="absolute -bottom-9 z-1000 left-0"
              disabled={isPrevStepEmpty}
              onClick={() =>
                stepStore.createEmptyStep(index, CreateEmptyStepPositions.FINAL)
              }
            />
          </div>
        </div>
      </div>
    )
  },
)
