import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ChangeStepActionType } from '@declarations'
import { t } from '@i18n'
import stepStore, { CreateEmptyStepPositions } from '@store/dtree/step.store'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import { PopperMenu } from '@components/popper-menu/popper-menu'
import { PopperMenuItem } from '@components/popper-menu/popper-menu-item'
import { popoverOffset } from '@pages/ws/ws.constants'
import { InstrModifyingActionNames } from '@service-providers/decision-trees'
import { changeStep } from '@utils/changeStep'

interface IDtreeConditionsOptionsPopoverProps extends IPopoverBaseProps {
  index: number
}

export const DtreeConditionsOptionsPopover = observer(
  ({
    index,
    isOpen,
    anchorEl,
    onClose,
  }: IDtreeConditionsOptionsPopoverProps): ReactElement => {
    const createStep = (
      stepIndex: number,
      position: CreateEmptyStepPositions,
    ) => {
      stepStore.createEmptyStep(stepIndex, position)

      onClose?.()
    }

    const deleteStep = (stepIndex: number) => {
      const currentStep = stepStore.steps[stepIndex]

      const stepHasAttribute = currentStep.groups.length > 0

      stepHasAttribute
        ? changeStep(stepIndex, InstrModifyingActionNames.DELETE)
        : stepStore.removeStep(stepIndex)

      onClose?.()
    }

    const sendChange = (stepIndex: number, action: ChangeStepActionType) => {
      changeStep(stepIndex, action)
      onClose?.()
    }

    const currentStep = stepStore.steps[index]

    const isFirstStep = index === 0

    const hasMoreThanOneAttribute = currentStep.groups?.length > 1
    const isNegateStep = currentStep.isNegate
    const isSplitPossible = hasMoreThanOneAttribute && !isNegateStep

    return (
      <Popover
        onClose={onClose}
        isOpen={isOpen}
        anchorEl={anchorEl}
        offset={popoverOffset}
        className="shadow-dark rounded-md"
      >
        <PopperMenu className="text-14">
          <PopperMenuItem
            onClick={() => createStep(index, CreateEmptyStepPositions.BEFORE)}
            className="rounded-t"
          >
            <span>{t('dtree.addStepBefore')}</span>
          </PopperMenuItem>

          <PopperMenuItem
            onClick={() => createStep(index, CreateEmptyStepPositions.AFTER)}
          >
            <span>{t('dtree.addStepAfter')}</span>
          </PopperMenuItem>

          <PopperMenuItem
            onClick={() =>
              sendChange(index, InstrModifyingActionNames.DUPLICATE)
            }
          >
            <span>{t('dtree.duplicate')}</span>
          </PopperMenuItem>

          <PopperMenuItem
            onClick={() => sendChange(index, InstrModifyingActionNames.NEGATE)}
          >
            <span>{t('dtree.negate')}</span>
          </PopperMenuItem>

          <PopperMenuItem
            onClick={() => deleteStep(index)}
            data-testid={DecisionTreesResultsDataCy.deleteStep}
            className={cn({ 'rounded-b': isFirstStep && !isSplitPossible })}
          >
            <span>{t('dtree.delete')}</span>
          </PopperMenuItem>

          {!isFirstStep && (
            <>
              <PopperMenuItem
                onClick={() =>
                  sendChange(index, InstrModifyingActionNames.JOIN_AND)
                }
              >
                <span>{t('dtree.joinByAnd')}</span>
              </PopperMenuItem>

              <PopperMenuItem
                onClick={() =>
                  sendChange(index, InstrModifyingActionNames.JOIN_OR)
                }
                className={cn({ 'rounded-b': !isSplitPossible })}
              >
                <span>{t('dtree.joinByOr')}</span>
              </PopperMenuItem>
            </>
          )}

          {isSplitPossible && (
            <PopperMenuItem
              onClick={() => sendChange(index, InstrModifyingActionNames.SPLIT)}
              className="rounded-b"
            >
              <span>{t('dtree.split')}</span>
            </PopperMenuItem>
          )}
        </PopperMenu>
      </Popover>
    )
  },
)
