import styles from './description-card.module.css'

import { useEffect } from 'react'
import { useHistory } from 'react-router'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ExploreGenomeTypes } from '@core/enum/explore-genome-types-enum'
import { datasetStore } from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { Card } from '@ui/card'
import { Icon } from '@ui/icon'
import { GlbPagesNames } from '@glb/glb-names'
import {
  exploreCandidateOptionsList,
  optionsForOpenButton,
} from '../../wizard/wizard.data'
import { ICardProps } from '../../wizard/wizard.interface'
import wizardStore from '../../wizard/wizard.store'
import { getNextPageData, memorizeLocation } from '../../wizard/wizard.utils'
import { CardTitleWithEdit } from '../components/card-edit-title'
import { CardRadioList } from '../components/card-radio-list'
import descriptionCardStore from './description-card.store'

export const DescriptionCard = observer((props: ICardProps) => {
  const {
    title,
    id,
    selectedValue,
    continueDisabled,
    contentDisabled,
    editDisabled,
    position,
  } = props
  const history = useHistory()
  const ds = title || datasetStore.datasetName
  const {
    note,
    isEditMode,
    isTyping,
    datasetDescription,
    fieldDefaultValue,
    editIconName,
    setDsName,
    toggleEditMode,
    handleChange,
  } = descriptionCardStore

  const isOpenButton = optionsForOpenButton.includes(selectedValue)

  const openNextPage = () => {
    const nextPageData = getNextPageData(
      selectedValue as ExploreGenomeTypes,
      ds,
    )

    memorizeLocation(nextPageData.route)
    history.push(nextPageData.route)
    filterStore.setMethod(nextPageData.method as GlbPagesNames)
  }

  useEffect(() => {
    // wizardStore.wizardScenario[id].title = ds
    wizardStore.updateSelectedDataset(ds)
    setDsName(ds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, ds])

  return (
    <Card
      isNeedToAnimate={wizardStore.isNeedToAnimateCard(id)}
      className={cn(styles.descriptionCard, 'mt-4')}
      position={position}
    >
      <CardTitleWithEdit
        title={ds}
        isEditShown={!editDisabled}
        onEdit={() => wizardStore.editCard(id)}
      />

      <div className="mb-4">
        <Card className="mt-4 bg-grey-tertiary w-full" position="stretch">
          <div className="flex items-center mb-2">
            <span className="font-bold">Description</span>
            <Button
              variant="secondary"
              size="xs"
              className={cn('cursor-pointer', 'mx-2')}
              icon={<Icon name={editIconName} className="text-blue-bright" />}
              loaderColor="default"
              isLoading={isTyping}
              disabled={isTyping}
              onClick={toggleEditMode}
            />
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
              className={cn(
                styles.descriptionCard__text,
                !note && styles.descriptionCard__text_empty,
                'text-12 overflow-y-auto',
              )}
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

        {editDisabled && (
          <div className="flex justify-end">
            <Button
              text={isOpenButton ? 'Open' : 'Continue'}
              onClick={
                isOpenButton
                  ? openNextPage
                  : () => wizardStore.finishEditCard(id)
              }
              disabled={continueDisabled || isTyping}
            />
          </div>
        )}
      </div>
    </Card>
  )
})
