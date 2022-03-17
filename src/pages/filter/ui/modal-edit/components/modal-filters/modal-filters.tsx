import { ReactElement, useEffect } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Pagintaion } from '@components/pagintaion'
import { SelectModalButtons } from '@pages/filter/ui/query-builder/ui/select-modal-buttons'
import { createChunks } from '@utils/createChunks'
import { QueryBuilderSearch } from '../../../query-builder/query-builder-search'
import { HeaderModal } from '../../../query-builder/ui/header-modal'
import { ModalBase } from '../../../query-builder/ui/modal-base'
import modalEditStore from '../../modal-edit.store'
import { EditModalButtons } from '../edit-modal-buttons'
import { FiltersList } from './components/filters-list'
import { FiltersMods } from './components/filters-mods'
import modalFiltersStore from './modal-filters.store'

export const ModalFilters = observer((): ReactElement => {
  const { currentGroupIndex, groupName, currentGroup, currentStepGroups } =
    modalEditStore

  const { searchValue, currentPage, groupsPerPage } = modalFiltersStore

  const originGroupList: any[] = toJS(dtreeStore.selectedGroups[2]) ?? []

  const filteredGroupList = originGroupList.filter(
    (variant: [string, number]) =>
      variant[0]
        .toLocaleLowerCase()
        .includes(modalFiltersStore.searchValue.toLocaleLowerCase()),
  )

  const chunks = createChunks(filteredGroupList, groupsPerPage)

  useEffect(() => {
    if (currentGroup) {
      modalFiltersStore.checkIfSelectedFiltersExist()
    }

    return () => {
      dtreeStore.resetSelectedFilters()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGroupIndex])

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

        <FiltersMods chunks={chunks} />
      </div>

      <FiltersList chunks={chunks} currentPage={currentPage} />

      {filteredGroupList.length > groupsPerPage && (
        <Pagintaion
          pagesNumbers={chunks.length}
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
          handleModalJoin={() => modalEditStore.openModalJoin()}
          disabled={dtreeStore.selectedFilters.length === 0}
          currentGroup={currentStepGroups}
          handleAddAttribute={handleAddAttribute}
        />
      )}
    </ModalBase>
  )
})
