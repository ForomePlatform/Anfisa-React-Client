import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { DatasetCreationErrorsEnum } from '@core/enum/dataset-creation-errors-enum'
import { PatnNameEnum } from '@core/enum/path-name-enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset/dataset'
import dirinfoStore from '@store/dirinfo'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import filterPresetsStore from '@store/filter-presets'
import operations from '@store/operations'
import mainTableStore from '@store/ws/main-table.store'
import zoneStore from '@store/ws/zone.store'
import { Routes } from '@router/routes.enum'
import { Dialog } from '@ui/dialog'
import { IBaseDialogProps } from '@ui/dialog/dialog.interface'
import { Icon } from '@ui/icon'
import { Input } from '@ui/input'
import { DecisionTreesMenuDataCy } from '@data-testid'
import { showToast } from '@utils/notifications/showToast'
import {
  noFirstNumberPattern,
  noSpacesPattern,
  noSymbolPattern,
} from '@utils/validation/validationPatterns'

export const CreateDatasetDialog = observer(
  ({ onClose, isOpen }: IBaseDialogProps) => {
    const history = useHistory()
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string>('')
    const startDatasetName = toJS(datasetStore.datasetName)
    const pathName = history.location.pathname
    const { wsList } = mainTableStore
    const isDone = operations.savingStatus[1] === 'Done'

    useEffect(() => {
      if (isOpen) {
        const { conditions } = filterStore
        const dtreeAcceptedVariants = dtreeStore.totalFilteredCounts?.accepted
        const refinerAcceptedVariants =
          filterStore.stat.filteredCounts?.variants
        const mainTableVariants = mainTableStore.fixedStatAmount.variantCounts

        if (
          pathName === PatnNameEnum.FilterDtree &&
          dtreeAcceptedVariants === 0
        ) {
          setError(DatasetCreationErrorsEnum.EmptyDataset)
          return
        }

        if (
          pathName === PatnNameEnum.FilterRefiner &&
          (refinerAcceptedVariants === 0 || conditions.length === 0)
        ) {
          setError(DatasetCreationErrorsEnum.EmptyDataset)
          return
        }

        if (pathName === PatnNameEnum.Ws && mainTableVariants === 0) {
          setError(DatasetCreationErrorsEnum.EmptyDataset)
          return
        }

        if (
          pathName === PatnNameEnum.Ws &&
          !filterPresetsStore.activePreset &&
          conditions.length === 0
        ) {
          setError(DatasetCreationErrorsEnum.ChooseAnyFilter)
          return
        }

        setError('')
      } else {
        setValue('')
      }
    }, [isOpen, pathName])

    const saveDatasetAsync = async () => {
      if (toJS(dirinfoStore.dsDistKeys).includes(value)) {
        setError(DatasetCreationErrorsEnum.DatasetExists)

        return
      }

      const result = await operations.saveDatasetAsync(value, pathName)

      if (!result.ok && result.message) {
        setError(result.message)

        return
      }

      zoneStore.resetAllSelectedItems()
    }

    const handleClose = () => {
      if (operations.isCreationOver && !isDone) {
        onClose()
        operations.resetSavingStatus()

        setValue('')

        return
      }

      if (operations.isCreationOver) {
        onClose()

        setValue('')

        if (pathName === PatnNameEnum.Ws) {
          datasetStore.setDatasetName(startDatasetName)
          wsList.invalidate()
        }

        operations.resetSavingStatus()
      } else {
        showToast(t('general.creaitionIsInProcess'), 'warning')
      }
    }

    const handleOpenDataset = () => {
      datasetStore.setDatasetName(value)
      isDone && history.push(`${Routes.WS}?ds=${value}`)
      onClose()

      operations.resetSavingStatus()

      zoneStore.clearZone()
      filterStore.reset()
      zoneStore.resetAllSelectedItems()
    }

    const handleChange = (name: string) => {
      if (
        error === DatasetCreationErrorsEnum.EmptyDataset ||
        error === DatasetCreationErrorsEnum.ChooseAnyFilter
      ) {
        return
      }

      if (
        noSymbolPattern.test(name) ||
        noFirstNumberPattern.test(name) ||
        noSpacesPattern.test(name) ||
        name.length > 250
      ) {
        setError(DatasetCreationErrorsEnum.IncorrectName)
      } else {
        setError('')
      }

      setValue(name)
    }

    const applyText = isDone
      ? t('dsCreation.openIt')
      : t('dsCreation.addDataset')

    return (
      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        title={t('dsCreation.addDatasetTitle')}
        applyText={applyText}
        isApplyDisabled={!value.trim() || error.length > 0}
        onApply={isDone ? handleOpenDataset : saveDatasetAsync}
        isLoading={!operations.isCreationOver}
        width="s"
      >
        <div className="flex flex-col">
          <div>
            <div className="mt-1">
              <Input
                disabled={!operations.isCreationOver}
                value={value}
                label={t('dsCreation.label')}
                onChange={e => handleChange(e.target.value)}
                dataTestId={DecisionTreesMenuDataCy.datasetNameInput}
              />
            </div>

            <span className="text-12 text-red-secondary mt-2">{error}</span>
          </div>

          {!isDone && pathName === PatnNameEnum.Ws && (
            <div className="mt-5 flex items-center">
              <Icon name="Attention" className="mr-2 text-red-light" />

              <span className="text-12">{t('dsCreation.attention')}</span>
            </div>
          )}

          <span className="mt-2 text-14">{operations.savingStatus[1]}</span>
        </div>
      </Dialog>
    )
  },
)
