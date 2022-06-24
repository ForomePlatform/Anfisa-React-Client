import styles from '@components/solution-control/solution-control-popover/solution-control-popover.module.css'

import { MenuList, MenuListItem } from '@ui/menu-list'
import { Popover } from '@ui/popover'
import { IPopoverBaseProps } from '@ui/popover/popover.interface'

interface ISelectSecondaryDatasetPopoverProps extends IPopoverBaseProps {
  datasetList: string[]
  selectedDataset: string
  onApply: (datasetName: string) => void
  onClose: () => void
}

export const SelectSecondaryDatasetPopover = ({
  datasetList,
  selectedDataset,
  onApply,
  onClose,
  ...popoverProps
}: ISelectSecondaryDatasetPopoverProps) => (
  <Popover onClose={onClose} {...popoverProps}>
    <section className={styles.solutionControlCard}>
      <MenuList className={styles.solutionControlCard__list} wrap="nowrap">
        {datasetList?.map(datasetName => (
          <MenuListItem
            key={datasetName}
            label={datasetName}
            isSelected={selectedDataset === datasetName}
            onClick={() => onApply(datasetName)}
          />
        ))}
      </MenuList>
    </section>
  </Popover>
)
