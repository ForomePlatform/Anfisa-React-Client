import { ExploreCandidateTypes } from '@core/enum/explore-candidate-types-enum'
import { ExploreTypes } from '@core/enum/explore-types-enum'
import { t } from '@i18n'
import {
  DescriptionCard,
  ExistingCandidatesCard,
  PresetsCard,
  StartCard,
} from '../../cards'
import { ICardProps, IWizardScenario } from '.././wizard.interface'
import { WizardCardIds } from './wizard-scenarios.constants'

export const wsCandidateSet: IWizardScenario[] = [
  {
    component: (props: ICardProps) => <StartCard {...props} />,
    id: WizardCardIds.Start,
    hidden: false,
    continueDisabled: true,
    editDisabled: false,
    contentDisabled: true,
    selectedValue: ExploreTypes.Candidate,
    title: t('home.startFlow.startWith'),
    position: 'left',
    nextCard: WizardCardIds.ExistingCandidate,
  },
  {
    component: (props: ICardProps) => <DescriptionCard {...props} />,
    id: WizardCardIds.Description,
    hidden: false,
    continueDisabled: false,
    editDisabled: true,
    contentDisabled: false,
    selectedValue: ExploreCandidateTypes.ViewAllVariants,
    title: '',
    position: 'right',
    nextCard: WizardCardIds.Presets,
  },
  {
    component: (props: ICardProps) => <ExistingCandidatesCard {...props} />,
    id: WizardCardIds.ExistingCandidate,
    hidden: false,
    continueDisabled: true,
    editDisabled: false,
    contentDisabled: true,
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
    maxHeight: 'calc(100vh - 585px)',
    position: 'right',
    nextCard: null,
  },
]
