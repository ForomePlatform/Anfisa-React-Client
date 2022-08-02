import { ExploreCandidateKeys } from '@core/enum/explore-candidate-types-enum'
import { TExploreGenomeKeys } from '@core/enum/explore-genome-types-enum'
import { ExploreKeys } from '@core/enum/explore-types-enum'
import { t } from '@i18n'
import {
  DescriptionCard,
  ExistingCandidatesCard,
  PresetsCard,
  StartCard,
} from '../../cards'
import { ICardProps, IWizardScenario } from '../wizard.interface'
import { WizardCardIds } from './wizard-scenarios.constants'

export const xlCandidateSet: IWizardScenario[] = [
  {
    component: (props: ICardProps) => <StartCard {...props} />,
    id: WizardCardIds.Start,
    hidden: false,
    continueDisabled: true,
    editDisabled: false,
    contentDisabled: true,
    selectedValue: ExploreKeys.Candidate,
    title: t('home.startFlow.startWith'),
    position: 'left',
    nextCard: WizardCardIds.ExistingCandidate,
  },
  {
    component: (props: ICardProps) => (
      <DescriptionCard {...(props as ICardProps<TExploreGenomeKeys>)} />
    ),
    id: WizardCardIds.Description,
    hidden: true,
    continueDisabled: false,
    editDisabled: true,
    contentDisabled: false,
    selectedValue: ExploreCandidateKeys.ViewAllVariants,
    title: '',
    position: 'right',
    nextCard: WizardCardIds.Presets,
  },
  {
    component: (props: ICardProps) => <ExistingCandidatesCard {...props} />,
    id: WizardCardIds.ExistingCandidate,
    hidden: false,
    continueDisabled: false,
    editDisabled: true,
    contentDisabled: false,
    selectedValue: '',
    title: t('home.buildFlow.candidateSet'),
    maxHeight: 'calc(100vh - 285px)',
    position: 'left',
    nextCard: WizardCardIds.Description,
  },

  {
    component: (props: ICardProps) => <PresetsCard {...props} />,
    id: WizardCardIds.Presets,
    hidden: true,
    continueDisabled: false,
    editDisabled: true,
    contentDisabled: false,
    selectedValue: '',
    title: t('home.buildFlow.additionalPresetFilter'),
    maxHeight: 'calc(100vh - 577px)',
    position: 'right',
    nextCard: null,
  },
]
