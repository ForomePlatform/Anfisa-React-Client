import styles from '../macro-tagging.module.css'

import { ChangeEvent, FC, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { usePopover } from '@core/hooks/use-popover'
import { t } from '@i18n'
import datasetStore from '@store/dataset/dataset'
import mainTableStore from '@store/ws/main-table.store'
import { Icon } from '@ui/icon'
import { Input } from '@ui/input-text'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { ConfirmDialog } from '@components/confirm-dialog'
import { PopperMenu } from '@components/popper-menu/popper-menu'
import { PopperMenuItem } from '@components/popper-menu/popper-menu-item'
import { PopupCard } from '@components/popup-card/popup-card'
import { MacroTaggingActions } from '@pages/ws/ui/control-panel/macro-tagging/macro-tagging.constants'
import operationsProvider from '@service-providers/operations/operations.provider'
import {
  IMacroTaggingArgumentsAsync,
  wsDatasetProvider,
} from '@service-providers/ws-dataset-support'
import { showToast } from '@utils/notifications'

export const MacroTaggingPopover: FC<IPopoverBaseProps> = observer(
  ({ isOpen, anchorEl, onClose }) => {
    const [tag, setTag] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isOpenedCD, setIsOpenedCD] = useState<boolean>(false)

    const {
      isPopoverOpen: isMenuOpen,
      onToggle,
      closePopover: onCloseMenu,
      popoverAnchor: menuAnchor,
    } = usePopover()

    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
      setTag(e.target.value)

    const onClickMacroAction =
      (move: MacroTaggingActions, confirmed?: boolean) => () => {
        if (move === MacroTaggingActions.Remove && confirmed === false) {
          setIsOpenedCD(true)
          return
        } else {
          setIsOpenedCD(false)
        }

        const params: IMacroTaggingArgumentsAsync = {
          ds: datasetStore.datasetName,
          tag,
          delay: true,
        }

        if (move === MacroTaggingActions.Remove) {
          params.off = true
        }

        setIsLoading(true)
        onCloseMenu()
        onClose!()
        wsDatasetProvider
          .updateMacroTaggingAsync(params)
          .then(({ task_id }) => {
            operationsProvider.getJobStatusAsync(task_id).then(() => {
              mainTableStore.wsList.invalidate()
              setIsLoading(false)
              setTag('')
              showToast(
                t(
                  move !== MacroTaggingActions.Remove
                    ? 'ds.macroTagsModal.toastApplied'
                    : 'ds.macroTagsModal.toastRemoved',
                ),
                'success',
                {
                  position: 'top-right',
                  autoClose: 3500,
                  style: { top: 40 },
                },
              )
            })
          })
      }

    return (
      <>
        <Popover
          isOpen={isOpen}
          anchorEl={anchorEl}
          onClose={onClose}
          className={styles.macroTagging__popover}
        >
          <PopupCard
            title={t('ds.macroTagsModal.title')}
            onClose={onClose}
            onApply={e => onToggle(e.currentTarget)}
            isApplyDisabled={!tag}
            isLoading={isLoading}
            applyText={t('ds.macroTagsModal.apply')}
            applyAppend={
              <Icon
                name="Arrow"
                className={cn(
                  styles.macroTagging__buttonIcon_arrow,
                  isMenuOpen && styles.macroTagging__buttonIcon_arrow_opened,
                )}
              />
            }
          >
            <Input
              onChange={onChange}
              value={tag}
              shape="brick"
              placeholder={t('ds.macroTagsModal.placeholder')}
              size="m"
            />
            <Popover
              onClose={onCloseMenu}
              isOpen={isMenuOpen}
              anchorEl={menuAnchor}
              placement="bottom"
              className={styles.macroTagging__menu}
            >
              <PopperMenu>
                <PopperMenuItem
                  onClick={onClickMacroAction(MacroTaggingActions.Apply)}
                  className={styles.macroTagging__menu__item_first}
                >
                  {t('ds.macroTagsModal.menu.apply')}
                </PopperMenuItem>
                <PopperMenuItem
                  onClick={onClickMacroAction(
                    MacroTaggingActions.Remove,
                    false,
                  )}
                  className={styles.macroTagging__menu__item_last}
                >
                  {t('ds.macroTagsModal.menu.remove')}
                </PopperMenuItem>
              </PopperMenu>
            </Popover>
          </PopupCard>
        </Popover>
        <ConfirmDialog
          isOpen={isOpenedCD}
          onClose={() => {
            setIsOpenedCD(false)
            onCloseMenu()
          }}
          onApply={onClickMacroAction(MacroTaggingActions.Remove, true)}
          message={t('ds.macroTagsModal.confirmDialog.message', { tag })}
          title={t('ds.macroTagsModal.confirmDialog.title')}
          cancelText={t('general.cancel')}
          applyText={t('general.delete')}
        />
      </>
    )
  },
)
