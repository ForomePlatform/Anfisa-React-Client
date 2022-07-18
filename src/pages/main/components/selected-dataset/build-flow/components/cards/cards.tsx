import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ExploreGenomeTypes } from '@core/enum/explore-genome-types-enum'
import { datasetStore } from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { Card, CardTitle } from '@ui/card'
import { Icon } from '@ui/icon'
import { Radio } from '@ui/radio'
import { GlbPagesNames } from '@glb/glb-names'
import { secondaryDsNameByKey } from '../secondary-ds-name-by-key'
import {
  datasetDescriptionDefault,
  exploreCandidateOptionsList,
  optionsForOpenButton,
  startFlowOptionsList,
  whatsNextOptionsList,
} from '../wizard/wizard.data'
import wizardStore, { ICardProps } from '../wizard/wizard.store'
import { getNextPageData } from '../wizard/wizard.utils'
import { CardTitleWithEdit } from './components/card-edit-title'
import { CardRadioList } from './components/card-radio-list'

export const StartCard = (props: ICardProps) => {
  const isExploreGenomeDisabled = !datasetStore.isXL
  const isExploreCandidateDisabled =
    !wizardStore.secondaryDatasets && datasetStore.isXL

  const isEditionProhibited =
    isExploreGenomeDisabled || isExploreCandidateDisabled

  const isEditDisabled = isEditionProhibited ?? props.editDisabled

  return (
    <Card className={'mt-4'}>
      <>
        <CardTitleWithEdit
          title={props.title}
          isEditDisabled={isEditDisabled}
          onEdit={() => wizardStore.editCard(props.id)}
        />

        <div className="mt-4 text-14">
          {startFlowOptionsList.map(option => (
            <div className="flex mb-2" key={option}>
              <Radio
                className="flex items-center"
                checked={option === props.selectedValue}
                onChange={() =>
                  wizardStore.setStartWithOption(option, props.id)
                }
                disabled={props.contentDisabled}
              >
                <div className="ml-1.5">{option}</div>
              </Radio>
            </div>
          ))}

          <div className="flex justify-end">
            <Button
              text="Continue"
              onClick={() => wizardStore.finishEditCard(props.id)}
              disabled={props.continueDisabled}
            />
          </div>
        </div>
      </>
    </Card>
  )
}

export const WhatsNextCard = (props: ICardProps) => {
  const history = useHistory()

  const openNextPage = () => {
    const nextPageData = getNextPageData(
      props.selectedValue as ExploreGenomeTypes,
      datasetStore.datasetName,
    )

    history.push(nextPageData.route)
    filterStore.setMethod(nextPageData.method as GlbPagesNames)
  }
  return (
    <Card className={'mt-4'}>
      <>
        <CardTitleWithEdit
          title={props.title}
          isEditDisabled={props.editDisabled}
          onEdit={() => wizardStore.editCard(props.id)}
        />

        <div className="mt-4 text-14">
          <CardRadioList
            optionsList={whatsNextOptionsList}
            selectedOption={props.selectedValue}
            onChange={option =>
              wizardStore.setWhatsNextOption(option, props.id)
            }
            isOptionsDisabled={props.contentDisabled}
          />

          <div className="flex justify-end">
            {optionsForOpenButton.includes(props.selectedValue) ? (
              <Button
                text="Open"
                onClick={openNextPage}
                disabled={props.continueDisabled}
              />
            ) : (
              <Button
                text="Continue"
                onClick={() => wizardStore.finishEditCard(props.id)}
                disabled={props.continueDisabled}
              />
            )}
          </div>
        </div>
      </>
    </Card>
  )
}

export const ExistingCandidatesCard = observer((props: ICardProps) => {
  const secodaryDatasets = wizardStore.secondaryDatasets
  const onSelect = (ds: string) => {
    wizardStore.setSelectedDataset(ds, props.id)
    wizardStore.finishEditCard(props.id)
  }

  return (
    <Card className="mt-4 px-0">
      <CardTitle text={props.title} className="text-16 px-4" />

      <div
        className="mb-4 mt-2 text-14 overflow-y-auto"
        style={{ maxHeight: props.maxHeight }}
      >
        {secodaryDatasets?.map(
          secondaryDsNameByKey(1, onSelect, wizardStore.selectedDataset),
        )}
      </div>
    </Card>
  )
})

