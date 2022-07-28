import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable, reaction } from 'mobx'

import { TExploreGenomeKeys } from '@core/enum/explore-genome-types-enum'
import { ExploreTypesDictionary } from '@core/enum/explore-types-enum'
import { ActionsHistoryStore } from '@store/actions-history'
import { createHistoryObserver } from '@store/common'
import { datasetStore } from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import { ISolutionWithKind } from '../cards/presets-card/utils/add-solution-kind'
import { wizardScenarios } from './scenarios/wizard-scenarious'
import { IWizardScenario } from './wizard.interface'

class WizardStore {
  public isWizardVisible: boolean = false
  public wizardScenario: IWizardScenario[] = []
  public startWithOption = ''
  public whatsNextOption?: TExploreGenomeKeys
  public descriptionOption = ''
  public selectedPreset?: ISolutionWithKind
  public selectedDataset = ''
  public needToChangeScenario: boolean = false
  public datasetKind = ''

  public actionHistory = new ActionsHistoryStore<IWizardScenario[]>(
    wizardScenario => (this.wizardScenario = wizardScenario),
  )

  readonly observeHistory = createHistoryObserver({
    ds: {
      get: () => datasetStore.datasetName ?? '',
      apply: ds => {
        datasetStore.setDatasetName(ds || '')
      },
    },
    kind: {
      get: () => this.datasetKind ?? '',
      apply: kind => {
        this.setDatasetKind(kind || '')
      },
    },
  })

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => this.datasetKind,
      datasetKind => {
        if (!datasetKind) {
          return
        }

        const hasSecondaryDs =
          !!dirinfoStore.dirInfoData?.dsDict[datasetStore.datasetName]
            ?.secondary?.length

        if (
          dirinfoStore.dirInfoData &&
          !dirinfoStore.xlDatasets.includes(datasetStore.datasetName)
        ) {
          this.openWizardForWsDatasets(hasSecondaryDs)
        } else if (datasetKind && datasetKind !== 'xl') {
          this.openWizardForWsDatasets(hasSecondaryDs)
        }
      },
    )
  }

  public toggleIsWizardVisible(value: boolean) {
    this.isWizardVisible = value
  }

  public get secondaryDatasets(): string[] | undefined {
    return dirinfoStore.dirinfo.data?.dsDict[datasetStore.datasetName]
      ?.secondary
  }

  public setScenario(scenario: IWizardScenario[]) {
    this.wizardScenario = scenario

    this.actionHistory.addHistory(scenario)
  }

  public defineAndSetNewScenario() {
    if (this.startWithOption === ExploreTypesDictionary.Genome) {
      this.setScenario(wizardScenarios.XlWholeGenome)
    }

    if (this.startWithOption === ExploreTypesDictionary.Candidate) {
      this.setScenario(wizardScenarios.XlCandidateSet)
    }

    this.needToChangeScenario = false
  }

  public setStartWithOption(startWithOption: string, index: number) {
    this.startWithOption = startWithOption
    this.changeCardValue(index, startWithOption)
    this.needToChangeScenario = true
  }

  public setWhatsNextOption(
    whatsNextOption: TExploreGenomeKeys,
    index: number,
  ) {
    this.whatsNextOption = whatsNextOption
    this.changeCardValue(index, whatsNextOption)
  }

  public setDescriptionOption(descriptionOption: string, index: number) {
    this.descriptionOption = descriptionOption
    this.changeCardValue(index, descriptionOption)
  }

  public setSelectedPreset(selectedPreset: ISolutionWithKind, index: number) {
    this.selectedPreset = selectedPreset
    this.changeCardValue(index, selectedPreset.name)
  }

  public setSelectedDataset(selectedDataset: string, index: number) {
    this.selectedDataset = selectedDataset
    const clonedWizard = cloneDeep(this.wizardScenario)
    clonedWizard[index].value = selectedDataset
    clonedWizard[index + 1].title = selectedDataset

    if (clonedWizard[index + 1]) {
      clonedWizard[index + 1].continueDisabled = false
      clonedWizard[index + 1].contentDisabled = false
      clonedWizard[index + 1].editDisabled = true
      clonedWizard[index + 1].hidden = false
    }

    this.actionHistory.addHistory(clonedWizard)

    this.wizardScenario = clonedWizard
  }

  public updateSelectedDataset(ds: string) {
    this.selectedDataset = ds
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
      ? wizardScenarios.WsCandidateSet
      : wizardScenarios.WsShortCandidateSet

    if (hasSecondaryDs) {
      scenario[2].title = datasetStore.datasetName
    }

    this.setScenario(scenario)
  }

  public resetWizard() {
    this.selectedDataset = ''
    this.wizardScenario = []
  }

  public setDatasetKind(newDatasetKind: string) {
    this.datasetKind = newDatasetKind
  }

  public resetDatasetKind() {
    this.datasetKind = ''
  }
}

export default new WizardStore()
