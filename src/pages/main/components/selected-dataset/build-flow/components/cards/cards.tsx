import { useEffect } from 'react'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react-lite'

import { ExploreGenomeTypes } from '@core/enum/explore-genome-types-enum'
import { datasetStore } from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { Card, CardTitle } from '@ui/card'
import { Radio } from '@ui/radio'
import { GlbPagesNames } from '@glb/glb-names'
import { secondaryDsNameByKey } from '../secondary-ds-name-by-key'
import {
  datasetDescription,
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

        <div className="mt-2 text-14">
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

        <div className="mt-2 text-14">
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
        className="mb-4 text-14 overflow-y-auto"
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

  const openNextPage = () => {
    datasetStore.setDatasetName(ds)
    const nextPageData = getNextPageData(
      props.selectedValue as ExploreGenomeTypes,
      ds,
    )

    history.push(nextPageData.route)
    filterStore.setMethod(nextPageData.method as GlbPagesNames)
  }

  useEffect(() => {
    wizardStore.wizardScenario[props.id].title = ds
    wizardStore.updateSelectedDataset(ds)
  }, [props.id, ds])

  return (
    <Card className={'mt-4'}>
      <CardTitleWithEdit
        title={ds}
        isEditDisabled={props.editDisabled}
        onEdit={() => wizardStore.editCard(props.id)}
      />

      <div className="mb-4">
        <Card className="w-full mt-4 bg-grey-tertiary">
          <div className="font-bold mb-2">Description</div>

          <div
            className="text-12 overflow-y-auto"
            style={{ maxHeight: '14vh' }}
          >
            {datasetDescription}
          </div>
        </Card>
      </div>

      <div className="mt-2 text-14">
        <CardRadioList
          optionsList={exploreCandidateOptionsList}
          selectedOption={props.selectedValue}
          onChange={option =>
            wizardStore.setDescriptionOption(option, props.id)
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
    </Card>
  )
}
