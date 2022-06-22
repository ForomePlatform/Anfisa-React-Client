import styles from './solution-control-list.module.css'

import { ReactElement, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'
import { Icon } from '@ui/icon'
import { MenuList, MenuListItem } from '@ui/menu-list'
import { Popover } from '@ui/popover'
import { ISolutionEntryDescription } from '@service-providers/common'

interface ISolutionControlListProps {
  className?: string
  solutions: ISolutionEntryDescription[]
  selected?: string
  onSelect: (solutionName: string) => void
  onModify: (solutionName: string) => void
  onDelete: (solutionName: string) => void
}

export const SolutionControlList = observer(
  ({
    className,
    solutions,
    selected,
    onSelect,
    onModify,
    onDelete,
  }: ISolutionControlListProps): ReactElement => {
    const [contextMenuItem, setContextMenuItem] =
      useState<{
        name: string
        element: HTMLElement
      } | null>(null)

    const closeContextMenu = () => {
      setContextMenuItem(null)
    }

    const renderActions = (name: string, standard: boolean) => {
      const actions: JSX.Element[] = []
      const isModified =
        (filterPresetsStore.activePreset === name &&
          filterStore.isPresetModified) ||
        (dtreeStore.currentDtreeName === name && dtreeStore.isDtreeModified)

      if (isModified) {
        actions.push(
          <span>
            <Icon name="Edit" />
          </span>,
        )
      }

      if (!standard) {
        actions.push(
          <button
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
      <>
        <MenuList className={className} wrap="nowrap">
          {solutions?.map(({ name, standard }) => (
            <MenuListItem
              key={name}
              label={name}
              isSelected={selected === name}
              onClick={() => onSelect(name)}
              actions={renderActions(name, standard)}
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
      </>
    )
  },
)
