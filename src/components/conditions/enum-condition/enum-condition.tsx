import { ReactElement, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import { Divider } from '@ui/divider'
import { Switch } from '@ui/switch'
import { Pagintaion } from '@components/pagintaion'
import { QueryBuilderSearch } from '@pages/filter/dtree/components/query-builder/query-builder-search'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { SelectedGroupItem } from '@pages/filter/refiner/components/middle-column/selected-group-item'
import { TVariant } from '@service-providers/common'
import { IEnumConditionProps } from './enum-condition.interface'
import { EnumMods } from './enum-mods'

const initialCount = 8

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
  }: IEnumConditionProps): ReactElement => {
    const ref = useRef<HTMLDivElement>(null)

    const [mode, setMode] = useState(initialEnumMode)
    const [selectedVariants, setSelectedVariants] = useState(
      initialEnumVariants ?? [],
    )
    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [variantsPerPage, setVariantsPerPage] = useState<number>(initialCount)

    useEffect(() => {
      setSearchValue('')
      setCurrentPage(0)
    }, [attributeName])

    /*useEffect(
      () => {
        const element = ref.current as Element

        if (!element) return

        const observer = new ResizeObserver(entries => {
          const { height } = entries[0].contentRect
          const heightOfElement = 37

          const newCount = height / heightOfElement
          if (newCount !== variantsPerPage && newCount > initialCount) {
            setVariantsPerPage(newCount)
          }
        })
        observer.observe(element)

        return () => {
          observer.unobserve(element)
        }
      }, // eslint-disable-next-line react-hooks/exhaustive-deps
      [ref.current],
    )*/

    const preparedSearchValue = searchValue.toLocaleLowerCase()

    const filteredVariants = enumVariants.filter(variant =>
      variant[0].toLocaleLowerCase().includes(preparedSearchValue),
    )

    const pagesCount = Math.ceil(filteredVariants.length / variantsPerPage)

    const variantsPage = filteredVariants.slice(
      currentPage * variantsPerPage,
      (currentPage + 1) * variantsPerPage,
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
      setCurrentPage(0)
    }

    const toggleMode = (mode: ModeTypes) => {
      setMode(currentMode => (currentMode === mode ? undefined : mode))
      onTouch?.()
    }

    const handleSearchChange = (value: string) => {
      setSearchValue(value)

      if (currentPage === 0) return
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

    const showFinder = enumVariants.length > initialCount
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
                isChecked={!!isShowZeroes}
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

        <div
          className="flex flex-1 mb-4 justify-between flex-row-reverse"
          style={{
            maxHeight: `calc(100% - ${showFinder ? 220 : 174}px)`,
          }}
          ref={ref}
        >
          <div>
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

          <div className="h-full flex flex-col">
            {variantsPage.length > 0 ? (
              variantsPage.map(variant => (
                <SelectedGroupItem
                  key={variant[0]}
                  isSelected={selectedVariants.includes(variant[0])}
                  variant={variant}
                  handleCheckGroupItem={handleCheckGroupItem}
                  className="last:mb-0"
                />
              ))
            ) : (
              <div className="flex justify-center items-center text-14 text-grey-blue">
                {t('condition.noFilters')}
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

        {controls &&
          controls({ value: selectedVariants, mode, clearValue: handleClear })}
      </>
    )
  },
)
