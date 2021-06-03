import { ReactElement, ReactNode } from 'react'
import cn, { Argument } from 'classnames'

type Props = {
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
  ...rest
}: Props): ReactElement => {
  console.log(className)

  return (
    <div
      className={cn(
        'py-2 leading-16px',
        {
          'text-blue-bright underline cursor-pointer': isClickable,
          'bg-blue-bright bg-opacity-10': isActive,
          'text-grey-blue font-medium border-t border-grey-light': isTitleBaseInfo,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
