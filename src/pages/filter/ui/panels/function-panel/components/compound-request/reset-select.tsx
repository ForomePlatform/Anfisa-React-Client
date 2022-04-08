import { ChangeEvent, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { Select } from '@ui/select'
import compoundRequestStore from './compound-request.store'

export const resetOptions = [
  'Homozygous Recessive/X-linked',
  'Autosomal Dominant',
  'Compensational',
]

export const ResetSelect = observer(
  (): ReactElement => (
    <div className="flex w-1/2">
      <span>{t('dtree.reset')}</span>

      <Select
        options={resetOptions}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          compoundRequestStore.handleSetComplexRequest(e.target.value)
          filterStore.setIsChanged()
        }}
        className="w-full ml-2"
        value={compoundRequestStore.resetValue}
        reset
      />
    </div>
  ),
)
