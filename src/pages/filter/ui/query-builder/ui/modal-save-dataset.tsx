import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { DatasetCreationErrorsEnum } from '@core/enum/dataset-creation-errors-enum'
import { FilterMethodEnum } from '@core/enum/filter-method.enum'
import { PatnNameEnum } from '@core/enum/path-name-enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import filterZone from '@store/filterZone'
import operations from '@store/operations'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { Attention } from '@ui/icons/attention'
import { Input } from '@ui/input'
import { DecisionTreesMenuDataCy } from '@components/data-testid/decision-tree-menu.cy'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'

export const noSymbolPattern = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~§±№-]/
export const noFirstNumberPattern = /^[\d_]/

export const ModalSaveDataset = observer(() => {
  const ref = useRef<any>(null)
  const history = useHistory()
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string>('')
  const startDatasetName = toJS(datasetStore.datasetName)
  const pathName = history.location.pathname

  const isDone = operations.savingStatus[1] === 'Done'

  useEffect(() => {
    if (
      pathName === PatnNameEnum.Filter &&
      filterStore.method === FilterMethodEnum.DecisionTree &&
      dtreeStore.acceptedVariants === 0
    ) {
      setError(DatasetCreationErrorsEnum.EmptyDataset)
    }

    if (
      pathName === PatnNameEnum.Filter &&
      filterStore.method === FilterMethodEnum.Refiner &&
      datasetStore.statAmount[0] === 0
    ) {
      setError(DatasetCreationErrorsEnum.EmptyDataset)
    }

    if (pathName === PatnNameEnum.Ws && datasetStore.statAmount[0] === 0) {
      setError(DatasetCreationErrorsEnum.EmptyDataset)
    }

    if (
      pathName === PatnNameEnum.Ws &&
      !datasetStore.activePreset &&
      datasetStore.conditions.length === 0
    ) {
      setError(DatasetCreationErrorsEnum.ChooseAnyFilter)
    }
  }, [pathName])

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

    filterZone.resetAllSelectedItems()
    datasetStore.resetActivePreset()
    isDone && history.push(`${Routes.WS}?ds=${value}`)
  }

  const handleClose = () => {
    if (!value || !isDone) {
      dtreeStore.closeModalSaveDataset()
      operations.resetSavingStatus()

      return
    }

    if (operations.isCreationOver) {
      dtreeStore.closeModalSaveDataset()

      if (pathName === PatnNameEnum.Ws) {
        datasetStore.initDatasetAsync(startDatasetName)
      }

      operations.resetSavingStatus()
    } else {
      toast.warning(t('general.creaitionIsInProcess'), {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      })
    }
  }

  const handleOpenDataset = () => {
    isDone && history.push(`${Routes.WS}?ds=${value}`)

    dtreeStore.closeModalSaveDataset()
    pathName === PatnNameEnum.Ws && datasetStore.initDatasetAsync(value)
    operations.resetSavingStatus()

    datasetStore.setActivePreset('')
    datasetStore.resetData()
    datasetStore.clearZone()
    datasetStore.resetConditions()
    filterStore.resetData()
    dtreeStore.resetData()
    filterZone.resetAllSelectedItems()
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
      name.length > 250
    ) {
      setError(DatasetCreationErrorsEnum.IncorrectName)
    } else {
      setError('')
    }

    setValue(name)
  }

  return (
    <ModalBase refer={ref} minHeight={200} width="520px">
      <HeaderModal
        groupName={t('dsCreation.addDatasetTitle')}
        handleClose={handleClose}
      />

      <div className="flex flex-col mt-4" ref={ref}>
        <div className="">
          <span className="text-14">{t('dsCreation.label')}</span>

          <Input
            value={value}
            onChange={e => handleChange(e.target.value)}
            className="mt-1"
            data-testid={DecisionTreesMenuDataCy.datasetNameInput}
          />

          <span className="text-12 text-red-secondary mt-2">{error}</span>
        </div>

        {!isDone && pathName !== PatnNameEnum.Filter && (
          <div className="mt-5 flex items-center">
            <Attention className="mr-2" />

            <span className="text-12">{t('dsCreation.attention')}</span>
          </div>
        )}

        <span className="mt-2 text-14">
          {operations.savingStatus[1]}

          {isDone && (
            <span
              className="ml-2 mt-1 text-14 text-blue-bright cursor-pointer"
              onClick={handleOpenDataset}
            >
              Open It
            </span>
          )}
        </span>

        <div className="flex ml-auto mt-6">
          <Button
            text={t('general.cancel')}
            hasBackground={false}
            isBlackText
            className="border-grey-light hover:bg-grey-light"
            onClick={handleClose}
            dataTestId={DecisionTreesMenuDataCy.cancelAddNewDataset}
          />

          <Button
            text={t('dsCreation.addDataset')}
            className="ml-4 hover:bg-blue-bright hover:text-white"
            disabled={!value.trim() || error.length > 0}
            hasBackground={false}
            isBlackText
            onClick={saveDatasetAsync}
            dataTestId={DecisionTreesMenuDataCy.addNewDataset}
          />
        </div>
      </div>
    </ModalBase>
  )
})
