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
        <div className="truncate" style={{ maxWidth: '65%' }}>
          {variantName}
        </div>

        <div className="truncate text-grey-blue" style={{ maxWidth: '30%' }}>
          {variantValue} {variantValue > 1 ? 'variants' : 'variant'}
        </div>
      </div>
    </>
  )
}
