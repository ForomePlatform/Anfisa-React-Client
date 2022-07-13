import { cloneDeep } from 'lodash'
import { makeAutoObservable, toJS } from 'mobx'

import { ActionsHistoryStore } from '@store/actions-history'
import { ISolutionWithKind } from './cards/presets-card/utils/add-solution-kind'
import { firstScenario } from './selected-dataset.scenario'

export interface ICardProps {
  selectedValue: string
  contentDisabled: boolean
  continueDisabled: boolean
  editDisabled: boolean
}

export interface IWizardScenario {
  component: (props: ICardProps) => JSX.Element
  hidden: boolean
  value: string
  contentDisabled: boolean
  continueDisabled: boolean
  editDisabled: boolean
}

class SelectedDatasetCardsStore {
  public wizardScenario: IWizardScenario[] = firstScenario

  public startWithOption = ''
  public whatsNextOption = ''
  public selectedPreset?: ISolutionWithKind

  public actionHistory = new ActionsHistoryStore<IWizardScenario[]>(
    wizardScenario => (this.wizardScenario = wizardScenario),
  )

  constructor() {
    makeAutoObservable(this)
  }

  public setStartWithOption(startWithOption: string, index: number) {
    this.startWithOption = startWithOption
    const clonedWizard = cloneDeep(this.wizardScenario)
    clonedWizard[index].value = startWithOption
    this.wizardScenario = clonedWizard
  }

  public setWhatsNextOption(whatsNextOption: string, index: number) {
    this.whatsNextOption = whatsNextOption
    const clonedWizard = cloneDeep(this.wizardScenario)
    clonedWizard[index].value = whatsNextOption
    this.wizardScenario = clonedWizard
  }

  public setSelectedPreset(selectedPreset: ISolutionWithKind, index: number) {
    const clonedWizard = cloneDeep(this.wizardScenario)
    clonedWizard[index].value = selectedPreset.name
    this.wizardScenario = clonedWizard

    this.selectedPreset = selectedPreset
  }

  public showNextCard(index: number) {
    if (this.wizardScenario[index + 1]) {
      this.wizardScenario[index + 1].hidden = false
    }
  }

  public hideNextCards(index: number) {
    this.wizardScenario.forEach(
      (scenario, currIndex) => (scenario.hidden = currIndex > index),
    )
  }

  public editCard(index: number) {
    console.log('editCard', index)

    const clonedWizard = cloneDeep(this.wizardScenario)
    clonedWizard[index].continueDisabled = false
    clonedWizard[index].contentDisabled = false
    clonedWizard[index].editDisabled = true
    this.wizardScenario = clonedWizard

    this.hideNextCards(index)

    console.log('after editCard', toJS(this.wizardScenario))
  }

  public finishEditCard(index: number) {
    console.log('finishEditCard', index)

    const clonedWizard = cloneDeep(this.wizardScenario)
    clonedWizard[index].continueDisabled = true
    clonedWizard[index].contentDisabled = true
    clonedWizard[index].editDisabled = false

    if (clonedWizard[index + 1]) {
      clonedWizard[index + 1].continueDisabled = false
      clonedWizard[index + 1].contentDisabled = false
      clonedWizard[index + 1].editDisabled = true
    }

    this.wizardScenario = clonedWizard

    this.showNextCard(index)

    console.log('after finishEditCard', toJS(this.wizardScenario))
  }

  public changeCardValue(index: number, value: string) {
    const clonedWizard = cloneDeep(this.wizardScenario)
    clonedWizard[index].value = value
    this.wizardScenario = clonedWizard
  }
}

export default new SelectedDatasetCardsStore()
