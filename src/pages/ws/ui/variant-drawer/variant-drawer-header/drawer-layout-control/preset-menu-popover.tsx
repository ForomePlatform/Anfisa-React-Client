import styles from './preset-menu-popover.module.css'

import { ReactElement, useState } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { MenuList, MenuListItem } from '@ui/menu-list'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { DecisionTreesMenuDataCy } from '@data-testid'
import { popoverOffset } from '@pages/ws/ws.constants'
import { IVariantDrawerGridPreset } from '../../variant-drawer.interface'

const defaultPresetName = 'List'

interface IPresetMenuProps extends IPopoverBaseProps {
  presets: IVariantDrawerGridPreset[]
  selected: string
  onSelect: (presetName: string) => void
  onApply: (presetName: string) => void
  onDelete: (presetName: string) => void
  onModify: (presetName: string) => void
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
    // const isModified = modifiedSolution && modifiedSolution === name
    const isModified = false

    if (isModified) {
      actions.push(
        <span key="edit">
          <Icon name="Edit" />
        </span>,
      )
    }

    if (name !== defaultPresetName) {
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

        <Popover
          isOpen={!!contextMenuItem}
          anchorEl={contextMenuItem?.element}
          placement="bottom-end"
          onClose={closeContextMenu}
        >
          <div
            className={styles.menuCard}
            onMouseUp={event => event.stopPropagation()}
          >
            <MenuList isDense>
              <MenuListItem
                label={t('solutionControl.modify')}
                // disabled={contextMenuItem?.name !== modifiedSolution}
                onClick={() => {
                  closeContextMenu()
                  onModify(contextMenuItem?.name ?? '')
                }}
              />
              <MenuListItem
                label={t('solutionControl.delete')}
                onClick={() => {
                  closeContextMenu()
                  onDelete(contextMenuItem?.name ?? '')
                }}
              />
            </MenuList>
          </div>
        </Popover>

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
