import { FC } from 'react'

import { useModal } from '@core/hooks/use-modal'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { DecisionTreesMenuDataCy } from '@data-testid'
import { CreateDatasetDialog } from '@pages/filter/dtree/components/modals/components/create-dataset-dialog'

interface ICreateDatasetProps {
  disabled?: boolean
  tooltip?: string
}

export const CreateDataset: FC<ICreateDatasetProps> = ({
  disabled,
  tooltip = '',
}) => {
  const [creationDialog, openCreationDialog, closeCreationDialog] = useModal()
  const { isOpen } = creationDialog

  return (
    <>
      <Button
        text={t('dsCreation.createDerivedDS')}
        onClick={openCreationDialog}
        disabled={disabled}
        variant="primary-dark"
        dataTestId={DecisionTreesMenuDataCy.saveDataset}
        title={tooltip}
      />

      <CreateDatasetDialog onClose={closeCreationDialog} isOpen={isOpen} />
    </>
  )
}
