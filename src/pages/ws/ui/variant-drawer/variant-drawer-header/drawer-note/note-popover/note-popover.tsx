import styles from './note-popover.module.css'

import { ReactElement, ReactNode, useEffect, useMemo, useState } from 'react'

import { useResizeTextAreaHeight } from '@core/hooks/use-resize-text-area-height'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { IPopoverProps } from '@ui/popover'
import { VariantDrawerDataCy } from '@components/data-testid/variant-drawer.cy'
import { validateNotes } from '@utils/validation/validateNotes'
import { DrawerPopover } from '../../drawer-popover'

interface INotePopoverProps
  extends Pick<IPopoverProps, 'isOpen' | 'anchorEl' | 'onClose'> {
  noteText?: string
  recordTitle?: ReactNode
  onSave: (noteText: string | null) => void
}

export const NotePopover = ({
  noteText,
  recordTitle,
  isOpen,
  onSave,
  onClose,
  ...popoverProps
}: INotePopoverProps): ReactElement => {
  const textareaRef = useResizeTextAreaHeight()
  const [value, setValue] = useState(noteText ?? '')

  const error = useMemo(() => validateNotes(value), [value])

  useEffect(() => {
    if (isOpen) {
      setValue(noteText ?? '')
    }
  }, [isOpen, noteText])

  return (
    <DrawerPopover
      className={styles.notePopover}
      isOpen={isOpen}
      title={t('variant.notesFor', {
        title: <span className="text-blue-bright">{recordTitle}</span>,
      })}
      onClose={onClose}
      {...popoverProps}
    >
      <textarea
        ref={textareaRef}
        placeholder={t('variant.textAboutSomething')}
        value={value}
        onChange={event => setValue(event.target.value)}
        className={styles.notePopover__textarea}
      />
      {error && <div className={styles.notePopover__error}>{error}</div>}
      <div className={styles.notePopover__controls}>
        <Button
          className={styles.notePopover__deleteButton}
          text={t('general.delete')}
          onClick={() => onSave(null)}
          variant="diestruction"
        />
        <Button
          text={t('general.cancel')}
          onClick={onClose}
          variant="secondary"
          className="mr-2"
        />
        <Button
          text={t('variant.saveNote')}
          disabled={!!error}
          onClick={() => onSave(value)}
          dataTestId={VariantDrawerDataCy.saveTags}
        />
      </div>
    </DrawerPopover>
  )
}