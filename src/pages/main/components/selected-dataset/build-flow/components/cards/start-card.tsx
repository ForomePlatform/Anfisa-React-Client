import {
  ExploreKeys,
  ExploreTypesDictionary,
  TExploreKeys,
} from '@core/enum/explore-types-enum'
import { datasetStore } from '@store/dataset'
import { Button } from '@ui/button'
import { Card } from '@ui/card'
import { ICardProps } from '../wizard/wizard.interface'
import wizardStore from '../wizard/wizard.store'
import { CardTitleWithEdit } from './components/card-edit-title'
import { useRadioListData } from './components/card-radio.hooks'
import { CardRadioList } from './components/card-radio-list'

export const StartCard = ({
  title,
  id,
  selectedValue,
  contentDisabled,
  continueDisabled,
  editDisabled,
  position,
}: ICardProps) => {
  const isExploreGenomeDisabled = !datasetStore.isXL
  const isExploreCandidateDisabled =
    !wizardStore.secondaryDatasets && datasetStore.isXL

  const isEditionProhibited =
    isExploreGenomeDisabled || isExploreCandidateDisabled

  const isEditShown = !isEditionProhibited && !editDisabled

  const radioListData = useRadioListData<TExploreKeys>(ExploreTypesDictionary)

  return (
    <Card
      isNeedToAnimate={wizardStore.isNeedToAnimateCard(id)}
      position={position}
    >
      <CardTitleWithEdit
        title={title}
        isEditShown={isEditShown}
        onEdit={() => wizardStore.editCard(id)}
      />
      <div className="mt-4 text-14">
        <CardRadioList<TExploreKeys>
          data={radioListData}
          onChange={value => wizardStore.setStartWithOption(value, id)}
          selectedOption={selectedValue!}
          disabledOptions={{
            [ExploreKeys.Genome]: isExploreGenomeDisabled || contentDisabled,
            [ExploreKeys.Candidate]:
              isExploreCandidateDisabled || contentDisabled,
          }}
        />

        {!isEditShown && (
          <div className="flex justify-end">
            <Button
              text="Continue"
              onClick={() => wizardStore.finishEditCard(id)}
              disabled={continueDisabled}
            />
          </div>
        )}
      </div>
    </Card>
  )
}
