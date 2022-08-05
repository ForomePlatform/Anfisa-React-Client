import { FC } from 'react'

import { WidgetSubTabEnum } from '@pages/filter/common/dashboard/components/body/widget-tab/components/widget-sub-tab/components/widget-sub-tab-enum'
import { WidgetSubTabNumeric } from '@pages/filter/common/dashboard/components/body/widget-tab/components/widget-sub-tab/components/widget-sub-tab-numeric'
import { TExtendedUnit } from '@pages/filter/common/dashboard/dashboard.interfaces'
import {
  AttributeKinds,
  IEnumPropertyStatus,
  INumericPropertyStatus,
} from '@service-providers/common'

interface IWidgetSubTabItemProps {
  unit: TExtendedUnit
}

export const WidgetSubTabItem: FC<IWidgetSubTabItemProps> = ({ unit }) => {
  switch (unit.kind) {
    case AttributeKinds.ENUM:
      return <WidgetSubTabEnum unit={unit as IEnumPropertyStatus} />
    case AttributeKinds.NUMERIC:
      return <WidgetSubTabNumeric unit={unit as INumericPropertyStatus} />
    default:
      return null
  }
}
