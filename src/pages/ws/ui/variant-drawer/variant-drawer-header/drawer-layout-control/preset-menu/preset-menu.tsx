import styles from './preset-menu.module.css'

import { ReactElement } from 'react'

import { MenuList, MenuListItem } from '@ui/menu-list'
import { Popover } from '@ui/popover'
import { IPopoverProps } from '@ui/popover/popover.interface'
import { IVariantDrawerGridPreset } from '../../../variant-drawer.interface'

interface IPresetMenuProps extends Omit<IPopoverProps, 'children'> {
  presets: IVariantDrawerGridPreset[]
  onSelect: (presetName: string) => void
}

export const PresetMenu = ({
  presets,
  onSelect,
  ...popoverProps
}: IPresetMenuProps): ReactElement => {
  return (
    <Popover placement="bottom-start" {...popoverProps}>
      <MenuList isDense className={styles.presetMenu}>
        {presets.map(({ name }) => (
          <MenuListItem
            key={name}
            label={name}
            onClick={() => onSelect(name)}
          />
        ))}
      </MenuList>
    </Popover>
  )
}
