import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Divider } from '@ui/divider'

interface IEnumModsProps {
  clearAllVariants: () => void
  selectAllVariants: () => void
}

export const EnumMods = observer(
  ({ clearAllVariants, selectAllVariants }: IEnumModsProps): ReactElement => (
    <div className="flex">
      <div
        className="cursor-pointer text-blue-bright"
        onClick={selectAllVariants}
      >
        {t('general.selectAll')}
      </div>

      <Divider spacing="dense" orientation="vertical" color="blue-light" />

      <div
        className="cursor-pointer text-blue-bright"
        onClick={clearAllVariants}
      >
        {t('general.clearAll')}
      </div>
    </div>
  ),
)
