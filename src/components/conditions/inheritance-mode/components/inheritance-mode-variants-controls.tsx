import { ReactElement } from 'react'
import cn from 'classnames'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import { Divider } from '@ui/divider'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { IInheritanceModeVariantsControlsProps } from '../inheritance-mode.interface'
export const InheritanceModeVariantsControls = ({
  selectedVariants,
  attributeSubKind,
  mode,
  className,
  onSelectAllVariants,
  onClearAllVariants,
  toggleMode,
}: IInheritanceModeVariantsControlsProps): ReactElement => (
  <div className={cn('flex justify-between w-full my-3 text-14', className)}>
    <div className="text-14 text-grey-dark">
      {selectedVariants.length} {t('dtree.selected')}
    </div>

    <div className="flex flex-col items-end">
      <div className="flex text-blue-bright">
        <button onClick={onSelectAllVariants}>{t('general.selectAll')}</button>

        <Divider spacing="dense" orientation="vertical" color="blue-light" />

        <button
          onClick={onClearAllVariants}
          disabled={!selectedVariants.length}
          className={cn(!selectedVariants.length && 'text-grey-blue')}
        >
          {t('general.clearAll')}
        </button>
      </div>

      <div className="flex justify-end mt-3">
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
    </div>
  </div>
)
