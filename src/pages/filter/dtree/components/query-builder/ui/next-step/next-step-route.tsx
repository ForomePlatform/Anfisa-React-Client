import { Fragment, ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { t } from '@i18n'
import { theme } from '@theme'
import dtreeStore from '@store/dtree'
import stepStore, { ActiveStepOptions } from '@store/dtree/step.store'
import { Icon } from '@ui/icon'
import { Tooltip } from '@ui/tooltip'
import { DecisionTreesResultsDataCy } from '@data-testid'
import { StepCount } from '@pages/filter/dtree/components/query-builder/ui/step-count'

const StartAmount = styled.div`
  font-size: 13px;
  font-weight: 700;
`

const CircleStartThread = styled.div`
  position: absolute;
  top: 13px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1000px;
`

const SubCircleThread = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 100px;
  background: white;
`

const LineThread = styled.div`
  width: 6px;
  height: 100%;
`

const ExcludeTurn = styled.div<{ isIncluded: boolean }>`
  position: absolute;
  top: 29px;
  margin-right: 14px;
  margin-top: 4px;
  display: flex;
  width: 20px;
  height: 60px;
  border-bottom: 6.5px solid
    ${props =>
      props.isIncluded
        ? theme('colors.green.secondary')
        : theme('colors.purple.bright')};
  border-right: 6.5px solid
    ${props =>
      props.isIncluded
        ? theme('colors.green.secondary')
        : theme('colors.purple.bright')};
  border-bottom-right-radius: 20px;
`

const ExcludeAmount = styled.div<{ isIncluded: boolean }>`
  width: auto;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  color: ${props =>
    props.isIncluded
      ? theme('colors.green.secondary')
      : theme('colors.purple.bright')};
`

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
      <div style={{ minHeight: 53 }} className="relative flex h-full w-full">
        <StartAmount
          className={cn(
            'w-5/6 flex flex-col justify-between items-end text-blue-bright mr-1 pt-1',
            isFinalStep ? 'mt-1.5' : 'mt-2.5',
          )}
        >
          <StepCount isXl={isXl} pointCount={currentStartCounts} />
        </StartAmount>

        <div className="flex flex-col items-center w-1/6">
          <CircleStartThread
            className={cn('bg-blue-bright mt-1', { '-mt-px': isFinalStep })}
          >
            <SubCircleThread />
          </CircleStartThread>

          <LineThread
            className={cn('bg-blue-bright', {
              'mt-5': index === 0,
            })}
          />

          {isExpanded && currentStep.groups && currentStep.groups.length > 0 && (
            <Fragment>
              <ExcludeTurn isIncluded={isIncluded}>
                <div
                  className="absolute w-full right-4 flex justify-end"
                  style={{ top: 48 }}
                >
                  <Tooltip title={tooltipContent}>
                    <ExcludeAmount
                      isIncluded={isIncluded}
                      onClick={() =>
                        stepStore.makeStepActive(
                          stepNo - 1,
                          ActiveStepOptions.ReturnedVariants,
                        )
                      }
                      data-testid={DecisionTreesResultsDataCy.excludeInfo}
                    >
                      <StepCount
                        isActive={isDifferenceActive}
                        prefix={isIncluded ? '+' : '-'}
                        isXl={isXl}
                        pointCount={returnCounts}
                      />
                    </ExcludeAmount>
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
              </ExcludeTurn>
            </Fragment>
          )}
        </div>
      </div>
    )
  },
)
