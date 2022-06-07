import { ReactElement } from 'react'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import { Checkbox } from '@ui/checkbox/checkbox'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import { Loader } from '@components/loader'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { ICustomInheritanceModeVariantsProps } from '../custom-inheritance-mode.interface'

export const CustomInheritanceModeVariants = ({
  isFetching,
  attributeSubKind,
  variants,
  mode,
  toggleMode,
}: ICustomInheritanceModeVariantsProps): ReactElement => (
  <div className="flex justify-between items-cente text-14">
    {isFetching ? (
      <Loader size="s" className="h-6 mb-4" />
    ) : variants?.length ? (
      <Checkbox
        id={variants[0][1]}
        className="mb-4"
        disabled={true}
        checked={true}
      >
        <span data-testid={DecisionTreesResultsDataCy.variantsList}>True</span>

        <span className="text-grey-blue ml-2">
          {variants[0][1]} {t('dtree.variants')}
        </span>
      </Checkbox>
    ) : (
      <div className="flex justify-center mb-4 items-center text-grey-blue">
        {t('dtree.noFilters')}
      </div>
    )}

    <div className="mb-4">
      <AllNotMods
        groupSubKind={attributeSubKind}
        isNotModeChecked={mode === ModeTypes.Not}
        isNotModeDisabled={!variants?.length}
        toggleNotMode={() => toggleMode(ModeTypes.Not)}
      />
    </div>
  </div>
)
