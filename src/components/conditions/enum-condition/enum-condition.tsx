import { ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import { Divider } from '@ui/divider'
import { Switch } from '@ui/switch'
import { PaginationList } from '@components/pagination-list'
import { QueryBuilderSearch } from '@pages/filter/dtree/components/query-builder/query-builder-search'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { SelectedGroupItem } from '@pages/filter/refiner/components/middle-column/selected-group-item'
import { TVariant } from '@service-providers/common'
import { IEnumConditionProps } from './enum-condition.interface'
import { EnumMods } from './enum-mods'

export const DEFAULT_COUNT = 8

export const EnumCondition = observer(
  ({
    attributeName,
    enumVariants,
    attributeSubKind,
    initialEnumVariants,
    initialEnumMode,
    isShowZeroes,
    toggleShowZeroes,
    onTouch,
    controls,
    paginationHeight,
  }: IEnumConditionProps): ReactElement => {
    const [mode, setMode] = useState(initialEnumMode)
    const [selectedVariants, setSelectedVariants] = useState(
      initialEnumVariants ?? [],
    )
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
      setSearchValue('')
    }, [attributeName])

    const preparedSearchValue = searchValue.toLocaleLowerCase()

    const filteredVariants = enumVariants.filter(variant =>
      variant[0].toLocaleLowerCase().includes(preparedSearchValue),
    )

    const handleCheckGroupItem = (checked: boolean, variant: TVariant) => {
      const variantName = variant[0]

      if (checked) {
        setSelectedVariants([...selectedVariants, variantName])
      } else {
        setSelectedVariants(
          selectedVariants.filter(element => element !== variantName),
        )
      }

      onTouch?.()
    }

    const handleClear = () => {
      setSelectedVariants([])
      setMode(undefined)
    }

    const toggleMode = (mode: ModeTypes) => {
      setMode(currentMode => (currentMode === mode ? undefined : mode))
      onTouch?.()
    }

    const handleSearchChange = (value: string) => {
      setSearchValue(value)
    }

    const selectAllVariants = () => {
      const allVariants = filteredVariants.map(([variantName]) => variantName)

      setSelectedVariants(allVariants)

      onTouch?.()
    }

    const clearAllVariants = () => {
      setSelectedVariants([])

      setMode(undefined)
    }

    const showFinder = enumVariants.length > DEFAULT_COUNT

    return (
      <>
        {showFinder && (
          <QueryBuilderSearch
            value={searchValue}
            onChange={handleSearchChange}
            isSubgroupItemSearch
            className="mb-4"
          />
        )}

        <div className="flex justify-between items-center w-full mb-4 text-14">
          <div className="text-14 text-grey-blue">
            {selectedVariants.length || 0} {t('dtree.selected')}
          </div>

          <div className="flex items-center">
            <div className="flex items-center">
              <Switch
                className="mr-1"
                isChecked={isShowZeroes}
                onChange={toggleShowZeroes}
              />
              <span className="text-grey-blue">
                {t('enumCondition.showZeroVariants')}
              </span>
            </div>

            <Divider orientation="vertical" color="light" />

            <EnumMods
              selectAllVariants={selectAllVariants}
              clearAllVariants={clearAllVariants}
            />
          </div>
        </div>
        <div className="flex justify-end mb-2">
          <AllNotMods
            groupSubKind={attributeSubKind}
            isAllModeChecked={mode === ModeTypes.All}
            isNotModeChecked={mode === ModeTypes.Not}
            isAllModeDisabled={selectedVariants.length < 2}
            isNotModeDisabled={!selectedVariants.length}
            toggleAllMode={() => toggleMode(ModeTypes.All)}
            toggleNotMode={() => toggleMode(ModeTypes.Not)}
          />
        </div>

        <div
          className="overflow-hidden flex-grow-1"
          style={{ height: paginationHeight }}
        >
          {filteredVariants.length > 0 ? (
            <PaginationList
              elements={filteredVariants}
              render={variant => (
                <SelectedGroupItem
                  key={variant[0]}
                  isSelected={selectedVariants.includes(variant[0])}
                  variant={variant}
                  handleCheckGroupItem={handleCheckGroupItem}
                  className="last:mb-0"
                />
              )}
            />
          ) : (
            <div className="flex justify-center items-center text-14 text-grey-blue">
              {t('dtree.noFilters')}
            </div>
          )}
        </div>

        {controls &&
          controls({ value: selectedVariants, mode, clearValue: handleClear })}
      </>
    )
  },
)
