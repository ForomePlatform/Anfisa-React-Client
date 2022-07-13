import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { DecisionTreeModalDataCy } from '@data-testid'
import { deleteAttribute } from '@utils/changeAttribute/deleteAttribute'

interface IProps {
  handleClose: () => void
  handleSaveChanges: () => void
  disabled: any
}

export const EditModalButtons = observer(
  ({ handleClose, disabled, handleSaveChanges }: IProps) => {
    const handleDeleteAttribute = () => {
      deleteAttribute()
      handleClose()
    }

    return (
      <div className="flex justify-between items-center">
        <Button
          text={t('condition.deleteAttribute')}
          variant="diestruction"
          onClick={handleDeleteAttribute}
        />

        <div className="flex">
          <Button
            text={t('general.cancel')}
            variant="secondary"
            className="mr-2"
            onClick={handleClose}
            dataTestId={DecisionTreeModalDataCy.cancelButton}
          />

          <div className="relative">
            <Button
              disabled={disabled}
              text={t('condition.saveChanges')}
              onClick={handleSaveChanges}
            />
          </div>
        </div>
      </div>
    )
  },
)
