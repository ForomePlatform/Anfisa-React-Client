import { ReactElement } from 'react'

export interface IWidgetSubTabEnumProps {
  variantName: string
  variantValue: number
}

export const WidgetSubTabEnum = ({
  variantName,
  variantValue,
}: IWidgetSubTabEnumProps): ReactElement => {
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
