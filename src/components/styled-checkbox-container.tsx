import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'
import styled from 'styled-components'

import { theme } from '@theme'

interface IStyledCheckboxProps {
  checked: boolean
  id: number | string
  label: string
  className?: Argument
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
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
    border-right: 1px solid ${theme('colors.white')};
    border-bottom: 1px solid ${theme('colors.white')};
  }
`
const Label = styled.label`
  font-size: 12px;
  margin-left: 8px;
  cursor: pointer;
`

const Checkbox = styled.input`
  display: none;
  &:checked + ${CheckMark} {
    background-color: ${theme('colors.blue.bright')};
    border: 1px solid ${theme('colors.blue.bright')};
  }
  &:checked ~ ${Label} {
    font-weight: 700;
  }
`

export const StyledCheckboxContainer = ({
  checked,
  onChange,
  className,
  disabled,
  id,
  label,
  datatestId,
}: IStyledCheckboxProps): ReactElement => (
  <>
    <Checkbox
      id={`${'checkbox'} + ${id}`}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={cn('hidden font-', className)}
      disabled={disabled}
    />
    <CheckMark htmlFor={`${'checkbox'} + ${id}`}></CheckMark>

    <Label htmlFor={`${'checkbox'} + ${id}`} data-testid={datatestId}>
      {label}
    </Label>
  </>
)
