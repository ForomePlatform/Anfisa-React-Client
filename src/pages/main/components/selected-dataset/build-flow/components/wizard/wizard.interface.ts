import { TExploreCandidateKeys } from '@core/enum/explore-candidate-types-enum'
import { TExploreGenomeKeys } from '@core/enum/explore-genome-types-enum'
import { GlbPagesNames } from '@glb/glb-names'

export interface ICardProps {
  id: number
  title: string
  selectedValue: string
  contentDisabled: boolean
  continueDisabled: boolean
  editDisabled: boolean
  maxHeight?: string
}

export interface IWizardScenario {
  component: (props: ICardProps) => JSX.Element
  id: number
  hidden: boolean
  value: string
  title: string
  contentDisabled: boolean
  continueDisabled: boolean
  editDisabled: boolean
  maxHeight?: string
}

export interface IWizardRoute {
  route: string
  method: GlbPagesNames
}

export type TRouteDictionary<
  T extends TExploreCandidateKeys | TExploreGenomeKeys,
> = Record<T, IWizardRoute>
