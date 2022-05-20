import { ReactElement, useEffect } from 'react'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Pagintaion } from '@components/pagintaion'
import activeStepStore from '@pages/filter/dtree/components/active-step.store'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { QueryBuilderSearch } from '../../../query-builder/query-builder-search'
import modalsControlStore from '../../modals-control-store'
import modalsVisibilityStore from '../../modals-visibility-store'
import { EditModalButtons } from '../ui/edit-modal-buttons'
import { HeaderModal } from '../ui/header-modal'
import { ModalBase } from '../ui/modal-base'
import { SelectModalButtons } from '../ui/select-modal-buttons'
import { EnumList } from './components/enum-list'
import { EnumMods } from './components/enum-mods'
import modalFiltersStore from './modal-enum.store'

export const ModalEnum = observer((): ReactElement => {
  const { groupName, currentStepGroups } = modalsControlStore

  const currentStepIndex = activeStepStore.activeStepIndex
  const currentGroupIndex = modalsVisibilityStore.groupIndexToChange

  const currentGroup =
    dtreeStore.stepList[currentStepIndex].groups[currentGroupIndex]

  const currentGroupToModify = dtreeStore.stepList[currentStepIndex].groups

  const {
    filteredGroupList,
    pagesNumbers,
    searchValue,
    currentPage,
    groupsPerPage,
    originGroupList,
  } = modalFiltersStore

  useEffect(() => {
    if (currentGroup) {
      modalFiltersStore.checkIfSelectedFiltersExist(currentGroup)
    }

    return () => {
      dtreeStore.resetSelectedFilters()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGroupIndex])

  useEffect(() => {
    const dispose = reaction(
      () => dtreeStore.selectedFilters,
      () => {
        if (dtreeStore.selectedFilters.length < 2) {
          modalFiltersStore.currentMode === ModeTypes.All &&
            modalFiltersStore.resetCurrentMode()
        }

        if (dtreeStore.selectedFilters.length < 1) {
          modalFiltersStore.resetCurrentMode()
        }
      },
    )

    return () => dispose()
  }, [])

  const handleChange = (value: string) => {
    modalFiltersStore.setSearchValue(value)

    if (currentPage === 0) return

    modalFiltersStore.setCurrentPage(0)
  }

  const handlePageNumber = (value: number): void => {
    modalFiltersStore.setCurrentPage(value)
  }

  const handleAddAttribute = (action: ActionType): void => {
    modalFiltersStore.addAttribute(action)
  }

  return (
    <ModalBase minHeight={200}>
      <HeaderModal
        groupName={groupName}
        handleClose={() => modalFiltersStore.closeModal()}
      />

      {originGroupList.length > 15 && (
        <div className="flex mt-3">
          <QueryBuilderSearch
            value={searchValue}
            onChange={handleChange}
            isSubgroupItemSearch
          />
        </div>
      )}

      <div className="flex justify-between items-center w-full mt-4 text-14">
        <div className="text-14 text-grey-blue">
          {dtreeStore.selectedFilters.length || 0} {t('dtree.selected')}
        </div>

        <div className="flex flex-col">
          <EnumMods />

          <div className="flex justify-end mt-1">
            <AllNotMods
              isAllModeChecked={modalFiltersStore.currentMode === ModeTypes.All}
              isNotModeChecked={modalFiltersStore.currentMode === ModeTypes.Not}
              isAllModeDisabled={dtreeStore.selectedFilters.length < 2}
              isNotModeDisabled={!dtreeStore.selectedFilters.length}
              toggleAllMode={() =>
                modalFiltersStore.setCurrentMode(ModeTypes.All)
              }
              toggleNotMode={() =>
                modalFiltersStore.setCurrentMode(ModeTypes.Not)
              }
              groupSubKind={modalFiltersStore.currentGroupSubKind}
            />
          </div>
        </div>
      </div>

      <EnumList />

      {filteredGroupList.length > groupsPerPage && (
        <Pagintaion
          pagesNumbers={pagesNumbers}
          currentPage={currentPage}
          setPageNumber={handlePageNumber}
        />
      )}

      {currentGroup ? (
        <EditModalButtons
          handleClose={() => modalFiltersStore.closeModal()}
          handleSaveChanges={() => modalFiltersStore.saveChanges()}
          disabled={dtreeStore.selectedFilters.length === 0}
        />
      ) : (
        <SelectModalButtons
          handleClose={() => modalFiltersStore.closeModal()}
          handleModals={() => modalFiltersStore.openModalAttribute()}
          handleModalJoin={() => modalsControlStore.openModalJoin()}
          disabled={dtreeStore.selectedFilters.length === 0}
          currentGroup={currentGroupToModify ?? currentStepGroups}
          handleAddAttribute={handleAddAttribute}
        />
      )}
    </ModalBase>
  )
})