export const DescriptionCard = (props: ICardProps) => {
  const history = useHistory()
  const ds = props.title || datasetStore.datasetName

  const note = dirinfoStore.dirInfoData?.dsDict[ds]?.note
  const editIcon = note?.length ? (
    <Icon name="Edit" className={cn('text-blue-bright')} />
  ) : (
    <span className={cn('text-blue-bright')}>+</span>
  )

  const [isEditMode, setEditMode] = useState(false)
  const [isUpdated, setUpdated] = useState(false)
  const [isDescriptionSaving, setDescriptionSaving] = useState(false)
  const [datasetDescription, setDatasetDescription] = useState(
    note || datasetDescriptionDefault,
  )

  const onEdit = () => {
    setEditMode(true)
  }

  const openNextPage = () => {
    datasetStore.setDatasetName(ds)
    const nextPageData = getNextPageData(
      props.selectedValue as ExploreGenomeTypes,
      ds,
    )

    history.push(nextPageData.route)
    filterStore.setMethod(nextPageData.method as GlbPagesNames)
  }

  const saveDescription = () => {
    setDescriptionSaving(true)
    console.log(datasetDescription)
    setTimeout(() => {
      setUpdated(true)
      setEditMode(false)
      setDescriptionSaving(false)
    }, 2000)
  }

  useEffect(() => {
    wizardStore.wizardScenario[props.id].title = ds
    wizardStore.updateSelectedDataset(ds)
  }, [props.id, ds])

  const DescriptionBlock = isEditMode ? (
    <textarea
      className="text-12"
      style={{
        height: '14vh',
        outline: 'none',
        width: '100%',
        background: 'transparent',
      }}
      autoFocus
      defaultValue={note || ''}
      onChange={e => {
        setDatasetDescription(e.target.value)
      }}
    />
  ) : (
    <div
      className="text-12 overflow-y-auto"
      style={{ maxHeight: '14vh', outline: 'none' }}
    >
      {datasetDescription}
    </div>
  )

  const ContinueButton = optionsForOpenButton.includes(props.selectedValue) ? (
    <Button
      text="Open"
      onClick={openNextPage}
      disabled={props.continueDisabled}
    />
  ) : (
    <Button
      text="Continue"
      onClick={() => wizardStore.finishEditCard(props.id)}
      disabled={props.continueDisabled}
    />
  )

  return (
    <Card className={'mt-4'}>
      <CardTitleWithEdit
        title={ds}
        isEditDisabled={props.editDisabled}
        onEdit={() => wizardStore.editCard(props.id)}
      />

      <div className="mb-4">
        <Card className="w-full mt-4 bg-grey-tertiary">
          <div className="flex items-center mb-2">
            <span className="font-bold">Description</span>
            {!isEditMode && !isUpdated && (
              <Button
                variant="secondary"
                style={{ padding: 0 }}
                className={cn('cursor-pointer', 'mx-2')}
                icon={editIcon}
                onClick={onEdit}
              />
            )}
            {isUpdated && (
              <Icon name="Check" className={cn('text-blue-bright', 'mx-2')} />
            )}
          </div>
          {DescriptionBlock}
        </Card>
      </div>

      <div className="mt-2 text-14">
        <CardRadioList
          optionsList={exploreCandidateOptionsList}
          selectedOption={isEditMode ? '' : props.selectedValue}
          onChange={option =>
            wizardStore.setDescriptionOption(option, props.id)
          }
          isOptionsDisabled={isEditMode || props.contentDisabled}
        />

        <div className="flex justify-end">
          {isEditMode ? (
            <Button
              text="Save description"
              onClick={saveDescription}
              disabled={isDescriptionSaving}
            />
          ) : (
            ContinueButton
          )}
        </div>
      </div>
    </Card>
  )
}
