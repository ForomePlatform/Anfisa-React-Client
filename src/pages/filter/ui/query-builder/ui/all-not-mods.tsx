import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import { SubKindsEnum } from '@core/enum/sub-kinds-enum'
import { t } from '@i18n'
import { ModsDivider } from './mods-divider'

interface IAllNotModsProps {
  isAllModeDisabled?: boolean
  isNotModeDisabled?: boolean
  isAllModeChecked?: boolean
  isNotModeChecked?: boolean
  toggleAllMode?: () => void
  toggleNotMode?: () => void
  groupSubKind?: string
}

export const AllNotMods = observer(
  ({
    isAllModeDisabled,
    isNotModeDisabled,
    isAllModeChecked,
    isNotModeChecked,
    toggleAllMode,
    toggleNotMode,
    groupSubKind,
  }: IAllNotModsProps) => (
    <div className="flex text-14 text-blue-bright">
      {(groupSubKind === SubKindsEnum.Multi ||
        groupSubKind === SubKindsEnum.InheritanceZ) && (
        <>
          <div className="flex items-center">
            <Checkbox
              checked={isAllModeChecked ?? false}
              className="mr-1 cursor-pointer"
              disabled={isAllModeDisabled}
              onChange={toggleAllMode}
            />

            <span>{t('dtree.all')}</span>
          </div>

          <ModsDivider />
        </>
      )}

      <div className="flex items-center">
        <Checkbox
          checked={isNotModeChecked ?? false}
          className="mr-1 cursor-pointer"
          disabled={isNotModeDisabled}
          onChange={toggleNotMode}
        />

        <span>{t('dtree.not')}</span>
      </div>
    </div>
  ),
)
