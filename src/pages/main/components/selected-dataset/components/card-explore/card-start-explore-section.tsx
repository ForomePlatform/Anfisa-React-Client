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
import { Loader } from '@ui/loader'
import { CardTitleWithEdit } from '../../build-flow/components/cards/components/card-edit-title'
import { useRadioListData } from '../../build-flow/components/cards/components/card-radio.hooks'
import { CardRadioList } from '../../build-flow/components/cards/components/card-radio-list'
import { ICardProps } from '../../build-flow/components/wizard/wizard.interface'
import wizardStore from '../../build-flow/components/wizard/wizard.store'

export const CardStartExploreSection: FC<ICardProps<TExploreKeys>> = observer(
  ({
    id,
    continueDisabled,
    title,
    editDisabled,
    selectedValue,
  }): ReactElement => {
    const onChange = (exploreType: TExploreKeys) => {
      wizardStore.setStartWithOption(exploreType, id)
    }

    const onContinue = () => {
      if (datasetStore.isXL) {
        wizardStore.toggleIsWizardVisible(true)
        wizardStore.defineAndSetNewScenario()
      } else {
        wizardStore.finishEditCard(id)
      }
    }

    const isExploreGenomeDisabled = !datasetStore.isXL
    const isExploreCandidateDisabled = !wizardStore.secondaryDatasets?.length

    const isEditionProhibited =
      isExploreGenomeDisabled || isExploreCandidateDisabled

    const isEditShown = !isEditionProhibited && !editDisabled

    const radioListData = useRadioListData<TExploreKeys>(ExploreTypesDictionary)

    return datasetStore.isLoading ? (
      <Loader size="s" className="!w-[50%] mt-[40px]" />
    ) : (
      <div className="w-1/2 pr-12 flex flex-col">
        <>
          <div className="flex items-center justify-between">
            <CardTitleWithEdit
              title={title || t('home.startFlow.startWith')}
              isEditShown={isEditShown}
              onEdit={() => (id ? wizardStore.editCard(id) : noop)}
            />
          </div>

          <div className="mt-2 text-14 flex flex-col grow">
            <CardRadioList<TExploreKeys>
              data={radioListData}
              onChange={onChange}
              selectedOption={selectedValue!}
              disabledOptions={{
                [ExploreKeys.Genome]: {
                  isDisabled: isExploreGenomeDisabled,
                  placeholder: () => (
                    <span className="text-grey-dark">
                      {t('home.startFlow.genomeIsUnavailable')}
                    </span>
                  ),
                },
                [ExploreKeys.Candidate]: {
                  isDisabled: isExploreCandidateDisabled,
                  placeholder: () => (
                    <span className="text-grey-dark">
                      {t('home.startFlow.candidateIsUnavailable')}
                    </span>
                  ),
                },
              }}
            />

            <div className="flex justify-end mt-auto">
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
