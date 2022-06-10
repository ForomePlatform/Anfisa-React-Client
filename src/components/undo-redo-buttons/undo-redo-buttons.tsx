import style from './undo-redo-buttons.module.css'

import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import { Routes } from '@router/routes.enum'
import { Icon } from '@ui/icon'
import { UndoRedoButton } from '@components/undo-redo-buttons/components/undo-redo-button'

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
    <UndoRedoButton onClick={onUndo} disabled={isUndoDisabled}>
      <Icon name="Undo" />
    </UndoRedoButton>

    <UndoRedoButton
      onClick={onRedo}
      disabled={isRedoDisabled}
      className={style.undoRedo_button_right}
    >
      <Icon name="Redo" />
    </UndoRedoButton>

    <Link className={cn(style.undoRedo_closeIcon)} to={Routes.Root}>
      <Icon size={15} name="Close" />
    </Link>
  </div>
)
