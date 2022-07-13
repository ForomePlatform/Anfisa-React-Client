import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import variantStore from '@store/ws/variant'
import { Button } from '@ui/button'
import { Loader } from '@ui/loader'
import { VariantDrawerDataCy } from '@data-testid'
import { TagsList } from './tags-list'
import { TagsPopover } from './tags-popover'

export const DrawerTags = observer(() => {
  const [popoverAnchorEl, setPopoverAnchorEl] =
    useState<HTMLElement | null>(null)

  const {
    tags: { recordTags, availableTags, isLoading },
    record: { genes, locus },
  } = variantStore

  const closePopover = () => {
    setPopoverAnchorEl(null)
  }

  const handleSaveTags = (tags: string[]): void => {
    variantStore.tags.saveTags(tags)
    closePopover()
  }

  return (
    <div className="flex items-center">
      <span className="text-14 text-white pr-3">{t('variant.tags')}</span>

      <div className="mr-3">
        <Button
          className="whitespace-nowrap"
          text={t('general.plusAdd')}
          size="xs"
          padding="dense"
          variant="secondary-dark"
          onClick={event => setPopoverAnchorEl(event.currentTarget)}
          dataTestId={VariantDrawerDataCy.addTag}
        />
      </div>
      {isLoading ? <Loader size="xs" /> : <TagsList tags={recordTags} />}
      <TagsPopover
        isOpen={!isLoading && !!popoverAnchorEl}
        anchorEl={popoverAnchorEl}
        onClose={closePopover}
        recordTitle={
          <>
            {`[${genes}] `}
            <span dangerouslySetInnerHTML={{ __html: locus }} />
          </>
        }
        tags={availableTags}
        selected={recordTags}
        onSave={handleSaveTags}
      />
    </div>
  )
})
