import { ReactElement } from 'react'

export interface IWidgetSubTabNumericProps {
  min: number
  max: number
}

export const WidgetSubTabNumeric = ({
  min,
  max,
}: IWidgetSubTabNumericProps): ReactElement => {
  return (
    <>
      <div className="w-full flex items-center justify-between mb-1 text-white text-12">
        <div>{`${min} \u2264 ... \u2264 ${max}`}</div>
      </div>
    </>
  )
}
