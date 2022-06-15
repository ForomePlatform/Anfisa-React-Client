import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import variantStore from '@store/ws/variant'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { VariantDrawerDataCy } from '@components/data-testid/variant-drawer.cy'
import { NotePopover } from './note-popover'

export const DrawerNote = observer(() => {
  const {
    tags: { noteText, isLoading },
    record: { genes, locus },
  } = variantStore

  const [popoverAnchorEl, setPopoverAnchorEl] =
    useState<HTMLElement | null>(null)

  const closePopover = () => {
    setPopoverAnchorEl(null)
  }

  const handleSave = (noteText: string | null) => {
    variantStore.setIsTagsModified(true)
    variantStore.tags.saveNote(noteText)
    closePopover()
  }

  return (
    <div className="flex items-center">
      <span className="text-14 text-white pr-3">{t('variant.notes')}</span>
      <Button
        text={noteText ? <Icon name="File" /> : t('general.plusAdd')}
        size="xs"
        padding={noteText ? 'none' : 'dense'}
        variant={noteText ? 'primary' : 'secondary-dark'}
        onClick={event => setPopoverAnchorEl(event.currentTarget)}
        dataTestId={VariantDrawerDataCy.addNote}
      />
      <NotePopover
        isOpen={!isLoading && !!popoverAnchorEl}
        anchorEl={popoverAnchorEl}
        onClose={closePopover}
        recordTitle={
          <>
            {`[${genes}] `}
            <span dangerouslySetInnerHTML={{ __html: locus }} />
          </>
        }
        noteText={noteText}
        onSave={handleSave}
      />
    </div>
  )
})
