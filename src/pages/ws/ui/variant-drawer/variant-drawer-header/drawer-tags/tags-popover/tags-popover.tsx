import styles from './tags-popover.module.css'

import {
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Checkbox } from '@ui/checkbox/checkbox'
import { VariantDrawerDataCy } from '@data-testid'
import { DrawerPopover, IDrawerPopoverProps } from '../../drawer-popover'
import { CustomTagForm } from './custom-tag-form'
import { TTagsOverrides } from './tags-popover.interface'
import { combineTagsAndOverrides } from './tags-popover.utils'

interface ITagsPopoverProps
  extends Pick<IDrawerPopoverProps, 'isOpen' | 'anchorEl' | 'onClose'> {
  tags: string[]
  selected: string[]
  recordTitle?: ReactNode
  onSave: (tags: string[]) => void
}

export const TagsPopover = ({
  isOpen,
  anchorEl,
  onClose,
  tags: tagsProp,
  selected,
  recordTitle,
  onSave,
}: ITagsPopoverProps): ReactElement => {
  const listRef = useRef<HTMLDivElement>(null)
  const [customTags, setCustomTags] = useState<string[]>([])
  const [overrides, setOverrides] = useState<TTagsOverrides>({})

  const tags = useMemo(
    () => [...tagsProp, ...customTags],
    [tagsProp, customTags],
  )

  useEffect(() => {
    setCustomTags([])
    setOverrides({})
  }, [isOpen])

  useEffect(() => {
    const lastTag = customTags[customTags.length - 1]

    listRef.current?.querySelector(`[data-tag="${lastTag}"]`)?.scrollIntoView()
  }, [customTags])

  const handleAddCustomTag = (tag: string) => {
    setCustomTags([...customTags, tag])
    setOverrides({ ...overrides, [tag]: true })
  }

  return (
    <DrawerPopover
      isOpen={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      className={styles.tagsPopover}
      title={t('variant.tagsFor', {
        title: <span className="text-blue-bright">{recordTitle}</span>,
      })}
    >
      <div className={styles.tagsPopover__list} ref={listRef}>
        {tags.map(tagName => (
          <div
            key={tagName}
            className={styles.tagsPopover__tag}
            data-tag={tagName}
          >
            <Checkbox
              checked={overrides[tagName] ?? selected.includes(tagName)}
              onChange={event =>
                setOverrides({ ...overrides, [tagName]: event.target.checked })
              }
            >
              {tagName}
            </Checkbox>
          </div>
        ))}
      </div>
      <CustomTagForm
        className={styles.tagsPopover__custom}
        tags={tags}
        onSubmit={handleAddCustomTag}
      />
      <div className={styles.tagsPopover__controls}>
        <Button
          text={t('general.cancel')}
          onClick={onClose}
          variant="secondary"
          className="mr-2"
        />
        <Button
          text={t('variant.saveTags')}
          onClick={() => onSave(combineTagsAndOverrides(selected, overrides))}
          dataTestId={VariantDrawerDataCy.saveTags}
        />
      </div>
    </DrawerPopover>
  )
}
