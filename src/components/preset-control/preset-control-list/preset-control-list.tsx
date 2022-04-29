import styles from './preset-control-list.module.css'

import { Fragment, ReactElement, useState } from 'react'

import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { MenuList, MenuListItem } from '@ui/menu-list'
import { Popover } from '@ui/popover'
import { ISolutionEntryDescription } from '@service-providers/common'

interface IPresetControlList {
  className?: string
  presets: ISolutionEntryDescription[]
  selected?: string
  onSelect: (presetName: string) => void
  onModify: (presetName: string) => void
  onDelete: (presetName: string) => void
}

export const PresetControlList = ({
  className,
  presets,
  selected,
  onSelect,
  onModify,
  onDelete,
}: IPresetControlList): ReactElement => {
  const [contextMenuItem, setContextMenuItem] = useState<{
    name: string
    element: HTMLElement
  } | null>(null)

  const closeContextMenu = () => {
    setContextMenuItem(null)
  }

  return (
    <Fragment>
      <MenuList className={className} wrap="nowrap">
        {presets?.map(({ name, standard }) => (
          <MenuListItem
            key={name}
            label={name}
            isSelected={selected === name}
            onClick={() => onSelect(name)}
            actions={
              !standard && (
                <button
                  className={styles.contextMenuButton}
                  onClick={event => {
                    onSelect(name)
                    setContextMenuItem({ name, element: event.currentTarget })
                  }}
                >
                  <Icon name="Ellipsis" size={12} />
                </button>
              )
            }
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
              label={t('presetControl.modify')}
              onClick={() => {
                closeContextMenu()
                onModify(contextMenuItem?.name ?? '')
              }}
            />
            <MenuListItem
              label={t('presetControl.delete')}
              onClick={() => {
                closeContextMenu()
                onDelete(contextMenuItem?.name ?? '')
              }}
            />
          </MenuList>
        </div>
      </Popover>
    </Fragment>
  )
}
