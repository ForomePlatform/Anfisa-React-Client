import { useHistory } from 'react-router'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ExploreGenomeTypes } from '@core/enum/explore-genome-types-enum'
import { datasetStore } from '@store/dataset'
import filterStore from '@store/filter'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { Card, CardTitle } from '@ui/card'
import { Icon } from '@ui/icon'
import { Radio } from '@ui/radio'
import { GlbPagesNames } from '@glb/glb-names'
import { secondaryDsNameByKey } from '../secondary-ds-name-by-key'
import {
  datasetDescription,
  exploreCandidateOptionsList,
  optionsForOpenButton,
  relevantPresetsList,
  startFlowOptionsList,
  whatsNextOptionsList,
} from '../wizard/wizard.data'
import wizardStore, { ICardProps } from '../wizard/wizard.store'
import { getNextPageData } from '../wizard/wizard.utils'

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
        <div className="flex items-center justify-between">
          <CardTitle text={props.title} className="text-16" />

          <Button
            variant="secondary"
            style={{ padding: 0 }}
            icon={
              <Icon
                name="Edit"
                className={cn(
                  'cursor-pointer',
                  isEditDisabled ? 'text-grey-blue' : 'text-blue-bright',
                )}
              />
            }
            disabled={isEditDisabled}
            onClick={() => wizardStore.editCard(props.id)}
          />
        </div>

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
        <div className="flex items-center justify-between">
          <CardTitle text={props.title} className="text-16" />

          <Button
            variant="secondary"
            style={{ padding: 0 }}
            icon={
              <Icon
                name="Edit"
                className={cn(
                  'cursor-pointer',
                  props.editDisabled ? 'text-grey-blue' : 'text-blue-bright',
                )}
              />
            }
            disabled={props.editDisabled}
            onClick={() => wizardStore.editCard(props.id)}
          ></Button>
        </div>

        <div className="mt-2 text-14">
          {whatsNextOptionsList.map(option => (
            <div className="flex mb-2" key={option}>
              <Radio
                className="flex items-center"
                checked={option === props.selectedValue}
                onChange={() =>
                  wizardStore.setWhatsNextOption(option, props.id)
                }
                disabled={props.contentDisabled}
              >
                <div className="ml-1.5">{option}</div>
              </Radio>
            </div>
          ))}

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

export const PresetsCard = (props: ICardProps) => {
  const history = useHistory()

  const openNextPage = () => {
    history.push(
      `${Routes.Refiner}?ds=${
        wizardStore.selectedDataset || datasetStore.datasetName
      }`,
    )
    filterStore.setMethod(GlbPagesNames.Refiner)
  }

  return (
    <Card className={'mt-4 px-0'}>
      <CardTitle text={props.title} className="text-16 px-4" />

      <div
        className="mb-4 text-14 overflow-y-auto"
        style={{ maxHeight: props.maxHeight }}
      >
        {relevantPresetsList.map(preset => {
          const isSelected = props.selectedValue === preset

          return (
            <div
              key={preset}
              onClick={() => wizardStore.setSelectedPreset(preset, props.id)}
            >
              <div
                className={cn(
                  'w-full flex items-center py-2 leading-5 cursor-pointer px-4',
                  isSelected
                    ? 'bg-blue-bright text-white'
                    : 'hover:bg-blue-light',
                )}
              >
                <Icon
                  name="File"
                  className={cn(isSelected ? 'text-white' : 'text-blue-bright')}
                />

                <div className="ml-1.5">{preset}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-end px-4">
        <Button
          text="Open"
          disabled={!wizardStore.selectedPreset}
          onClick={openNextPage}
        />
      </div>
    </Card>
  )
}

export const ExistingCandidatesCard = observer((props: ICardProps) => {
  const secodaryDatasets = wizardStore.secondaryDatasets
  const onSelect = (ds: string) => wizardStore.setSelectedDataset(ds, props.id)

  return (
    <Card className="mt-4 px-0">
      <div className="flex items-center justify-between px-4">
        <CardTitle text={'Existing candidate set'} className="text-16" />

        <Button
          variant="secondary"
          style={{ padding: 0 }}
          icon={
            <Icon
              name="Edit"
              className={cn(
                'cursor-pointer',
                props.editDisabled ? 'text-grey-blue' : 'text-blue-bright',
              )}
            />
          }
          disabled={props.editDisabled}
          onClick={() => wizardStore.editCard(props.id)}
        />
      </div>

      <div
        className="mb-4 text-14 overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 285px)' }}
      >
        {secodaryDatasets?.map(
          secondaryDsNameByKey(
            1,
            onSelect,
            wizardStore.selectedDataset,
            props.contentDisabled,
          ),
        )}
      </div>

      <div className="flex justify-end px-4">
        <Button
          text="Continue"
          onClick={() => wizardStore.finishEditCard(props.id)}
          disabled={props.continueDisabled}
        />
      </div>
    </Card>
  )
})

export const DescriptionCard = (props: ICardProps) => {
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
      <div className="flex items-center justify-between">
        <CardTitle
          text={wizardStore.selectedDataset}
          className="text-16 px-4"
        />

        <Button
          variant="secondary"
          style={{ padding: 0 }}
          icon={
            <Icon
              name="Edit"
              className={cn(
                'cursor-pointer',
                props.editDisabled ? 'text-grey-blue' : 'text-blue-bright',
              )}
            />
          }
          disabled={props.editDisabled}
          onClick={() => wizardStore.editCard(props.id)}
        />
      </div>

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
        {exploreCandidateOptionsList.map(option => (
          <div className="flex mb-2" key={option}>
            <Radio
              className="flex items-center"
              checked={option === props.selectedValue}
              onChange={() =>
                wizardStore.setDescriptionOption(option, props.id)
              }
              disabled={props.contentDisabled}
            >
              <div className="ml-1.5">{option}</div>
            </Radio>
          </div>
        ))}

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
