import style from './undo-redo-buttons.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { Icon } from '@ui/icon'

interface IUndoRedoButtons {
  onUndo: () => void
  onRedo: () => void
  isUndoDisabled: boolean
  isRedoDisabled: boolean
}

export const UndoRedoButtons = ({
  onUndo,
  onRedo,
  isUndoDisabled,
  isRedoDisabled,
}: IUndoRedoButtons): ReactElement => (
  <div className={cn(style.undoRedo)}>
    <button
      onClick={onUndo}
      disabled={isUndoDisabled}
      className={style.undoRedo_button}
    >
      <Icon name="Undo" />
    </button>

    <button
      onClick={onRedo}
      disabled={isRedoDisabled}
      className={cn(style.undoRedo_button, style.undoRedo_button_right)}
    >
      <Icon name="Redo" />
    </button>
  </div>
)
