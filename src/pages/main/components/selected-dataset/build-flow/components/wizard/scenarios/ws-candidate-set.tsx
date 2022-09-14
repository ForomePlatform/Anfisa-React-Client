import { ExploreCandidateKeys } from '@core/enum/explore-candidate-types-enum'
import { TExploreGenomeKeys } from '@core/enum/explore-genome-types-enum'
import { t } from '@i18n'
import { PresetsInfoCard } from '@pages/main/components/selected-dataset/build-flow/components/cards/presets-info-card/presets-info-card'
import { CardExploreType } from '@pages/main/components/selected-dataset/components/card-explore/card-explore-type'
import {
  DescriptionCard,
  ExistingCandidatesCard,
  PresetsCard,
} from '../../cards'
import { ICardProps, IWizardScenario } from '.././wizard.interface'
import { WizardCardIds } from './wizard-scenarios.constants'

export const wsCandidateSet: IWizardScenario[] = [
  {
    component: (props: ICardProps) => <CardExploreType {...props} />,
    id: WizardCardIds.StartFull,
    hidden: false,
    continueDisabled: true,
    editDisabled: false,
    contentDisabled: false,
    selectedValue: '',
    title: t('home.startFlow.startWith'),
    position: 'stretch',
    nextCard: WizardCardIds.ExistingCandidate,
  },
  {
    component: (props: ICardProps) => <PresetsInfoCard {...props} />,
    id: WizardCardIds.Info,
    hidden: false,
    contentDisabled: false,
    editDisabled: false,
    continueDisabled: false,
    selectedValue: '',
    maxHeight: 'calc(100vh - 416px)',
    title: '',
    position: 'left',
    nextCard: null,
  },
  {
    component: (props: ICardProps) => (
      <DescriptionCard {...(props as ICardProps<TExploreGenomeKeys>)} />
    ),
    id: WizardCardIds.Description,
    hidden: false,
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
    hidden: true,
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
