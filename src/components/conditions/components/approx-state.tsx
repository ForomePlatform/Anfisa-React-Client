import { ChangeEvent, ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { approxOptions } from '@core/approxOptions'
import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import datasetStore from '@store/dataset/dataset'
import { Select } from '@ui/select'

interface IAprroxAndStateProps {
  approx: string
  className?: Argument
  onChangeApprox: (value: ApproxNameTypes) => void
}

export const AprroxAndState = ({
  approx,
  className,
  onChangeApprox,
}: IAprroxAndStateProps): ReactElement => (
  <div className={cn('flex justify-between text-14', className)}>
    <div className="flex items-center flex-1">
      <span className="text-18 leading-14px">Approx</span>

      <Select
        value={approx}
        options={approxOptions}
        disabled={datasetStore.isXL}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          onChangeApprox(e.target.value as ApproxNameTypes)
        }
        className="ml-1.5 py-1.5 pl-2 flex-1 bg-white border-grey-blue"
      />
    </div>
  </div>
)
