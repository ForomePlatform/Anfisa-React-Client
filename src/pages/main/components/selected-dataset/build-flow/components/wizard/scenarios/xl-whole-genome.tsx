import {
  ExploreGenomeKeys,
  TExploreGenomeKeys,
} from '@core/enum/explore-genome-types-enum'
import { ExploreTypesDictionary } from '@core/enum/explore-types-enum'
import { t } from '@i18n'
import { PresetsCard, StartCard, WhatsNextCard } from '../../cards'
import { ICardProps, IWizardScenario } from '../wizard.interface'

export const xlWholeGenome: IWizardScenario[] = [
  {
    component: (props: ICardProps) => <StartCard {...props} />,
    id: 0,
    hidden: false,
    continueDisabled: true,
    editDisabled: false,
    contentDisabled: true,
    value: ExploreTypesDictionary.Genome,
    title: t('home.startFlow.startWith'),
  },
  {
    component: (props: ICardProps) => (
      <WhatsNextCard {...(props as ICardProps<TExploreGenomeKeys>)} />
    ),
    id: 1,
    hidden: false,
    continueDisabled: false,
    editDisabled: true,
    contentDisabled: false,
    value: ExploreGenomeKeys.ACMGSecondary,
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
