import { ChangeEvent, CSSProperties, ReactElement } from 'react'
import cn, { Argument } from 'classnames'

interface IInputProps {
  placeholder?: string
  disabled?: boolean
  value: string
  className?: Argument
  style?: CSSProperties
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  label?: string
  isModal?: boolean
}

export const Input = ({ ...rest }: IInputProps): ReactElement => {
  const { className, style, label, isModal, disabled, ...tempRest } = rest

  const classNameString: string = cn(className)

  const isDefaultBorder: boolean =
    /border-grey-blue/.test(classNameString) ||
    !/bg-[\w-]*/.test(classNameString)

  return (
    <>
      {label && <span className="text-sm">{label}</span>}
      <input
        type="text"
        disabled={disabled}
        className={cn(
          'text-sm rounded-[4px] border w-full leading-tight px-3',
          {
            'border-grey-blue': isDefaultBorder,
            'py-1': isModal,
            'py-1.5': !isModal,
          },
          className,
        )}
        style={style}
        {...tempRest}
      />
    </>
  )
}
