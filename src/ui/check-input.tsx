import { ChangeEvent, FC } from 'react'
import cn, { Argument } from 'classnames'
import styled from 'styled-components'

import { theme } from '@theme'
export interface ICheckInputProps {
  id: string | number
  type: 'checkbox' | 'radio'
  checked: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  className?: Argument
  disabled?: boolean
  datatestId?: string
}

const CheckMark = styled.label`
  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  border: 1px solid ${theme('colors.grey.blue')};
  border-radius: 0.125rem;
  transition: all 0.2s;
  cursor: pointer;
  &:after {
    content: '';
    position: absolute;
    top: 45%;
    left: 50%;
    width: 5px;
    height: 9px;
    transform: translate(-50%, -50%) rotateZ(40deg);
    border-right: 1px solid transparent;
    border-bottom: 1px solid transparent;
  }
`
const Label = styled.label`
  margin-left: 8px;
  cursor: pointer;
`

const Checkbox = styled.input<{ disabled?: boolean }>`
  display: none;
  &:checked + ${CheckMark} {
    background-color: ${theme('colors.blue.bright')};
    border: 1px solid ${theme('colors.blue.bright')};
    &:after {
      border-right: 1px solid ${theme('colors.white')};
      border-bottom: 1px solid ${theme('colors.white')};
    }
  }
  &:checked ~ ${Label} {
    font-weight: 700;
  }
`

export const CheckInput: FC<ICheckInputProps> = ({
  checked,
  disabled,
  onChange,
  id,
  className,
  type,
  children,
  datatestId,
}) => {
  return type === 'radio' ? (
    <label htmlFor={id.toString()} className={cn(className)}>
      <input
        type={type}
        id={id.toString()}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="mr-1"
      />
      {children}
    </label>
  ) : (
    <div className={cn('flex items-center', className)}>
      <Checkbox
        id={`${'checkbox'} + ${id}`}
        type={type}
        checked={checked}
        onChange={onChange}
        className={cn('hidden', className)}
        disabled={disabled}
      />

      <CheckMark htmlFor={`${'checkbox'} + ${id}`}></CheckMark>

      <Label htmlFor={`${'checkbox'} + ${id}`} data-testid={datatestId}>
        {children}
      </Label>
    </div>
  )
}
