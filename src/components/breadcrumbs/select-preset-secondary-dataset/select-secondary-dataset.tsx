import { useState } from 'react'
import { observer } from 'mobx-react-lite'

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
    const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null)

    const isPopoverOpen = !!popoverAnchor

    const closePopover = () => {
      setPopoverAnchor(null)
    }

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
          onClick={event =>
            isPopoverOpen
              ? closePopover()
              : setPopoverAnchor(event.currentTarget)
          }
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
