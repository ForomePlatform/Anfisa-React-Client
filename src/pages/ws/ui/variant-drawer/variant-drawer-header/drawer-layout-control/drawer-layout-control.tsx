import styles from './drawer-layout-control.module.css'

import { ReactElement, useEffect, useState } from 'react'
import cn from 'classnames'

import { useModal } from '@core/hooks/use-modal'
import { usePopover } from '@core/hooks/use-popover'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { Divider } from '@ui/divider'
import { Icon } from '@ui/icon'
import { showToast } from '@utils/notifications'
import {
  IVariantDrawerGridPreset,
  VariantDrawerLayoutMode,
} from '../../variant-drawer.interface'
import { PresetMenuPopover } from './preset-menu-popover'
import { SavePresetDialog } from './save-preset-dialog'

interface IDrawerLayoutControlProps {
  layoutMode: VariantDrawerLayoutMode
  gridPresets: IVariantDrawerGridPreset[]
  windowsOpenState: boolean
  appliedPreset: string | null
  className?: string
  onChangeLayoutMode: (mode: VariantDrawerLayoutMode) => void
  onSaveGridPreset?: (presetName: string) => void
  onChangeGridPreset: (presetName: string) => void
  onModifyGridPreset: (presetName: string) => void
  onDeleteGridPreset: (presetName: string) => void
  onWindowsToggle: (state: boolean) => void
}

export const DrawerLayoutControl = ({
  className,
  gridPresets,
  layoutMode,
  appliedPreset,
  onChangeLayoutMode,
  onSaveGridPreset,
  onChangeGridPreset,
  onModifyGridPreset,
  onDeleteGridPreset,
  windowsOpenState,
  onWindowsToggle,
}: IDrawerLayoutControlProps): ReactElement => {
  const [savePresetDialog, openSavePresetDialog, closeSavePresetDialog] =
    useModal()

  const { popoverAnchor, isPopoverOpen, onToggle, closePopover } = usePopover()

  const [selectedPreset, setSelectedPreset] = useState<string>('')

  useEffect(() => {
    if (isPopoverOpen && selectedPreset !== appliedPreset) {
      setSelectedPreset(appliedPreset || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPopoverOpen])

  const handleDeletePreset = (presetName: string) => {
    onDeleteGridPreset(presetName)
    showToast(t('variant.actions.delete', { presetName }), 'success')
    closePopover()
  }

  const handleSavePreset = (presetName: string) => {
    onSaveGridPreset?.(presetName)
    showToast(t('variant.actions.save', { presetName }), 'success')
    closeSavePresetDialog()
  }

  const handleModifyPreset = (presetName: string) => {
    onModifyGridPreset(presetName)
    showToast(t('variant.actions.modify', { presetName }), 'success')
    closePopover()
  }

  return (
    <div className={cn(styles.layoutControl, className)}>
      {layoutMode === VariantDrawerLayoutMode.Grid &&
        windowsOpenState &&
        onSaveGridPreset && (
          <Button
            text={t('variant.savePreset')}
            className="whitespace-nowrap mr-4"
            size="xs"
            textSize="xs"
            variant="secondary-dark"
            onClick={openSavePresetDialog}
          />
        )}

      <button
        className={styles.layoutControl__button}
        onClick={() => onWindowsToggle(!windowsOpenState)}
      >
        <Icon name={windowsOpenState ? 'Collapse' : 'Expand'} size={20} />
      </button>

      <Divider orientation="vertical" spacing="dense" />

      <button
        className={cn(
          styles.layoutControl__button,
          layoutMode === VariantDrawerLayoutMode.Grid &&
            styles.layoutControl__button_active,
          styles.gridPresetButton,
        )}
        onClick={event => onToggle(event.currentTarget)}
      >
        <Icon name="List" />

        <Icon name="ArrowDownXs" className={styles.gridPresetButton__arrow} />
      </button>

      <button
        className={cn(
          styles.layoutControl__button,
          layoutMode === VariantDrawerLayoutMode.Gallery &&
            styles.layoutControl__button_active,
          'ml-2',
        )}
        onClick={() => {
          onChangeLayoutMode(VariantDrawerLayoutMode.Gallery)
          setSelectedPreset('')
        }}
      >
        <Icon name="Gallery" size={20} />
      </button>

      <PresetMenuPopover
        anchorEl={popoverAnchor}
        isOpen={isPopoverOpen}
        presets={gridPresets}
        selected={selectedPreset}
        onSelect={presetName => setSelectedPreset(presetName)}
        onApply={presetName => {
          onChangeLayoutMode(VariantDrawerLayoutMode.Grid)
          onChangeGridPreset(presetName)
          closePopover()
        }}
        onDelete={handleDeletePreset}
        onModify={handleModifyPreset}
        onClose={closePopover}
      />

      {onSaveGridPreset && (
        <SavePresetDialog
          {...savePresetDialog}
          onClose={closeSavePresetDialog}
          onSave={handleSavePreset}
          presets={gridPresets}
        />
      )}
    </div>
  )
}
