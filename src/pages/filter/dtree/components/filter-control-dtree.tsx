import { Fragment, ReactElement } from 'react'
import cn from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { FilterList } from '@declarations'
import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { DropDown } from '@ui/dropdown'
import { Input } from '@ui/input'
import { DecisionTreesMenuDataCy } from '@components/data-testid/decision-tree-menu.cy'
import { PopperButton } from '@components/popper-button'
import { DatasetCreationButton } from '@pages/ws/ui/control-panel/dataset-creation-button'
import {
  ActionTypes,
  DtreeModifyingActions,
  TDtreeModifyingActions,
} from '@service-providers/decision-trees'
import { showToast } from '@utils/notifications/showToast'
import { validatePresetName } from '@utils/validation/validatePresetName'
import { FilterButton } from '../../common/filter-control/filter-button'
import { DtreePresetActionModal } from './modals/components/dtree-preset-action-modal'

export const FilterControlDtree = observer((): ReactElement => {
  const trees = get(dtreeStore, 'dtreeList', []).map(preset => preset.name)

  const {
    currentDtreeName,
    previousDtreeName,
    createNewDtreeName,
    actionName,
  } = dtreeStore

  const handleSelect = (dtreeName: string) => {
    dtreeStore.setCurrentDtreeName(dtreeName)

    if (dtreeName === previousDtreeName) {
      return
    }

    dtreeStore.fetchDtreeSetAsync({
      ds: datasetStore.datasetName,
      dtree: dtreeName,
    })
    dtreeStore.setQueryBuilderRenderKey(Date.now())
  }

  const handleCreateTree = () => {
    if (dtreeStore.dtreeCode.length < 13) {
      showToast(t('dtree.dtreeIsEmpty'), 'error')
    } else {
      dtreeStore.setActionName(ActionFilterEnum.Create)
    }
  }

  const handleClick = () => {
    let instruction, notification

    if (actionName === ActionFilterEnum.Create) {
      const isDtreeNameValid = validatePresetName(createNewDtreeName)

      if (!isDtreeNameValid) {
        showToast(t('error.dtreeNameIsNotValid'), 'error')

        return
      }

      instruction = [
        ActionTypes.DTREE,
        DtreeModifyingActions.UPDATE,
        createNewDtreeName,
      ]
      notification = `${t('dtree.dtree')} "${createNewDtreeName}" ${t(
        'dtree.hasBeenCreated',
      )}`
      dtreeStore.setCurrentDtreeName(createNewDtreeName)

      dtreeStore.resetCreateNewDtreeName()
    }

    if (actionName === ActionFilterEnum.Modify) {
      instruction = [
        ActionTypes.DTREE,
        DtreeModifyingActions.UPDATE,
        dtreeStore.currentDtreeName,
      ]
      notification = `${t('dtree.dtree')} "${dtreeStore.currentDtreeName}" ${t(
        'dtree.hasBeenModified',
      )}`

      dtreeStore.setStartDtreeCode()
    }

    dtreeStore.fetchDtreeSetAsync({
      ds: datasetStore.datasetName,
      code: dtreeStore.dtreeCode,
      instr: (instruction as TDtreeModifyingActions) || [],
    })

    notification && showToast(notification, 'success')

    dtreeStore.setActionName()
  }

  const isApplyDisabled =
    dtreeStore.currentDtreeName.startsWith('⏚') &&
    (actionName === ActionFilterEnum.Modify ||
      actionName === ActionFilterEnum.Delete)

  return (
    <Fragment>
      <div className="flex items-center border-black">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-grey-blue text-14 font-bold">
              {t('filter.decisionTrees')}
            </span>

            <span
              className={cn(
                'text-blue-bright text-14 cursor-pointer hover:text-blue-light',
              )}
              onClick={handleCreateTree}
              data-testid={DecisionTreesMenuDataCy.createNew}
            >
              {t('filter.createPreset')}
            </span>
          </div>

          {actionName === ActionFilterEnum.Create ? (
            <Input
              value={createNewDtreeName}
              placeholder={t('dtree.decisionTreeName')}
              className="bg-blue-lighter text-white border-2 border-blue-bright"
              style={{ width: 209 }}
              onChange={e => dtreeStore.setCreateNewDtreeName(e.target.value)}
            />
          ) : (
            <DropDown
              options={trees}
              value={currentDtreeName}
              onSelect={args => handleSelect(args.value)}
            />
          )}
        </div>

        {actionName !== ActionFilterEnum.Create && (
          <PopperButton
            ButtonElement={FilterButton}
            ButtonProps={{ text: actionName }}
            ModalElement={DtreePresetActionModal}
            ModalProps={{
              onSelect: (action: ActionFilterEnum) => {
                dtreeStore.setActionName(action)
              },
            }}
          />
        )}

        {(createNewDtreeName || actionName === ActionFilterEnum.Modify) && (
          <Button
            text={t('general.apply')}
            disabled={isApplyDisabled}
            size="md"
            onClick={handleClick}
            className="text-white mt-auto ml-2"
            dataTestId={DecisionTreesMenuDataCy.applyNewTree}
          />
        )}

        {(createNewDtreeName ||
          actionName === ActionFilterEnum.Modify ||
          actionName === ActionFilterEnum.Create) && (
          <Button
            text={t('general.cancel')}
            size="md"
            variant={'secondary-dark'}
            className={cn('mt-auto ml-2')}
            onClick={() => {
              dtreeStore.setActionName()
              dtreeStore.resetCreateNewDtreeName()
            }}
          />
        )}
      </div>
      <DatasetCreationButton />
    </Fragment>
  )
})
