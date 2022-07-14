import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable } from 'mobx'

import { ExploreTypes } from '@core/enum/explore-types-enum'
import { ActionsHistoryStore } from '@store/actions-history'
import { datasetStore } from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import { ISolutionWithKind } from '../cards/components/presets-card/utils/add-solution-kind'
import {
  scenarioForWsCandidateSet,
  scenarioForWsShortCandidateSet,
  scenarioForXlCandidateSet,
  scenarioForXlWholeGenome,
} from './wizard-scenarious'

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

class WizardStore {
  public isWizardVisible: boolean = false
  public wizardScenario: IWizardScenario[] = []
  public startWithOption = ''
  public whatsNextOption = ''
  public descriptionOption = ''
  public selectedPreset?: ISolutionWithKind
  public selectedDataset = ''
  public needToChangeScenario: boolean = false

  public actionHistory = new ActionsHistoryStore<IWizardScenario[]>(
    wizardScenario => (this.wizardScenario = wizardScenario),
  )

  constructor() {
    makeAutoObservable(this)
  }

  public toggleIsWizardVisible(value: boolean) {
    this.isWizardVisible = value
  }

  public get secondaryDatasets(): string[] | undefined {
    return dirinfoStore.dirinfo.data?.dsDict[datasetStore.datasetName]
      ?.secondary
  }

  public get datasetName(): string {
    return datasetStore.datasetName
  }

  public setScenario(scenario: IWizardScenario[]) {
    this.wizardScenario = scenario
    this.actionHistory.addHistory(scenario)
  }

  public defineAndSetNewScenario() {
    if (this.startWithOption === ExploreTypes.Genome) {
      this.setScenario(scenarioForXlWholeGenome)
    }

    if (this.startWithOption === ExploreTypes.Candidate) {
      this.setScenario(scenarioForXlCandidateSet)
    }

    this.needToChangeScenario = false
  }

  public setStartWithOption(startWithOption: string, index: number) {
    this.startWithOption = startWithOption
    const clonedWizard = cloneDeep(this.wizardScenario)
    clonedWizard[index].value = startWithOption
    this.wizardScenario = clonedWizard
    this.needToChangeScenario = true
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

  public setSelectedPreset(selectedPreset: ISolutionWithKind, index: number) {
    this.selectedPreset = selectedPreset
    const clonedWizard = cloneDeep(this.wizardScenario)
    clonedWizard[index].value = selectedPreset.name
    this.wizardScenario = clonedWizard
  }

  public setSelectedDataset(selectedDataset: string, index: number) {
    this.selectedDataset = selectedDataset
    const clonedWizard = cloneDeep(this.wizardScenario)
    clonedWizard[index].value = selectedDataset
    clonedWizard[index + 1].title = selectedDataset

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
    const clonedWizard = cloneDeep(this.wizardScenario)
    clonedWizard[index].continueDisabled = false
    clonedWizard[index].contentDisabled = false
    clonedWizard[index].editDisabled = true
    this.wizardScenario = clonedWizard
    this.actionHistory.addHistory(clonedWizard)

    this.hideNextCards(index)
  }

  public finishEditCard(index: number) {
    if (this.needToChangeScenario) {
      this.defineAndSetNewScenario()
      return
    }

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
  }

  public changeCardValue(index: number, value: string) {
    const clonedWizard = cloneDeep(this.wizardScenario)
    clonedWizard[index].value = value
    this.wizardScenario = clonedWizard
  }

  public openWizardForWsDatasets(hasSecondaryDs: boolean) {
    this.toggleIsWizardVisible(true)
    const scenario = hasSecondaryDs
      ? scenarioForWsCandidateSet
      : scenarioForWsShortCandidateSet

    if (hasSecondaryDs) {
      scenario[2].title = this.datasetName
    }

    this.setScenario(scenario)
  }

  public resetScenario() {
    this.selectedDataset = ''
    this.wizardScenario = []
  }
}

export default new WizardStore()
