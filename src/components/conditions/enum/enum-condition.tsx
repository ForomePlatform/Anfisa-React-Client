import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import { Divider } from '@ui/divider'
import { FlatList } from '@ui/flat-list'
import { Loader } from '@ui/loader'
import { Switch } from '@ui/switch'
import { UnitChart } from '@components/units-list/unit-chart'
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
    initialVariants,
    initialEnumMode,
    isShowZeroes,
    isDataReady,
    listHeight,
    selectedDashboardVariants,
    selectedAttributeStatus,
    toggleShowZeroes,
    onTouch,
    controls,
  }: IEnumConditionProps): ReactElement => {
    const [mode, setMode] = useState(initialEnumMode)
    const [selectedVariants, setSelectedVariants] = useState<string[]>(
      initialVariants ?? [],
    )

    const [isChartsVisible, setISChartsVisible] = useState(true)

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
    const selectedEnumName =
      selectedDashboardVariants?.[0] || selectedVariants[0]

    const selectedEnumIndex = useMemo(() => {
      return filteredVariants.findIndex(([name]) => name === selectedEnumName)
    }, [filteredVariants, selectedEnumName])

    const onSelectVariantByChart = useCallback(
      (variant: string) => {
        selectedVariants.includes(variant)
          ? setSelectedVariants(prev => prev.filter(item => item !== variant))
          : setSelectedVariants(prev => [...prev, variant])

        onTouch?.()
      },
      [onTouch, selectedVariants],
    )

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

          <EnumMods
            selectAllVariants={selectAllVariants}
            clearAllVariants={clearAllVariants}
          />
        </div>

        <div className="w-full flex justify-end items-center mb-4 text-14">
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

          <Divider spacing="dense" orientation="vertical" color="blue-light" />

          <div className="flex items-center">
            <Switch
              className="mr-1"
              isChecked={isChartsVisible}
              onChange={() => setISChartsVisible(prev => !prev)}
            />

            <span className="text-grey-blue">
              {t('enumCondition.showVisually')}
            </span>
          </div>
        </div>

        <div className="flex justify-end">
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

        {selectedAttributeStatus && isChartsVisible && (
          <div className="-mt-1">
            <UnitChart
              unit={selectedAttributeStatus}
              selectedVariants={selectedVariants}
              className="w-full !bg-transparent"
              isLight
              onSelectVariantByChart={onSelectVariantByChart}
            />
          </div>
        )}

        {isDataReady ? (
          <div style={{ height: listHeight }} className="overflow-auto">
            {filteredVariants.length > 0 ? (
              <FlatList
                elements={filteredVariants}
                selectedItemId={selectedEnumName}
                selectedItemIndex={selectedEnumIndex}
                renderRow={(data, index) => (
                  <SelectedGroupItem
                    id={data[index][0]}
                    key={data[index][0]}
                    isSelected={selectedVariants.includes(data[index][0])}
                    variant={data[index]}
                    handleCheckGroupItem={handleCheckGroupItem}
                    className="mb-3"
                  />
                )}
              />
            ) : (
              <div className="flex justify-center items-center text-14 text-grey-blue">
                {t('condition.noFilters')}
              </div>
            )}
          </div>
        ) : (
          <Loader size="m" />
        )}

        {controls &&
          controls({ value: selectedVariants, mode, clearValue: handleClear })}
      </>
    )
  },
)
