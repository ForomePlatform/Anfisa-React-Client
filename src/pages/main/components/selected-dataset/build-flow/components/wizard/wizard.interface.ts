import { TExploreCandidateKeys } from '@core/enum/explore-candidate-types-enum'
import { TExploreGenomeKeys } from '@core/enum/explore-genome-types-enum'
import { GlbPagesNames } from '@glb/glb-names'
import { WizardCardIds } from './scenarios/wizard-scenarios.constants'

export type TCardPosition = 'left' | 'right' | 'stretch'

export interface ICardProps<SelectedValue = string> {
  id: WizardCardIds
  title: string
  selectedValue: SelectedValue
  contentDisabled: boolean
  continueDisabled: boolean
  editDisabled: boolean
  maxHeight?: string
  position?: TCardPosition
}

export interface IWizardScenario extends ICardProps {
  component: (props: ICardProps) => JSX.Element
  hidden: boolean
  nextCard: WizardCardIds | null
}

export interface IWizardRoute {
  route: string
  method: GlbPagesNames
}

export type TRouteDictionary<
  T extends TExploreCandidateKeys | TExploreGenomeKeys,
> = Record<T, IWizardRoute>
