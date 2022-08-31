import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { approxOptions } from '@core/approxOptions'
import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import datasetStore from '@store/dataset/dataset'
import { Dropdown } from '@components/dropdown'
import { IDropdownValue } from '@components/dropdown/dropdown.interfaces'

interface IAprroxAndStateProps {
  approx: IDropdownValue<ApproxNameTypes>[]
  className?: Argument
  onChangeApprox: (value: IDropdownValue<ApproxNameTypes>) => void
}

export const AprroxAndState = ({
  approx,
  className,
  onChangeApprox,
}: IAprroxAndStateProps): ReactElement => (
  <div className={cn('flex justify-between text-14', className)}>
    <div className="flex items-center flex-1">
      <span className="text-18 leading-14px">Approx</span>

      <Dropdown
        onChange={onChangeApprox}
        values={approx}
        options={approxOptions}
        disabled={datasetStore.isXL}
        className="ml-1.5 flex-1"
      />
    </div>
  </div>
)
