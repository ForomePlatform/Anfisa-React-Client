import { Fragment, ReactElement, useEffect, useState } from 'react'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { FilterList } from '@declarations'
import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import presetStore from '@store/filterPreset'
import { Button } from '@ui/button'
import { DropDown } from '@ui/dropdown'
import { Input } from '@ui/input'
import { PopperButton } from '@components/popper-button'
import { DatasetCreationButton } from '@pages/ws/ui/dataset-creation-button'
import { compareConditions } from '@utils/filter-refiner/compareConditions'
import { showToast } from '@utils/notifications/showToast'
import { validatePresetName } from '@utils/validation/validatePresetName'
import { FilterButton } from './filter-button'
import { FilterModal } from './filter-modal'

export const FilterControlRefiner = observer((): ReactElement => {
  const activePreset: string = datasetStore.activePreset

  const [createPresetName, setCreatePresetName] = useState<string>('')

  const isSelectedFiltersEmpty: boolean = isEmpty(filterStore.selectedFilters)

  const canBeModified = (preset: FilterList): boolean => {
    return filterStore.actionName === ActionFilterEnum.Delete ||
      filterStore.actionName === ActionFilterEnum.Modify
      ? !preset.standard
      : true
  }

  const presets: string[] = get(datasetStore, 'dsStat.filter-list', [])
    .filter(canBeModified)
    .map((preset: FilterList) => preset.name)

  useEffect(() => {
    const dispose = reaction(
      () => datasetStore.activePreset,
      () => {
        if (!datasetStore.activePreset) datasetStore.resetActivePreset()
      },
    )

    return () => dispose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isApplyDisabled =
    activePreset.startsWith('⏚') &&
    (filterStore.actionName === ActionFilterEnum.Modify ||
      filterStore.actionName === ActionFilterEnum.Delete)

  useEffect(() => {
    if (isSelectedFiltersEmpty) filterStore.resetActionName()
  }, [isSelectedFiltersEmpty])

  const handleClick = () => {
    if (filterStore.actionName === ActionFilterEnum.Delete) {
      presetStore.handleDeletePreset()
    }

    if (filterStore.actionName === ActionFilterEnum.Join) {
      const isConditionsAbleToJoin = compareConditions({
        currentConditions: datasetStore.conditions,
        startConditions: datasetStore.startPresetConditions,
        currentPreset: datasetStore.activePreset,
        prevPreset: datasetStore.prevPreset,
      })

      if (!isConditionsAbleToJoin) {
        showToast(t('error.cantJoinTheSamePreset'), 'error')

        return
      }

      presetStore.handleJoinPreset(datasetStore.activePreset)
    }

    if (filterStore.actionName === ActionFilterEnum.Create) {
      const isPresetNameValid = validatePresetName(createPresetName)

      if (!isPresetNameValid) {
        showToast(t('filter.notValidName'), 'error')

        return
      }

      if (isSelectedFiltersEmpty) {
        showToast(t('error.chooseFiltersFirst'), 'error')

        return
      }

      presetStore.handleCreatePreset(createPresetName)
    }

    if (filterStore.actionName === ActionFilterEnum.Modify) {
      const isConditionsAbleToModify = compareConditions({
        currentConditions: datasetStore.conditions,
        startConditions: datasetStore.startPresetConditions,
        currentPreset: datasetStore.activePreset,
        prevPreset: datasetStore.prevPreset,
      })

      if (!datasetStore.activePreset) {
        showToast(t('error.choosePresetFirst'), 'error')

        return
      }

      if (!isConditionsAbleToModify) {
        showToast(t('error.noChangesToModify'), 'error')

        return
      }

      presetStore.handleModifyPreset(datasetStore.activePreset)
    }
  }

  return (
    <Fragment>
      <div className="flex items-center border-black">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-grey-blue text-14 font-bold">
              {t('filter.presets')}
            </span>

            <span
              className="text-blue-bright text-14 cursor-pointer"
              onClick={() => filterStore.setActionName(ActionFilterEnum.Create)}
            >
              {t('filter.createPreset')}
            </span>
          </div>

          {filterStore.actionName === ActionFilterEnum.Create ? (
            <Input
              value={createPresetName}
              placeholder={t('filter.presetName')}
              className="bg-blue-lighter text-white border-2 border-blue-bright"
              style={{ width: 209 }}
              onChange={e => setCreatePresetName(e.target.value)}
            />
          ) : (
            <DropDown
              options={presets}
              value={activePreset}
              onSelect={args => presetStore.handleLoadPreset(args.value)}
            />
          )}
        </div>

        {!isSelectedFiltersEmpty && (
          <PopperButton
            ButtonElement={FilterButton}
            ModalElement={FilterModal}
          />
        )}

        {filterStore.actionName && (
          <>
            <Button
              text={t('general.apply')}
              size="md"
              onClick={handleClick}
              disabled={isApplyDisabled}
              className="text-white mt-auto ml-2"
            />

            <Button
              text={t('general.cancel')}
              size="md"
              variant={'secondary-dark'}
              className="mt-auto ml-2"
              onClick={() => {
                setCreatePresetName('')
                filterStore.resetActionName()
              }}
            />
          </>
        )}
      </div>

      <DatasetCreationButton />
    </Fragment>
  )
})
