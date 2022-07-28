import { ExploreCandidateKeys } from '@core/enum/explore-candidate-types-enum'
import { ExploreTypesDictionary } from '@core/enum/explore-types-enum'
import { t } from '@i18n'
import {
  DescriptionCard,
  ExistingCandidatesCard,
  PresetsCard,
  StartCard,
} from '../../cards'
import { ICardProps, IWizardScenario } from '../wizard.interface'

export const xlCandidateSet: IWizardScenario[] = [
  {
    component: (props: ICardProps) => <StartCard {...props} />,
    id: 0,
    hidden: false,
    continueDisabled: true,
    editDisabled: false,
    contentDisabled: true,
    value: ExploreTypesDictionary.Candidate,
    title: t('home.startFlow.startWith'),
  },
  {
    component: (props: ICardProps) => <ExistingCandidatesCard {...props} />,
    id: 1,
    hidden: false,
    continueDisabled: false,
    editDisabled: true,
    contentDisabled: false,
    value: '',
    title: t('home.buildFlow.candidateSet'),
    maxHeight: 'calc(100vh - 285px)',
  },
  {
    component: (props: ICardProps) => <DescriptionCard {...props} />,
    id: 2,
    hidden: true,
    continueDisabled: false,
    editDisabled: true,
    contentDisabled: false,
    value: ExploreCandidateKeys.ViewAllVariants,
    title: '',
  },

  {
    component: (props: ICardProps) => <PresetsCard {...props} />,
    id: 3,
    hidden: true,
    continueDisabled: false,
    editDisabled: true,
    contentDisabled: false,
    value: '',
    title: t('home.buildFlow.additionalPresetFilter'),
    maxHeight: 'calc(100vh - 577px)',
  },
]
