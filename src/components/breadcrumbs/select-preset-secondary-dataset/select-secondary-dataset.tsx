import { observer } from 'mobx-react-lite'

import { usePopover } from '@core/hooks/use-popover'
import { t } from '@i18n'
import { SolutionControlButton } from '@components/solution-control/solution-control-button'
import { SelectSecondaryDatasetPopover } from './select-secondary-dataset-popover'

interface ISelectSecondaryDatasetProps {
  onChangeDataset: (name: string) => void
  selectedDataset: string
  datasetList: string[]
}

export const SelectSecondaryDataset = observer(
  ({
    selectedDataset,
    datasetList,
    onChangeDataset,
  }: ISelectSecondaryDatasetProps) => {
    const { popoverAnchor, isPopoverOpen, onToggle, closePopover } =
      usePopover()

    const handleChangeDataset = (datasetName: string) => {
      onChangeDataset(datasetName)

      closePopover()
    }

    return (
      <>
        <SolutionControlButton
          solutionName={selectedDataset}
          controlName={t('header.secondaryPlaceholder')}
          isOpen={isPopoverOpen}
          onClick={e => onToggle(e.currentTarget)}
          onMouseUp={event => event.stopPropagation()}
        />

        <SelectSecondaryDatasetPopover
          isOpen={isPopoverOpen}
          onClose={closePopover}
          anchorEl={popoverAnchor}
          datasetList={datasetList}
          selectedDataset={selectedDataset}
          onApply={handleChangeDataset}
        />
      </>
    )
  },
)
