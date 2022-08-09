import styles from './preset-menu-popover.module.css'

import { ReactElement, useCallback, useState } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { MenuList, MenuListItem } from '@ui/menu-list'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { DecisionTreesMenuDataCy } from '@data-testid'
import { popoverOffset } from '@pages/ws/ws.constants'
import { defaultPresetsNames } from '../../../variant-drawer.data'
import { IVariantDrawerGridPreset } from '../../../variant-drawer.interface'
import { ContextMenuPopover } from './context-menu-popover'

interface IPresetMenuProps extends IPopoverBaseProps {
  presets: IVariantDrawerGridPreset[]
  selected: string
  onSelect: (presetName: string) => void
  onApply: (presetName: string) => void
  onDelete: () => void
  onModify: () => void
  onClose: () => void
}

export const PresetMenuPopover = ({
  presets,
  selected,
  className,
  onSelect,
  onApply,
  onDelete,
  onModify,
  onClose,
  ...popoverProps
}: IPresetMenuProps): ReactElement => {
  const [contextMenuItem, setContextMenuItem] =
    useState<{
      name: string
      element: HTMLElement
    } | null>(null)

  const closeContextMenu = () => {
    setContextMenuItem(null)
  }

  const renderActions = (name: string) => {
    const actions: JSX.Element[] = []

    if (!defaultPresetsNames.includes(name)) {
      actions.push(
        <button
          key="menu"
          className={styles.contextMenuButton}
          onClick={event => {
            onSelect(name)
            setContextMenuItem({ name, element: event.currentTarget })
          }}
        >
          <Icon name="Ellipsis" size={12} />
        </button>,
      )
    }

    return <span className={cn(styles.menuListItemActions)}>{actions}</span>
  }

  const getIsModifyDisabled = useCallback(
    (contextMenuItemName?: string) => {
      return !presets.find(preset => preset.name === contextMenuItemName)
        ?.isAbleToModify
    },
    [presets],
  )

  return (
    <Popover onClose={onClose} offset={popoverOffset} {...popoverProps}>
      <section className={styles.presetMenuCard}>
        <MenuList className={className} wrap="nowrap">
          {presets?.map(({ name }) => (
            <MenuListItem
              key={name}
              label={name}
              isSelected={selected === name}
              onClick={() => onSelect(name)}
              actions={renderActions(name)}
            />
          ))}
        </MenuList>

        <ContextMenuPopover
          onDelete={onDelete}
          onModify={onModify}
          contextMenuItem={contextMenuItem}
          closeContextMenu={closeContextMenu}
          isModifyDisabled={getIsModifyDisabled(contextMenuItem?.name)}
        />

        <footer className={styles.presetMenuCard__actions}>
          <Button
            size="xs"
            textSize="sm"
            padding="dense"
            className={styles.presetMenuCard__button}
            variant="tertiary"
            text={t('general.cancel')}
            onClick={onClose}
          />

          <Button
            dataTestId={DecisionTreesMenuDataCy.applyFilter}
            size="xs"
            textSize="sm"
            padding="dense"
            className={styles.presetMenuCard__button}
            text={t('general.apply')}
            disabled={!selected}
            onClick={() => {
              onClose()
              onApply(selected)
            }}
          />
        </footer>
      </section>
    </Popover>
  )
}
