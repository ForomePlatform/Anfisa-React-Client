import styles from './context-menu-popover.module.css'

import { ReactElement } from 'react'

import { t } from '@i18n'
import { MenuList, MenuListItem } from '@ui/menu-list'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'

interface IContextMenuPopoverProps extends IPopoverBaseProps {
  contextMenuItem: {
    name: string
    element: HTMLElement
  } | null
  isModifyDisabled?: boolean
  closeContextMenu: () => void
  onDelete: () => void
  onModify: () => void
}

export const ContextMenuPopover = ({
  contextMenuItem,
  isModifyDisabled,
  closeContextMenu,
  onDelete,
  onModify,
}: IContextMenuPopoverProps): ReactElement => (
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
          label={t('variant.contextMenuPopover.modify')}
          onClick={() => {
            closeContextMenu()
            onModify()
          }}
          disabled={isModifyDisabled}
        />

        <MenuListItem
          label={t('variant.contextMenuPopover.delete')}
          onClick={() => {
            closeContextMenu()
            onDelete()
          }}
        />
      </MenuList>
    </div>
  </Popover>
)
