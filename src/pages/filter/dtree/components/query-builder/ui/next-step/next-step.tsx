import styles from './next-step.module.css'

import { ReactElement, useEffect, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import stepStore, { ActiveStepOptions } from '@store/dtree/step.store'
import { DecisionTreesResultsDataCy } from '@data-testid'
import { NextStepContent } from './next-step-content'
import { NextStepHeader } from './next-step-header'
import { NextStepRoute } from './next-step-route'

interface INextStepProps {
  index: number
  isContentExpanded: boolean
  changeIndicator: number
}

export const NextStep = observer(
  ({
    index,
    isContentExpanded,
    changeIndicator,
  }: INextStepProps): ReactElement => {
    const [isExpanded, setIsExpanded] = useState(true)

    useEffect(() => {
      !isContentExpanded && setIsExpanded(true)
      isContentExpanded && setIsExpanded(false)
    }, [isContentExpanded, changeIndicator])

    const expandContent = () => {
      setIsExpanded(prev => !prev)
    }

    const currentStep = stepStore.filteredSteps[index]
    const stepNo = currentStep.step

    const setStepActive = (event: any) => {
      const classList = Array.from(event.target.classList)

      const shouldMakeActive = classList.includes('step-content-area')

      if (shouldMakeActive) {
        stepStore.makeStepActive(stepNo - 1, ActiveStepOptions.StartedVariants)
      }
    }

    return (
      <div
        className={cn(styles.nextStep, 'flex flex-col')}
        data-testid={DecisionTreesResultsDataCy.stepCard}
      >
        <div className="flex">
          <div
            className={cn(
              styles.nextStep__treeView,
              'pr-3',
              currentStep.isReturnedVariantsActive ? ' bg-blue-tertiary' : '',
            )}
          >
            <NextStepRoute
              isExpanded={isExpanded}
              index={index}
              stepNo={stepNo}
              isIncluded={!currentStep.excluded}
            />
          </div>

          <div
            className={cn(
              styles.nextStep__resultsView,
              'border-b border-l border-grey-light font-medium px-5 relative',
              currentStep.isActive && ' bg-blue-tertiary',
            )}
            onClick={event => setStepActive(event)}
          >
            <NextStepHeader
              isExpanded={isExpanded}
              expandContent={expandContent}
              index={index}
              isExcluded={currentStep.excluded}
            />

            {isExpanded && <NextStepContent index={index} stepNo={stepNo} />}
          </div>
        </div>
      </div>
    )
  },
)
