import { useRef, useState } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { toast } from 'react-toastify'
import classNames from 'classnames'
import get from 'lodash/get'
import isBoolean from 'lodash/isBoolean'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import variantStore from '@store/variant'
import { Button } from '@ui/button'
import { Input } from '@ui/input'
import { PopperButton } from '@components/popper-button'
import { TagsContainer } from './tags-container'

const DrawerTagButton = observer(({ refEl, onClick }: any) => {
  return (
    <Button
      refEl={refEl}
      text={'+ Add'}
      className={classNames('text-white hover:bg-blue-bright')}
      size="xs"
      hasBackground={false}
      onClick={onClick}
    />
  )
})

const DrawerTagModal = observer(({ close }: any) => {
  const ref = useRef(null)

  useOutsideClick(ref, () => {
    !variantStore.isModalNotesVisible && close()
  })

  const genInfo = get(variantStore, 'variant[0].rows[0].cells[0][0]', '')
  const hg19 = get(variantStore, 'variant[0].rows[1].cells[0][0]', '')

  const [checkedTags, setCheckedTags] = useState<string[]>(
    variantStore.checkedTags,
  )

  const [error, setError] = useState<string>('')

  const [customTag, setCustomTag] = useState<string>('')

  const tags = [...variantStore.generalTags, ...variantStore.optionalTags]

  const handleChange = (value: string) => {
    if (
      tags
        .map(tag => tag.toLocaleLowerCase())
        .includes(value.toLocaleLowerCase())
    ) {
      setError(t('variant.tagExists'))
    } else {
      setError('')
    }

    if (value.length > 30) setError('Tag name is too long')

    setCustomTag(value)
  }

  const handleCheck = (checked: boolean, item: string) => {
    if (checked) {
      setCheckedTags(prev => [...prev, item])
      variantStore.updateTagsWithNotes([item, true])
    } else {
      setCheckedTags(prev => prev.filter(tag => tag !== item))
      variantStore.updateTagsWithNotes([item, true], 'remove')
    }
  }

  const handleSetCustomTag = () => {
    if (variantStore.generalTags.includes(customTag)) {
      toast.error(t('variant.tagExists'), {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      })
    } else {
      variantStore.updateGeneralTags(customTag)
      variantStore.updateTagsWithNotes([customTag, true])
      setCustomTag('')
    }
  }

  const handleSaveTagsAsync = async () => {
    let params = ''

    Object.entries(variantStore.tagsWithNotes).map((tagData, index) => {
      params += `"${tagData[0]}":${
        isBoolean(tagData[1]) ? tagData[1] : `"${tagData[1]}"`
      }`

      if (Object.entries(variantStore.tagsWithNotes)[index + 1]) {
        params += `,`
      }
    })

    variantStore.fetchSelectedTagsAsync(params)
    close()
  }

  const handleClick = (tag: string) => {
    variantStore.showModalNotes()
    variantStore.setCurrentTag(tag)
  }

  return (
    <div
      ref={ref}
      className="bg-blue-light flex flex-col py-5 px-4 rounded-xl overflow-y-auto"
    >
      <span className="w-full">
        <span>{t('variant.tagsFor')} </span>

        <span className="text-blue-bright">
          {`[${genInfo}] `}

          <span dangerouslySetInnerHTML={{ __html: hg19 }} />
        </span>
      </span>

      <div className="mt-4 h-auto overflow-auto" style={{ maxHeight: 300 }}>
        {tags.map(tag => (
          <div key={tag} className="flex items-center mb-4">
            <Checkbox
              checked={
                checkedTags.includes(tag) ||
                Object.keys(variantStore.tagsWithNotes).includes(tag)
              }
              className="w-4 h-4"
              onChange={e => handleCheck(e.target.checked, tag)}
            />

            <span className="text-12 ml-1">{tag}</span>

            <span
              className="ml-2 cursor-pointer hover:text-blue-bright"
              onClick={() => handleClick(tag)}
            >
              {Object.keys(variantStore.tagsWithNotes).includes(tag) && `(#)`}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2 h-auto">
        <Input
          value={customTag}
          onChange={(e: any) => handleChange(e.target.value)}
        />

        <div className="flex justify-between">
          {error && (
            <div className="mt-px text-12 text-red-secondary">{error}</div>
          )}

          <div className="flex justify-end w-full">
            <Button
              text="Add custom tag"
              disabled={!customTag.trim() || !!error}
              hasBackground={false}
              isBlackText
              className="mt-2 hover:bg-blue-bright hover:text-white"
              onClick={handleSetCustomTag}
            />
          </div>
        </div>
      </div>

      <div className="flex mt-4">
        <Button
          text={t('general.cancel')}
          onClick={close}
          hasBackground={false}
          isBlackText
          className="mr-3 ml-auto hover:bg-blue-bright hover:text-white"
        />

        <Button
          text="Save tags"
          hasBackground={false}
          isBlackText
          className="hover:bg-blue-bright hover:text-white"
          onClick={handleSaveTagsAsync}
        />
      </div>
    </div>
  )
})

export const DrawerTags = observer(() => {
  return (
    <div className="flex border-l-2 border-blue-lighter ml-3 items-center">
      <span className="text-14 text-white px-3">{t('variant.tags')}</span>

      <div className="mr-3">
        <PopperButton
          ButtonElement={DrawerTagButton}
          ModalElement={DrawerTagModal}
        />
      </div>

      {variantStore.checkedTags.length > 0 && <TagsContainer />}
    </div>
  )
})
