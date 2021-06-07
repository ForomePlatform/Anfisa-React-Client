import { CSSProperties, ReactElement } from 'react'

interface Props {
  fill?: string
  style?: CSSProperties
  direction?: 'top' | 'right' | 'down' | 'left'
}

export const ArrowSvg = ({ fill, style, direction }: Props): ReactElement => {
  let transform = ''

  switch (direction) {
    case 'top':
      transform = 'rotate(90deg)'
      break
    case 'right':
      transform = 'rotate(180deg)'
      break
    case 'down':
      transform = 'rotate(270deg)'
      break
    default:
      transform = ''
      break
  }

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...style, transform }}
    >
      <path
        d="M10 4L6 8L10 12"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={fill}
      />
    </svg>
  )
}
