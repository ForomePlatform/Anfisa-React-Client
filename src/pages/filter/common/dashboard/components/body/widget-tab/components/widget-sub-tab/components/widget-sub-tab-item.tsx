import { FC } from 'react'

import { WidgetSubTabEnum } from '@pages/filter/common/dashboard/components/body/widget-tab/components/widget-sub-tab/components/widget-sub-tab-enum'
import { WidgetSubTabNumeric } from '@pages/filter/common/dashboard/components/body/widget-tab/components/widget-sub-tab/components/widget-sub-tab-numeric'
import { IExtendedUnit } from '@pages/filter/common/dashboard/dashboard.interfaces'
import {
  AttributeKinds,
  IEnumPropertyStatus,
  INumericPropertyStatus,
} from '@service-providers/common'

interface IWidgetSubTabItemProps {
  unit: IExtendedUnit
  onSelectUnit: () => void
}

export const WidgetSubTabItem: FC<IWidgetSubTabItemProps> = ({
  unit,
  onSelectUnit,
}) => {
  switch (unit.kind) {
    case AttributeKinds.ENUM:
      return (
        <WidgetSubTabEnum
          unit={unit as IEnumPropertyStatus}
          onSelectUnit={onSelectUnit}
        />
      )
    case AttributeKinds.NUMERIC:
      return (
        <WidgetSubTabNumeric
          unit={unit as INumericPropertyStatus}
          onSelectUnit={onSelectUnit}
        />
      )
    default:
      return null
  }
}
