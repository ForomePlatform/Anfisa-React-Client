import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

interface Props {
  className?: Argument
  onClick?: () => void
}

export const CopySvg = ({ className, onClick }: Props): ReactElement => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0 stroke-current', className)}
      onClick={onClick}
    >
      <path
        d="M10.5 10.4998H13.5V2.49976H5.5V5.49976"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 5.49976H2.5V13.4998H10.5V5.49976Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
