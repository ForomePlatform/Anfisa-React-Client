import {
  ExploreGenomeKeys,
  TExploreGenomeKeys,
} from '@core/enum/explore-genome-types-enum'
import { ExploreKeys } from '@core/enum/explore-types-enum'
import { t } from '@i18n'
import { PresetsCard, StartCard, WhatsNextCard } from '../../cards'
import { ICardProps, IWizardScenario } from '../wizard.interface'
import { WizardCardIds } from './wizard-scenarios.constants'

export const xlWholeGenome: IWizardScenario[] = [
  {
    component: (props: ICardProps) => <StartCard {...props} />,
    id: WizardCardIds.Start,
    hidden: false,
    continueDisabled: true,
    editDisabled: false,
    contentDisabled: true,
    selectedValue: ExploreKeys.Genome,
    title: t('home.startFlow.startWith'),
    position: 'left',
    nextCard: WizardCardIds.WhatsNext,
  },
  {
    component: (props: ICardProps) => <PresetsCard {...props} />,
    id: WizardCardIds.Presets,
    hidden: true,
    continueDisabled: false,
    editDisabled: true,
    contentDisabled: false,
    selectedValue: '',
    title: t('home.buildFlow.relevantPresets'),
    maxHeight: 'calc(100vh - 285px)',
    position: 'right',
    nextCard: null,
  },
  {
    component: (props: ICardProps) => (
      <WhatsNextCard {...(props as ICardProps<TExploreGenomeKeys>)} />
    ),
    id: WizardCardIds.WhatsNext,
    hidden: false,
    continueDisabled: false,
    editDisabled: true,
    contentDisabled: false,
    selectedValue: ExploreGenomeKeys.ACMGSecondary,
    title: t('home.buildFlow.whatsNext'),
    position: 'left',
    nextCard: WizardCardIds.Presets,
  },
]
