import { WizardCardIds } from './scenarios/wizard-scenarios.constants'

export type TCardPosition = 'left' | 'right' | 'stretch'
export interface ICardProps {
  id: WizardCardIds
  title: string
  selectedValue: string
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
