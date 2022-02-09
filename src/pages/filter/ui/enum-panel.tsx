import { ReactElement, useEffect, useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable, toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { Pagintaion } from '@components/pagintaion'
import { QueryBuilderSearch } from './query-builder/query-builder-search'
import { SelectedGroupItem } from './selected-group-item'

const variantsPerPage = 12

const enumPanelState = makeAutoObservable({
  get group() {
    return [
      filterStore.selectedGroupItem.vgroup,
      filterStore.selectedGroupItem.name,
    ]
  },

  get variants(): [string, number][] {
    return toJS(
      datasetStore.dsStat['stat-list']?.find(
        (item: any) => item.name === this.group[1],
      )?.variants ?? [],
    )
  },

  get datasetVariants(): string[] {
    return (
      datasetStore.conditions.find(
        (element: any[]) => element[1] === this.group[1],
      )?.[3] ?? []
    )
  },
})

export const EnumPanel = observer((): ReactElement => {
  const {
    group: [group, groupItem],
    variants,
    datasetVariants,
  } = enumPanelState

  const [selectedVariants, setSelectedVariants] = useState<string[]>([])

  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    setSearchValue('')
    setCurrentPage(0)
  }, [groupItem])

  const preparedSearchValue = searchValue.toLocaleLowerCase()
  const filteredVariants = variants.filter(variant =>
    variant[0].toLocaleLowerCase().includes(preparedSearchValue),
  )

  const pagesCount = Math.ceil(filteredVariants.length / variantsPerPage)

  const variantsPage = filteredVariants.slice(
    currentPage * variantsPerPage,
    (currentPage + 1) * variantsPerPage,
  )

  const handleCheckGroupItem = (
    checked: boolean,
    variant: [string, number],
  ) => {
    const variantName = variant[0]

    if (checked) {
      setSelectedVariants([...selectedVariants, variantName])
    } else {
      setSelectedVariants(
        selectedVariants.filter(element => element !== variantName),
      )
    }
  }

  const handleClear = () => {
    const localSelectedFilters = cloneDeep(filterStore.selectedFilters)

    if (localSelectedFilters[group]?.[groupItem]) {
      delete localSelectedFilters[group][groupItem]

      if (datasetStore.activePreset) datasetStore.resetActivePreset()
    }

    filterStore.setSelectedFilters(localSelectedFilters)

    datasetStore.removeConditionGroup({ subGroup: groupItem })

    if (!datasetStore.isXL) {
      datasetStore.fetchWsListAsync()
    }

    setCurrentPage(0)
  }

  const handleAddConditions = () => {
    if (selectedVariants.length === 0) return

    if (datasetStore.activePreset) datasetStore.resetActivePreset()

    const newVariants = [...selectedVariants, ...datasetVariants]

    datasetStore.setConditionsAsync([
      [
        FilterKindEnum.Enum,
        filterStore.selectedGroupItem.name,
        'OR',
        newVariants,
      ],
    ])
    setCurrentPage(0)

    if (!datasetStore.isXL) {
      datasetStore.fetchWsListAsync()
    }

    /**
     * TODO: I think it would be better to update the state of filters
     *       based on the setConditionsAsync response,
     *       than use separately updated filter state
     */
    const localSelectedFilters = cloneDeep(filterStore.selectedFilters)

    if (!localSelectedFilters[group]) {
      localSelectedFilters[group] = {}
    }

    if (!localSelectedFilters[group][groupItem]) {
      localSelectedFilters[group][groupItem] = {}
    }

    const selectedSubAttributes: Record<string, number> = {}

    newVariants.forEach(variantName => {
      const variant = variants.find(variant => variant[0] === variantName)

      if (variant) {
        selectedSubAttributes[variant[0]] = variant[1]
      }
    })
    localSelectedFilters[group][groupItem] = selectedSubAttributes

    filterStore.setSelectedFilters(localSelectedFilters)
    setSelectedVariants([])
  }

  const handleChange = (value: string) => {
    setSearchValue(value)

    if (currentPage !== 0) {
      setCurrentPage(0)
    }
  }

  const isBlockAddBtn = selectedVariants.length === 0

  return (
    <div>
      <div className="flex mt-3">
        <QueryBuilderSearch
          value={searchValue}
          onChange={handleChange}
          isSubgroupItemSearch
        />
      </div>

      <div className="mt-4">
        <div className="flex-1 mt-4 overflow-y-auto">
          {variantsPage.length > 0 ? (
            variantsPage.map(
              variant =>
                variant[1] !== 0 && (
                  <SelectedGroupItem
                    key={variant[0]}
                    isSelected={selectedVariants.includes(variant[0])}
                    isInDataset={datasetVariants.includes(variant[0])}
                    variant={variant}
                    handleCheckGroupItem={handleCheckGroupItem}
                  />
                ),
            )
          ) : (
            <div className="flex justify-center items-center text-14 text-grey-blue">
              {t('dtree.noFilters')}
            </div>
          )}
        </div>
      </div>

      {pagesCount > 1 && (
        <Pagintaion
          pagesNumbers={pagesCount}
          currentPage={currentPage}
          setPageNumber={setCurrentPage}
        />
      )}
      <div className="flex items-center justify-between mt-1 pb-2">
        <Button
          variant="secondary"
          text={t('general.clear')}
          onClick={handleClear}
        />

        <Button
          text={t('general.add')}
          onClick={handleAddConditions}
          disabled={isBlockAddBtn}
        />
      </div>
    </div>
  )
})
