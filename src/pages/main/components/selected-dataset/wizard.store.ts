import { cloneDeep } from 'lodash'
import { makeAutoObservable, toJS } from 'mobx'

import { ActionsHistoryStore } from '@store/actions-history'
import { datasetStore } from '@store/dataset'
import dirinfoStore from '@store/dirinfo'

export interface ICardProps {
  title: string
  selectedValue: string
  contentDisabled: boolean
  continueDisabled: boolean
  editDisabled: boolean
  maxHeight?: string
}

export interface IWizardScenario {
  component: (props: ICardProps) => JSX.Element
  hidden: boolean
  value: string
  title: string
  contentDisabled: boolean
  continueDisabled: boolean
  editDisabled: boolean
  maxHeight?: string
}

class WizardStore {
  public wizardScenario: IWizardScenario[] = []
  public startWithOption = ''
  public whatsNextOption = ''
  public descriptionOption = ''
  public selectedPreset = ''
  public selectedDataset = ''

  public actionHistory = new ActionsHistoryStore<IWizardScenario[]>(
    wizardScenario => (this.wizardScenario = wizardScenario),
  )

  constructor() {
    makeAutoObservable(this)
  }

  public get secondaryDatasets(): string[] | undefined {
    return dirinfoStore.dirinfo.data?.dsDict[datasetStore.datasetName]
      ?.secondary
  }

  public setScenario(scenario: IWizardScenario[]) {
    this.wizardScenario = scenario
    this.actionHistory.addHistory(scenario)
  }

  public resetScenario() {
    this.wizardScenario = []
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

  public setDescriptionOption(descriptionOption: string, index: number) {
    this.descriptionOption = descriptionOption
    const clonedWizard = cloneDeep(this.wizardScenario)
    clonedWizard[index].value = descriptionOption
    this.wizardScenario = clonedWizard
  }

  public setSelectedPreset(selectedPreset: string, index: number) {
    this.selectedPreset = selectedPreset
    const clonedWizard = cloneDeep(this.wizardScenario)
    clonedWizard[index].value = selectedPreset
    this.wizardScenario = clonedWizard
  }

  public setSelectedDataset(selectedDataset: string, index: number) {
    this.selectedDataset = selectedDataset
    const clonedWizard = cloneDeep(this.wizardScenario)
    clonedWizard[index].value = selectedDataset

    console.log(index)

    this.wizardScenario = clonedWizard
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
    this.actionHistory.addHistory(clonedWizard)

    this.hideNextCards(index)

    console.log('after editCard', toJS(this.wizardScenario))
  }

  public get datasetName(): string {
    return datasetStore.datasetName
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
    this.actionHistory.addHistory(clonedWizard)

    this.showNextCard(index)

    console.log('after finishEditCard', toJS(this.wizardScenario))
  }

  public changeCardValue(index: number, value: string) {
    const clonedWizard = cloneDeep(this.wizardScenario)
    clonedWizard[index].value = value
    this.wizardScenario = clonedWizard
  }
}

export default new WizardStore()
