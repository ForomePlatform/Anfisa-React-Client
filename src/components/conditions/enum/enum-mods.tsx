import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Divider } from '@ui/divider'

interface IEnumModsProps {
  isClearAllDisabled: boolean
  isSelectAllDisabled: boolean
  clearAllVariants: () => void
  selectAllVariants: () => void
}

export const EnumMods = observer(
  ({
    isClearAllDisabled,
    isSelectAllDisabled,
    clearAllVariants,
    selectAllVariants,
  }: IEnumModsProps): ReactElement => (
    <div className="flex">
      <button
        className={cn(
          'text-blue-bright',
          isSelectAllDisabled && 'text-grey-blue !cursor-not-allowed',
        )}
        disabled={isSelectAllDisabled}
        onClick={selectAllVariants}
      >
        {t('general.selectAll')}
      </button>

      <Divider spacing="dense" orientation="vertical" color="blue-light" />

      <button
        className={cn(
          'text-blue-bright',
          isClearAllDisabled && 'text-grey-blue !cursor-not-allowed',
        )}
        onClick={clearAllVariants}
        disabled={isClearAllDisabled}
      >
        {t('general.clearAll')}
      </button>
    </div>
  ),
)
