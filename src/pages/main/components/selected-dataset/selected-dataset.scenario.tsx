import cn from 'classnames'

import { ExploreGenomeTypes } from '@core/enum/explore-genome-types-enum'
import { ExploreTypes } from '@core/enum/explore-types-enum'
import { Button } from '@ui/button'
import { Card, CardTitle } from '@ui/card'
import { Icon } from '@ui/icon'
import { Radio } from '@ui/radio'
import {
  relevantPresetsList,
  startFlowOptionsList,
  whatsNextOptionsList,
} from './selected-dataset.data'
import cardsStore, {
  ICardProps,
  IWizardScenario,
} from './selected-dataset-cards.store'

const StartCard = (props: ICardProps) => (
  <Card className={'mt-4'}>
    <>
      <div className="flex items-center justify-between">
        <CardTitle text={'Start with'} className="text-16" />

        <Button
          variant="secondary"
          style={{ padding: 0 }}
          icon={
            <Icon
              name="Edit"
              className={cn('cursor-pointer', 'text-blue-bright')}
            />
          }
          disabled={props.editDisabled}
          onClick={() => cardsStore.editCard(0)}
        ></Button>
      </div>

      <div className="mt-2 text-14">
        {startFlowOptionsList.map(option => (
          <div className="flex mb-2" key={option}>
            <Radio
              className="flex items-center"
              checked={option === props.selectedValue}
              onChange={() => cardsStore.setStartWithOption(option, 0)}
              disabled={props.contentDisabled}
            >
              <div className="ml-1.5">{option}</div>
            </Radio>
          </div>
        ))}

        <div className="flex justify-end">
          <Button
            text="Continue"
            onClick={() => cardsStore.finishEditCard(0)}
            disabled={props.continueDisabled}
          />
        </div>
      </div>
    </>
  </Card>
)

const WhatsNextCard = (props: ICardProps) => {
  return (
    <Card className={'mt-4'}>
      <>
        <div className="flex items-center justify-between">
          <CardTitle text={'Start with'} className="text-16" />

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
            onClick={() => cardsStore.editCard(1)}
          ></Button>
        </div>

        <div className="mt-2 text-14">
          {whatsNextOptionsList.map(option => (
            <div className="flex mb-2" key={option}>
              <Radio
                className="flex items-center"
                checked={option === props.selectedValue}
                onChange={() => cardsStore.setWhatsNextOption(option, 1)}
                disabled={props.contentDisabled}
              >
                <div className="ml-1.5">{option}</div>
              </Radio>
            </div>
          ))}

          <div className="flex justify-end">
            <Button
              text="Continue"
              onClick={() => cardsStore.finishEditCard(1)}
              disabled={props.continueDisabled}
            />
          </div>
        </div>
      </>
    </Card>
  )
}

const RelevantPresetsCard = (props: ICardProps) => (
  <Card className={'mt-4'}>
    <CardTitle text={'Relevant presets'} className="text-16 px-4" />

    <div
      className="mb-4 text-14 overflow-y-auto"
      style={{ maxHeight: 'calc(100vh - 285px)' }}
    >
      {relevantPresetsList.map(preset => {
        const isSelected = props.selectedValue === preset

        return (
          <div
            key={preset}
            onClick={() => cardsStore.setSelectedPreset(preset, 2)}
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
      <Button text="Open" disabled={!cardsStore.selectedPreset} />
    </div>
  </Card>
)

export const firstScenario: IWizardScenario[] = [
  {
    component: (props: ICardProps) => <StartCard {...props} />,
    hidden: false,
    continueDisabled: true,
    editDisabled: false,
    contentDisabled: true,
    value: ExploreTypes.Genome,
  },
  {
    component: (props: ICardProps) => <WhatsNextCard {...props} />,
    hidden: false,
    continueDisabled: false,
    editDisabled: true,
    contentDisabled: false,
    value: ExploreGenomeTypes.ACMG,
  },
  {
    component: (props: ICardProps) => <RelevantPresetsCard {...props} />,
    hidden: true,
    continueDisabled: false,
    editDisabled: true,
    contentDisabled: false,
    value: '',
  },
]
