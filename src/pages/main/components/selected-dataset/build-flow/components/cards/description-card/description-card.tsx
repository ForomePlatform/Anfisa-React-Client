import styles from './description-card.module.css'

import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import cn from 'classnames'

import { ExploreGenomeTypes } from '@core/enum/explore-genome-types-enum'
import { getApiUrl } from '@core/get-api-url'
import { t } from '@i18n'
import { datasetStore } from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { Card } from '@ui/card'
import { Icon } from '@ui/icon'
import { GlbPagesNames } from '@glb/glb-names'
import { showToast } from '@utils/notifications/showToast'
import {
  exploreCandidateOptionsList,
  optionsForOpenButton,
} from '../../wizard/wizard.data'
import { ICardProps } from '../../wizard/wizard.interface'
import wizardStore from '../../wizard/wizard.store'
import { getNextPageData, memorizeLocation } from '../../wizard/wizard.utils'
import { CardTitleWithEdit } from '../components/card-edit-title'
import { CardRadioList } from '../components/card-radio-list'

const descriptions: { [key: string]: string } = {}
let typingTimer: ReturnType<typeof setTimeout>

export const DescriptionCard = (props: ICardProps) => {
  const {
    title,
    id,
    selectedValue,
    continueDisabled,
    contentDisabled,
    editDisabled,
  } = props
  const history = useHistory()
  const ds = title || datasetStore.datasetName

  const note = descriptions[ds] || dirinfoStore.dirInfoData?.dsDict[ds]?.note
  const isOpenButton = optionsForOpenButton.includes(selectedValue)
  const [isEditMode, setEditMode] = useState(false)
  const [isTyping, setTyping] = useState(false)
  const [isSaving, setSaving] = useState(false)
  const [datasetDescription, setDatasetDescription] = useState(
    note || t('home.datasetDescriptionDefault'),
  )
  const fieldDefaultValue =
    datasetDescription === t('home.datasetDescriptionDefault')
      ? ''
      : datasetDescription

  const getEditIconName = () => {
    if (!isEditMode && !note?.length) {
      return 'MiniPlus'
    }
    return isEditMode ? 'Check' : 'Edit'
  }

  const toggleEditMode = () => {
    setEditMode(!isEditMode)
  }

  const openNextPage = () => {
    const nextPageData = getNextPageData(
      selectedValue as ExploreGenomeTypes,
      ds,
    )

    memorizeLocation(nextPageData.route)
    history.push(nextPageData.route)
    filterStore.setMethod(nextPageData.method as GlbPagesNames)
  }

  const saveDescription = async (description: string) => {
    const response = await fetch(getApiUrl('dsinfo'), {
      method: 'POST',
      body: new URLSearchParams({
        ds: ds,
        note: description,
      }),
    })

    setSaving(false)
    if (response?.ok) {
      setTyping(false)
      descriptions[ds] = description
      showToast(t('home.datasetDescriptionSaved'), 'success')
    } else {
      showToast(t('error.smthWentWrong'), 'error')
    }
  }

  const handleChange = (description: string) => {
    setDatasetDescription(description)
    setTyping(true)
    setSaving(true)
    clearTimeout(typingTimer)
    typingTimer = setTimeout(() => {
      saveDescription(description)
    }, 1000)
  }

  useEffect(() => {
    wizardStore.wizardScenario[id].title = ds
    wizardStore.updateSelectedDataset(ds)
  }, [id, ds])

  return (
    <Card className={cn(styles.descriptionCard, 'mt-4')}>
      <CardTitleWithEdit
        title={ds}
        isEditDisabled={editDisabled}
        onEdit={() => wizardStore.editCard(id)}
      />

      <div className="mb-4">
        <Card className="w-full mt-4 bg-grey-tertiary">
          <div className="flex items-center mb-2">
            <span className="font-bold">Description</span>
            {!isTyping && (
              <Button
                variant="secondary"
                size="xs"
                className={cn('cursor-pointer', 'mx-2')}
                icon={
                  <Icon name={getEditIconName()} className="text-blue-bright" />
                }
                onClick={toggleEditMode}
              />
            )}
          </div>
          {isEditMode ? (
            <textarea
              className={cn(styles.descriptionCard__field, 'text-12')}
              autoFocus
              defaultValue={fieldDefaultValue}
              onChange={e => {
                handleChange(e.target.value)
              }}
            />
          ) : (
            <div
              className="text-12 overflow-y-auto"
              style={{ maxHeight: '14vh', outline: 'none' }}
            >
              {datasetDescription}
            </div>
          )}
        </Card>
      </div>

      <div className="mt-2 text-14">
        <CardRadioList
          optionsList={exploreCandidateOptionsList}
          selectedOption={isTyping ? '' : selectedValue}
          onChange={option => wizardStore.setDescriptionOption(option, id)}
          isOptionsDisabled={isTyping || contentDisabled}
        />

        <div className="flex justify-end">
          <Button
            text={isOpenButton ? 'Open' : 'Continue'}
            onClick={
              isOpenButton ? openNextPage : () => wizardStore.finishEditCard(id)
            }
            disabled={continueDisabled || isTyping}
            isLoading={isSaving}
          />
        </div>
      </div>
    </Card>
  )
}
