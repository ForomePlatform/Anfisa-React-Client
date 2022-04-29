import styles from './preset-control.module.css'

import { Fragment, ReactElement, useEffect, useMemo, useState } from 'react'
import cn from 'classnames'

import { useModal } from '@core/hooks/use-modal'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { Popover } from '@ui/popover'
import { PresetControlList } from '@components/preset-control/preset-control-list'
import { PresetCreateDialog } from '@components/preset-control/preset-create-dialog'
import { PresetDeleteDialog } from '@components/preset-control/preset-delete-dialog'
import { ISolutionEntryDescription } from '@service-providers/common'

interface IPresetControlProps {
  className?: string
  presets: ISolutionEntryDescription[] | undefined
  selected: string
  isCreateDisabled?: boolean
  onCreate: (presetName: string) => void
  onApply: (presetName: string) => void
  onJoin?: (presetName: string) => void
  onModify: (presetName: string) => void
  onDelete: (presetName: string) => void
}

export const PresetControl = ({
  className,
  presets,
  selected: selectedProp,
  isCreateDisabled,
  onCreate,
  onApply,
  onJoin,
  onModify,
  onDelete,
}: IPresetControlProps): ReactElement => {
  const [selected, setSelected] = useState(selectedProp)
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null)
  const [deleteDialog, openDeleteDialog, closeDeleteDialog] = useModal({
    presetName: '',
  })
  const [createDialog, openCreateDialog, closeCreateDialog] = useModal()

  const isSelectedPresetNonStandard = useMemo(
    () =>
      !!selectedProp &&
      !presets?.find(({ name }) => name === selectedProp)?.standard,
    [selectedProp, presets],
  )

  const isPopoverOpen = !!popoverAnchor

  const closePopover = () => {
    setPopoverAnchor(null)
  }

  useEffect(() => {
    if (!isPopoverOpen) {
      setSelected(selectedProp)
    }
  }, [isPopoverOpen, selectedProp])

  return (
    <Fragment>
      <button
        className={cn(styles.presetControlButton, className)}
        onClick={event =>
          isPopoverOpen ? closePopover() : setPopoverAnchor(event.currentTarget)
        }
        onMouseUp={event => event.stopPropagation()}
      >
        <span className={styles.presetControlButton__label}>
          {selectedProp || t('presetControl.selectPreset')}
        </span>
        <span
          className={cn(
            styles.presetControlButton__icon,
            isSelectedPresetNonStandard &&
              styles.presetControlButton__icon_delete,
          )}
        >
          {isSelectedPresetNonStandard ? (
            <Icon
              name="Delete"
              size={16}
              onClick={event => {
                event.stopPropagation()
                openDeleteDialog({ presetName: selectedProp })
              }}
            />
          ) : (
            <span
              className={cn(
                styles.presetControlButton__arrow,
                isPopoverOpen && styles.presetControlButton_open,
              )}
            />
          )}
        </span>
      </button>
      <Popover
        isOpen={isPopoverOpen}
        onClose={closePopover}
        anchorEl={popoverAnchor}
      >
        <section className={styles.presetControlCard}>
          <header className={styles.presetControlCard__header}>
            <button
              disabled={isCreateDisabled}
              className={cn(
                styles.presetControlCard__createButton,
                isCreateDisabled &&
                  styles.presetControlCard__createButton_disabled,
              )}
              onClick={() => {
                closePopover()
                openCreateDialog()
              }}
            >
              {t('presetControl.createNewPreset')}
            </button>
          </header>
          {presets && (
            <PresetControlList
              className={styles.presetControlCard__list}
              presets={presets}
              selected={selected}
              onSelect={setSelected}
              onModify={presetName => {
                closePopover()
                onModify(presetName)
              }}
              onDelete={presetName => {
                closePopover()
                openDeleteDialog({ presetName })
              }}
            />
          )}
          <footer className={styles.presetControlCard__actions}>
            <Button
              className={styles.presetControlCard__button}
              variant="tertiary"
              text={t('general.cancel')}
              onClick={closePopover}
            />
            {onJoin && (
              <Button
                className={styles.presetControlCard__button}
                variant="secondary"
                text={t('presetControl.join')}
                disabled={!selected}
                onClick={() => {
                  onJoin(selected)
                  closePopover()
                }}
              />
            )}
            <Button
              className={styles.presetControlCard__button}
              text={t('presetControl.apply')}
              disabled={!selected}
              onClick={() => {
                onApply(selected)
                closePopover()
              }}
            />
          </footer>
        </section>
      </Popover>
      <PresetDeleteDialog
        {...deleteDialog}
        onClose={closeDeleteDialog}
        onDelete={() => {
          closeDeleteDialog()
          if (deleteDialog.presetName) {
            onDelete(deleteDialog.presetName)
          }
        }}
        presetName={selected}
      />
      <PresetCreateDialog
        {...createDialog}
        onClose={closeCreateDialog}
        onCreate={presetName => {
          closeCreateDialog()
          onCreate(presetName)
        }}
      />
    </Fragment>
  )
}
