import styles from '@components/solution-control/solution-control-popover/solution-control-popover.module.css'

import { MenuList, MenuListItem } from '@ui/menu-list'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'
import { popoverOffset } from '@pages/ws/ws.constants'
import { ISolutionEntryDescription } from '@service-providers/common'

interface ISelectPresetPopoverProps extends IPopoverBaseProps {
  solutions: ISolutionEntryDescription[]
  selectedPreset: string
  onApply: (solutionName: string) => void
  onClose: () => void
}

export const SelectPresetPopover = ({
  solutions,
  selectedPreset,
  onApply,
  onClose,
  ...popoverProps
}: ISelectPresetPopoverProps) => (
  <Popover onClose={onClose} offset={popoverOffset} {...popoverProps}>
    <section className={styles.solutionControlCard}>
      <MenuList className={styles.solutionControlCard__list} wrap="nowrap">
        {solutions?.map(({ name }) => (
          <MenuListItem
            key={name}
            label={name}
            isSelected={selectedPreset === name}
            onClick={() => onApply(name)}
          />
        ))}
      </MenuList>
    </section>
  </Popover>
)
