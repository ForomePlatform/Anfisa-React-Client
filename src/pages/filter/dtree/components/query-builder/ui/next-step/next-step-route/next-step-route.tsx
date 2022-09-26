import styles from './next-step-route.module.css'

import { Fragment, ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import stepStore, { ActiveStepOptions } from '@store/dtree/step.store'
import { Icon } from '@ui/icon'
import { Tooltip } from '@ui/tooltip'
import { DecisionTreesResultsDataCy } from '@data-testid'
import { StepCount } from '@pages/filter/dtree/components/query-builder/ui/step-count'

interface INextStepRouteProps {
  isExpanded: boolean
  index: number
  stepNo: number
  isIncluded: boolean
}

export const NextStepRoute = observer(
  ({
    isExpanded,
    index,
    stepNo,
    isIncluded,
  }: INextStepRouteProps): ReactElement => {
    const isXl = dtreeStore.isXl
    const currentStep = stepStore.filteredSteps[index]
    const { conditionPointIndex, returnPointIndex } = currentStep
    const conditionCounts =
      conditionPointIndex !== null
        ? dtreeStore.pointCounts[conditionPointIndex]
        : null
    const returnCounts =
      returnPointIndex !== null
        ? dtreeStore.pointCounts[returnPointIndex]
        : null

    const isFinalStep = index === stepStore.steps.length - 1
    const isDifferenceActive = currentStep.isReturnedVariantsActive

    const tooltipContent = returnCounts?.[0]
      ? t('dtree.showReturnedVariantsForStep', {
          returnValue: currentStep.excluded ? 'excluded' : 'included',
          index: index + 1,
        })
      : null

    const currentStartCounts = isFinalStep ? returnCounts : conditionCounts

    return (
      <div style={{ minHeight: 53 }} className={cn(styles.nextStepRoute)}>
        <div
          className={cn(
            styles.nextStepRoute__startAmount,
            'w-5/6 flex flex-col justify-between items-end text-blue-bright mr-1 pt-1',
            isFinalStep ? 'mt-1.5' : 'mt-2.5',
          )}
        >
          <StepCount isXl={isXl} pointCount={currentStartCounts} />
        </div>

        <div className="flex flex-col items-center w-1/6">
          <div
            className={cn(
              styles.nextStepRoute__circleStartThread,
              'bg-blue-bright mt-1',
              { '-mt-px': isFinalStep },
            )}
          >
            <div className={styles.nextStepRoute__subCircleThread} />
          </div>

          <div
            className={cn(styles.nextStepRoute__lineThread, 'bg-blue-bright', {
              'mt-5': index === 0,
            })}
          />

          {isExpanded && currentStep.groups && currentStep.groups.length > 0 && (
            <Fragment>
              <div
                className={cn(
                  styles.nextStepRoute__excludeTurn,
                  isIncluded && styles.nextStepRoute__excludeTurn_included,
                )}
              >
                <div
                  className="absolute w-full right-4 flex justify-end"
                  style={{ top: 48 }}
                >
                  <Tooltip title={tooltipContent}>
                    <div
                      className={cn(
                        styles.nextStepRoute__excludeAmount,
                        isIncluded &&
                          styles.nextStepRoute__excludeAmount_included,
                      )}
                      onClick={() => {
                        stepStore.makeStepActive({
                          index: stepNo - 1,
                          option: ActiveStepOptions.ReturnedVariants,
                          isIncreasedStepIndex: true,
                          isFullStep: false,
                        })
                      }}
                      data-testid={DecisionTreesResultsDataCy.excludeInfo}
                    >
                      <StepCount
                        isActive={isDifferenceActive}
                        prefix={isIncluded ? '+' : '-'}
                        isXl={isXl}
                        pointCount={returnCounts}
                      />
                    </div>
                  </Tooltip>

                  <div className="ml-1 pt-0.5">
                    {isIncluded ? (
                      <Icon
                        name="ThreadAdd"
                        className="transform rotate-45 text-green-secondary"
                      />
                    ) : (
                      <Icon name="ThreadClose" className="text-purple-bright" />
                    )}
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    )
  },
)
