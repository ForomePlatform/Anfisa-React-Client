import styles from '../macro-tagging.module.css'

import { ChangeEvent, FC } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { usePopover } from '@core/hooks/use-popover'
import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { Input } from '@ui/input'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { ConfirmDialog } from '@components/confirm-dialog'
import { PopperMenu } from '@components/popper-menu/popper-menu'
import { PopperMenuItem } from '@components/popper-menu/popper-menu-item'
import { PopupCard } from '@components/popup-card/popup-card'
import { MacroTaggingActions } from '@pages/ws/ui/control-panel/macro-tagging/macro-tagging.constants'
import macroTaggingStore from '../macro-tagging.store'

export const MacroTaggingPopover: FC<IPopoverBaseProps> = observer(
  ({ isOpen, anchorEl, onClose }) => {
    const {
      isPopoverOpen: isMenuOpen,
      onToggle,
      closePopover: onCloseMenu,
      popoverAnchor: menuAnchor,
    } = usePopover()
    const { isConfirmOpen, isLoading, tag } = macroTaggingStore

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      macroTaggingStore.setTag(e.target.value)
    }

    const onClickRemove = () => {
      macroTaggingStore.setIsConfirmOpen(true)
    }

    const onClickMacroAction = (action: MacroTaggingActions) => () => {
      macroTaggingStore.setAction(action)

      onCloseMenu()
      onClose!()
      macroTaggingStore.updateMacroTags()
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
                  onClick={onClickRemove}
                  className={styles.macroTagging__menu__item_last}
                >
                  {t('ds.macroTagsModal.menu.remove')}
                </PopperMenuItem>
              </PopperMenu>
            </Popover>
          </PopupCard>
        </Popover>
        <ConfirmDialog
          isOpen={isConfirmOpen}
          onClose={() => {
            macroTaggingStore.setIsConfirmOpen(false)
            onCloseMenu()
          }}
          onApply={onClickMacroAction(MacroTaggingActions.Remove)}
          message={t('ds.macroTagsModal.confirmDialog.message', {
            tag: tag,
          })}
          title={t('ds.macroTagsModal.confirmDialog.title')}
          cancelText={t('general.cancel')}
          applyText={t('general.delete')}
        />
      </>
    )
  },
)
