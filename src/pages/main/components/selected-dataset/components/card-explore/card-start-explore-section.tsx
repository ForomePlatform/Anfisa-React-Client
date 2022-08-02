import { FC, ReactElement } from 'react'
import noop from 'lodash/noop'
import { observer } from 'mobx-react-lite'

import {
  ExploreKeys,
  ExploreTypesDictionary,
  TExploreKeys,
} from '@core/enum/explore-types-enum'
import { t } from '@i18n'
import { datasetStore } from '@store/dataset'
import { Button } from '@ui/button'
import { CardTitleWithEdit } from '../../build-flow/components/cards/components/card-edit-title'
import { useRadioListData } from '../../build-flow/components/cards/components/card-radio.hooks'
import { CardRadioList } from '../../build-flow/components/cards/components/card-radio-list'
import { wizardScenarios } from '../../build-flow/components/wizard/scenarios/wizard-scenarious'
import { ICardProps } from '../../build-flow/components/wizard/wizard.interface'
import wizardStore from '../../build-flow/components/wizard/wizard.store'

interface ICardStartExploreSectionProps extends ICardProps<TExploreKeys> {
  isGenomeDisabled: boolean
  isCandidateDisabled: boolean
}

export const CardStartExploreSection: FC<ICardStartExploreSectionProps> =
  observer(
    ({
      isCandidateDisabled,
      isGenomeDisabled,
      id,
      continueDisabled,
      title,
      editDisabled,
      selectedValue,
    }): ReactElement => {
      // const [selectedValue, setSelectedValue] = useState<TExploreKeys>(
      //   ExploreKeys.Genome,
      // )
      const onChange = (exploreType: TExploreKeys) => {
        wizardStore.setStartWithOption(exploreType, id)
      }

      const onContinue = () => {
        wizardStore.finishEditCard(id)
        wizardStore.toggleIsWizardVisible(true)
        const scenario =
          selectedValue === ExploreKeys.Genome
            ? wizardScenarios.XlWholeGenome
            : wizardScenarios.XlCandidateSet

        wizardStore.setScenario(scenario)
      }

      const isExploreGenomeDisabled = !datasetStore.isXL
      const isExploreCandidateDisabled =
        !wizardStore.secondaryDatasets && datasetStore.isXL

      const isEditionProhibited =
        isExploreGenomeDisabled || isExploreCandidateDisabled

      const isEditShown = !isEditionProhibited && !editDisabled

      const radioListData = useRadioListData<TExploreKeys>(
        ExploreTypesDictionary,
      )

      return (
        <div className="w-1/2 pr-12">
          <>
            <div className="flex items-center justify-between">
              <CardTitleWithEdit
                title={title || t('home.startFlow.startWith')}
                isEditShown={isEditShown}
                onEdit={() => (id ? wizardStore.editCard(id) : noop)}
              />
            </div>

            <div className="mt-2 text-14">
              <CardRadioList<TExploreKeys>
                data={radioListData}
                onChange={onChange}
                selectedOption={selectedValue!}
                disabledOptions={{
                  [ExploreKeys.Genome]: isGenomeDisabled,
                  [ExploreKeys.Candidate]: isCandidateDisabled,
                }}
              />

              <div className="flex justify-end">
                <Button
                  text="Continue"
                  onClick={onContinue}
                  disabled={continueDisabled}
                />
              </div>
            </div>
          </>
        </div>
      )
    },
  )
