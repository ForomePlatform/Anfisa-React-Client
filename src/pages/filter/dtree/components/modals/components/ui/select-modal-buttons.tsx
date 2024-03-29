import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { ModalSources } from '@core/enum/modal-sources'
import { usePopover } from '@core/hooks/use-popover'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { DecisionTreeModalDataCy } from '@data-testid'
import modalsVisibilityStore from '../../modals-visibility-store'
import { StepJoinPopover } from '../step-join-popover'

// TODO: `currentGroup` prop is used only for empty group test
//       may be we can use `isEmptyGroup` boolean prop or
//       isEmptyCurrentGroup getter from dtreeStore
interface ISelectModalButtonsProps {
  handleModals: () => void
  handleClose: () => void
  currentGroup: any
  disabled: boolean
  handleAddAttribute: (action: ActionType) => void
}

export const SelectModalButtons = observer(
  ({
    handleModals,
    handleClose,
    currentGroup,
    disabled,
    handleAddAttribute,
  }: ISelectModalButtonsProps) => {
    const { popoverAnchor, isPopoverOpen, onToggle, closePopover } =
      usePopover()

    return (
      <div
        className={cn('flex mt-1 items-center', {
          'justify-end':
            modalsVisibilityStore.modalSource === ModalSources.TreeStat,
          'justify-between':
            modalsVisibilityStore.modalSource === ModalSources.TreeStep,
        })}
      >
        {modalsVisibilityStore.modalSource === ModalSources.TreeStep && (
          <div
            className="text-14 text-blue-bright font-medium cursor-pointer"
            onClick={handleModals}
          >
            {t('condition.backToAttribute')}
          </div>
        )}

        <div className="flex">
          <Button
            text={t('general.cancel')}
            variant="secondary"
            className="mr-2"
            onClick={() => handleClose()}
            dataTestId={DecisionTreeModalDataCy.cancelButton}
          />
          {currentGroup && currentGroup.length > 0 ? (
            <>
              <Button
                disabled={disabled}
                text={t('dtree.replace')}
                className="mr-2"
                onClick={() => handleAddAttribute('REPLACE')}
                dataTestId={DecisionTreeModalDataCy.replaceButton}
              />

              <div className="relative">
                <Button
                  disabled={disabled}
                  text={t('condition.addByJoining')}
                  onClick={e => onToggle(e.currentTarget)}
                  icon={<Icon name="Arrow" className="transform -rotate-90" />}
                  dataTestId={DecisionTreeModalDataCy.addByJoin}
                />

                <StepJoinPopover
                  isPopoverOpen={isPopoverOpen}
                  popoverAnchor={popoverAnchor}
                  handleAddAttribute={handleAddAttribute}
                  closePopover={closePopover}
                />
              </div>
            </>
          ) : (
            <Button
              text={t('condition.addAttribute')}
              onClick={() => handleAddAttribute('INSERT')}
              disabled={disabled}
              dataTestId={DecisionTreeModalDataCy.addSelectedAttributes}
            />
          )}
        </div>
      </div>
    )
  },
)
