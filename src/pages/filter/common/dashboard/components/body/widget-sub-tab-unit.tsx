import { ReactElement } from 'react'

// TODO: fix any type
export interface IWidgetSubTabUnitProps {
  variantName: string
  variantValue: number
}

export const WidgetSubTabUnit = ({
  variantName,
  variantValue,
}: IWidgetSubTabUnitProps): ReactElement => {
  return (
    <>
      <div className="w-full flex items-center justify-between mb-3 last:mb-1 text-white text-12">
        <div className="flex">{variantName}</div>

        <div className="flex text-grey-blue">
          {variantValue} {variantValue > 1 ? 'variants' : 'variant'}
        </div>
      </div>
    </>
  )
}
