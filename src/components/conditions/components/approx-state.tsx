import { ChangeEvent, ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { approxOptions } from '@core/approxOptions'
import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { t } from '@i18n'
import datasetStore from '@store/dataset/dataset'
import { Select } from '@ui/select'

interface IAprroxAndStateProps {
  approx: string
  className?: Argument
  onChangeApprox: (value: ApproxNameTypes) => void
}

export const AprroxAndState = ({
  approx,
  onChangeApprox,
  className,
}: IAprroxAndStateProps): ReactElement => (
  <div className={cn('flex justify-between text-14 px-4', className)}>
    <div className="flex items-center flex-1">
      <span className="text-18 leading-14px">Approx</span>

      <Select
        value={approx}
        options={approxOptions}
        disabled={datasetStore.isXL}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          onChangeApprox(e.target.value as ApproxNameTypes)
        }
        className="ml-1.5 py-1 pl-3 pr-3.5 flex-1 bg-white"
      />
    </div>

    <div className="flex items-center ml-6">
      <span>{t('dtree.state')}</span>

      <Select
        options={['current']}
        className="w-full ml-1.5 py-1 pl-3 pr-3.5 opacity-50"
        disabled={true}
      />
    </div>
  </div>
)
