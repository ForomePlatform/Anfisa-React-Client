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
