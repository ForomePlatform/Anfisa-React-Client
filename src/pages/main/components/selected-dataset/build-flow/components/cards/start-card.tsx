import { datasetStore } from '@store/dataset'
import { Button } from '@ui/button'
import { Card } from '@ui/card'
import { Radio } from '@ui/radio'
import { startFlowOptionsList } from '../wizard/wizard.data'
import { ICardProps } from '../wizard/wizard.interface'
import wizardStore from '../wizard/wizard.store'
import { CardTitleWithEdit } from './components/card-edit-title'

export const StartCard = (props: ICardProps) => {
  const {
    title,
    id,
    selectedValue,
    contentDisabled,
    continueDisabled,
    editDisabled,
  } = props

  const isExploreGenomeDisabled = !datasetStore.isXL
  const isExploreCandidateDisabled =
    !wizardStore.secondaryDatasets && datasetStore.isXL

  const isEditionProhibited =
    isExploreGenomeDisabled || isExploreCandidateDisabled

  const isEditDisabled = isEditionProhibited ?? editDisabled

  return (
    <Card
      className="mt-4"
      isNeedToAnimate={wizardStore.isNeedToAnimateCard(id)}
    >
      <CardTitleWithEdit
        title={title}
        isEditDisabled={isEditDisabled}
        onEdit={() => wizardStore.editCard(id)}
      />

      <div className="mt-4 text-14">
        {startFlowOptionsList.map(option => (
          <div className="flex mb-2" key={option}>
            <Radio
              className="flex items-center"
              checked={option === selectedValue}
              onChange={() => wizardStore.setStartWithOption(option, id)}
              disabled={contentDisabled}
            >
              <div className="ml-1.5">{option}</div>
            </Radio>
          </div>
        ))}

        <div className="flex justify-end">
          <Button
            text="Continue"
            onClick={() => wizardStore.finishEditCard(id)}
            disabled={continueDisabled}
          />
        </div>
      </div>
    </Card>
  )
}
