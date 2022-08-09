import { ReactElement, ReactNode } from 'react'
import cn, { Argument } from 'classnames'

interface IInfoTextItemProps {
  children?: ReactElement | ReactNode
  className?: Argument
  isClickable?: boolean
  isActive?: boolean
  isTitleBaseInfo?: boolean
  onClick?: () => void
}

export const InfoTextItem = ({
  children,
  isClickable,
  isActive,
  isTitleBaseInfo,
  className,
  onClick,
  ...rest
}: IInfoTextItemProps): ReactElement => {
  return (
    <div
      onClick={isClickable ? onClick : undefined}
      className={cn(
        'py-2 leading-16px',
        {
          'text-blue-bright cursor-pointer px-4 text-md font-normal':
            isClickable,
          'bg-blue-bright bg-opacity-10': isActive && isClickable,
          'text-grey-blue font-medium mx-4 text-sm font-medium':
            isTitleBaseInfo,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
