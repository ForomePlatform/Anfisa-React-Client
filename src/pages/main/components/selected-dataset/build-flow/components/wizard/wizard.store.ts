import cloneDeep from 'lodash/cloneDeep'
import { makeAutoObservable, reaction } from 'mobx'

import { TExploreGenomeKeys } from '@core/enum/explore-genome-types-enum'
import { ExploreKeys, TExploreKeys } from '@core/enum/explore-types-enum'
import { ActionsHistoryStore } from '@store/actions-history'
import { createHistoryObserver } from '@store/common'
import { datasetStore } from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import { ISolutionWithKind } from '../cards/presets-card/utils/add-solution-kind'
import { WizardCardIds } from './scenarios/wizard-scenarios.constants'
import { wizardScenarios } from './scenarios/wizard-scenarious'
import { IWizardScenario } from './wizard.interface'
import { getActiveCardIds } from './wizard.utils'

class WizardStore {
  public isWizardVisible: boolean = false
  private prevWizardScenario: IWizardScenario[] = []
  public wizardScenario: IWizardScenario[] = []
  public startWithOption: TExploreKeys = ExploreKeys.Genome
  public whatsNextOption?: TExploreGenomeKeys
  public descriptionOption = ''
  public descriptionTitle = ''
  public selectedPreset?: ISolutionWithKind
  public selectedDataset = ''
  public needToChangeScenario: boolean = false
  public datasetKind = ''

  public actionHistory = new ActionsHistoryStore<IWizardScenario[]>(
    wizardScenario => (this.wizardScenario = wizardScenario),
  )

  private get scenarioActiveCards() {
    return getActiveCardIds(this.wizardScenario)
  }

  private get prevScenarioActiveCards() {
    return getActiveCardIds(this.prevWizardScenario)
  }

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

    reaction(
      () => datasetStore.dsInfo.isLoading,
      isLoading => {
        !isLoading && this.defineAndSetNewScenario()
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
    this.prevWizardScenario = cloneDeep(this.wizardScenario)

    this.wizardScenario = scenario

    this.actionHistory.addHistory(scenario)
  }

  public defineAndSetNewScenario() {
    this.prevWizardScenario = []

    if (datasetStore.isXL && this.startWithOption === ExploreKeys.Genome) {
      this.setScenario(wizardScenarios.XlWholeGenome)
    } else if (
      datasetStore.isXL &&
      this.startWithOption === ExploreKeys.Candidate
    ) {
      this.setScenario(wizardScenarios.XlCandidateSet)
    } else if (!this.secondaryDatasets?.length) {
      this.setScenario(wizardScenarios.WsShortCandidateSet)
    } else {
      this.setScenario(wizardScenarios.WsCandidateSet)
    }

    this.needToChangeScenario = false
  }

  private enableContinue(id: WizardCardIds) {
    const clonedWizard = cloneDeep(this.wizardScenario)
    const card = this.findCardById(id, clonedWizard)

    if (card) {
      card.continueDisabled = false
      this.setScenario(clonedWizard)
    }
  }

  public setStartWithOption(startWithOption: TExploreKeys, id: WizardCardIds) {
    this.startWithOption = startWithOption
    this.changeCardValue(id, startWithOption)
    this.enableContinue(id)

    if (datasetStore.isXL) {
      this.needToChangeScenario = true
    }
  }

  public setWhatsNextOption(
    whatsNextOption: TExploreGenomeKeys,
    id: WizardCardIds,
  ) {
    this.whatsNextOption = whatsNextOption
    this.changeCardValue(id, whatsNextOption)
  }

  public setDescriptionOption(descriptionOption: string, id: WizardCardIds) {
    this.descriptionOption = descriptionOption
    this.changeCardValue(id, descriptionOption)
  }

  public setSelectedPreset(
    selectedPreset: ISolutionWithKind,
    id: WizardCardIds,
  ) {
    this.selectedPreset = selectedPreset
    this.changeCardValue(id, selectedPreset.name)
  }

  public setSelectedDataset(selectedDataset: string, id: WizardCardIds) {
    this.selectedDataset = selectedDataset
    const clonedWizard = cloneDeep(this.wizardScenario)
    const card = this.findCardById(id, clonedWizard)
    if (card) {
      card.selectedValue = selectedDataset
      if (card.nextCard) {
        const nextCard = this.findCardById(card.nextCard, clonedWizard)

        if (nextCard) {
          nextCard.title = selectedDataset

          if (nextCard) {
            nextCard.continueDisabled = false
            nextCard.contentDisabled = false
            nextCard.editDisabled = true
            nextCard.hidden = false
          }

          this.setScenario(clonedWizard)
        }
      }
    }
  }

  public updateSelectedDataset(ds: string) {
    this.selectedDataset = ds
  }

  public showNextCard(id: WizardCardIds, scenario: IWizardScenario[]) {
    const card = this.findCardById(id, scenario)
    if (card?.nextCard) {
      const nextCard = this.findCardById(card.nextCard, scenario)

      if (nextCard) {
        nextCard.hidden = false
      }
    }
  }

  private hideNextCards(id: WizardCardIds, scenario: IWizardScenario[]) {
    const card = this.findCardById(id, scenario)

    if (card?.nextCard) {
      const nextCard = this.findCardById(card.nextCard, scenario)
      if (nextCard) {
        nextCard.hidden = true
        this.hideNextCards(nextCard.id, scenario)
      }
    }
  }

  public editCard(id: WizardCardIds) {
    const clonedWizard = cloneDeep(this.wizardScenario)
    const card = this.findCardById(id, clonedWizard)
    if (card) {
      card.continueDisabled = false
      card.contentDisabled = false
      card.editDisabled = true

      this.hideNextCards(id, clonedWizard)
      this.wizardScenario = clonedWizard
      this.prevWizardScenario = clonedWizard
      this.actionHistory.addHistory(clonedWizard)
    }
  }

  public finishEditCard(id: WizardCardIds) {
    if (this.needToChangeScenario) {
      this.defineAndSetNewScenario()
      return
    }

    const clonedWizard = cloneDeep(this.wizardScenario)
    const card = this.findCardById(id, clonedWizard)
    if (card) {
      card.continueDisabled = true
      card.contentDisabled = true
      card.editDisabled = false

      const nextCard = this.findCardById(card.nextCard, clonedWizard)
      if (nextCard) {
        nextCard.continueDisabled = false
        nextCard.contentDisabled = false
        nextCard.editDisabled = true
      }
      this.showNextCard(card.id, clonedWizard)

      this.wizardScenario = clonedWizard
      this.actionHistory.addHistory(clonedWizard)
    }
  }

  public changeCardValue(id: WizardCardIds, value: string) {
    const clonedWizard = cloneDeep(this.wizardScenario)
    const card = this.findCardById(id, clonedWizard)

    if (card) {
      card.selectedValue = value
      this.setScenario(clonedWizard)
    }
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

  public isNeedToAnimateCard(id: WizardCardIds) {
    const scenariosDiff = this.scenarioActiveCards.reduce((acc, addedId) => {
      if (!this.prevScenarioActiveCards.includes(addedId)) {
        acc.push(addedId)
      }
      return acc
    }, [] as WizardCardIds[])

    return scenariosDiff.includes(id)
  }

  private findCardById(id: WizardCardIds | null, scenario: IWizardScenario[]) {
    if (id) {
      return scenario.find(card => card.id === id)
    }
    return undefined
  }
}

export default new WizardStore()
