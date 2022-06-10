import style from '../undo-redo-buttons.module.css'

import { FC, MouseEvent } from 'react'
import cn, { Argument } from 'classnames'

interface IUndoRedoButtonProps {
  className?: Argument
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

export const UndoRedoButton: FC<IUndoRedoButtonProps> = ({
  className,
  onClick,
  disabled,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(style.undoRedo_button, className)}
    >
      {children}
    </button>
  )
}
