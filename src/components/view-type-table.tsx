import { ReactElement } from 'react'

import { ViewTypeTableEnum } from '@core/enum/view-type-table-enum'
import { t } from '@i18n'
import { Radio } from '@ui/radio'

interface IViewTypeTableProps {
  value: ViewTypeTableEnum
  onChange: (viewType: ViewTypeTableEnum) => void
}

export const ViewTypeTable = ({
  value,
  onChange,
}: IViewTypeTableProps): ReactElement => (
  <div className="flex items-center text-14 leading-14 mt-3">
    {[ViewTypeTableEnum.Compact, ViewTypeTableEnum.Cozy].map(viewTypeItem => (
      <Radio
        checked={value === viewTypeItem}
        id={viewTypeItem}
        key={viewTypeItem}
        className="mr-4 flex items-center"
        onChange={() => onChange(viewTypeItem)}
      >
        {t(`ds.${viewTypeItem}`)}
      </Radio>
    ))}
  </div>
)
