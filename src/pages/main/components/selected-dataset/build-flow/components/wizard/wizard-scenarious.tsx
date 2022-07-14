import { ExploreCandidateTypes } from '@core/enum/explore-candidate-types-enum'
import { ExploreGenomeTypes } from '@core/enum/explore-genome-types-enum'
import { ExploreTypes } from '@core/enum/explore-types-enum'
import { t } from '@i18n'
import {
  DescriptionCard,
  ExistingCandidatesCard,
  PresetsCard,
  StartCard,
  WhatsNextCard,
} from '../cards'
import { ICardProps, IWizardScenario } from './wizard.store'

export const scenarioForWholeGenome: IWizardScenario[] = [
  {
    component: (props: ICardProps) => <StartCard {...props} />,
    id: 0,
    hidden: false,
    continueDisabled: true,
    editDisabled: false,
    contentDisabled: true,
    value: ExploreTypes.Genome,
    title: t('home.startFlow.startWith'),
  },
  {
    component: (props: ICardProps) => <WhatsNextCard {...props} />,
    id: 1,
    hidden: false,
    continueDisabled: false,
    editDisabled: true,
    contentDisabled: false,
    value: ExploreGenomeTypes.ACMG,
    title: t('home.buildFlow.whatsNext'),
  },
  {
    component: (props: ICardProps) => <PresetsCard {...props} />,
    id: 2,
    hidden: true,
    continueDisabled: false,
    editDisabled: true,
    contentDisabled: false,
    value: '',
    title: t('home.buildFlow.relevantPresets'),
    maxHeight: 'calc(100vh - 285px)',
  },
]

export const scenarioForCandidateSet: IWizardScenario[] = [
  {
    component: (props: ICardProps) => <StartCard {...props} />,
    id: 0,
    hidden: false,
    continueDisabled: true,
    editDisabled: false,
    contentDisabled: true,
    value: ExploreTypes.Candidate,
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
  },
  {
    component: (props: ICardProps) => <DescriptionCard {...props} />,
    id: 2,
    hidden: true,
    continueDisabled: false,
    editDisabled: true,
    contentDisabled: false,
    value: ExploreCandidateTypes.ViewAllVariants,
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
    maxHeight: 'calc(80vh - 527px)',
  },
]

export const scenarioForShortCandidateSet: IWizardScenario[] = [
  {
    component: (props: ICardProps) => <StartCard {...props} />,
    id: 0,
    hidden: false,
    continueDisabled: true,
    editDisabled: false,
    contentDisabled: true,
    value: ExploreTypes.Candidate,
    title: t('home.startFlow.startWith'),
  },
  {
    component: (props: ICardProps) => <DescriptionCard {...props} />,
    id: 1,
    hidden: false,
    continueDisabled: false,
    editDisabled: true,
    contentDisabled: false,
    value: ExploreCandidateTypes.ViewAllVariants,
    title: '',
  },

  {
    component: (props: ICardProps) => <PresetsCard {...props} />,
    id: 2,
    hidden: true,
    continueDisabled: false,
    editDisabled: true,
    contentDisabled: false,
    value: '',
    title: t('home.buildFlow.additionalPresetFilter'),
    maxHeight: 'calc(100vh - 285px)',
  },
]
