import { makeAutoObservable } from 'mobx'

import { CardTypes } from '@core/enum/card-types-enum'
import { ExploreCandidateTypes } from '@core/enum/explore-candidate-types-enum'
import { ExploreGenomeTypes } from '@core/enum/explore-genome-types-enum'
import { ExploreTypes } from '@core/enum/explore-types-enum'
import { ActionsHistoryStore } from '@store/actions-history'
import { datasetStore } from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import filterStore from '@store/filter'
import { GlbPagesNames } from '@glb/glb-names'
import { exploreSteps, startFlowOptionsList } from './selected-dataset.data'
import { getNextPageData } from './selected-dataset.utils'

interface IWizardStepData {
  title: string
  type: CardTypes
  value: string
  description?: string
  isSpecial?: boolean
  hidden: boolean
  optionsList: string[]
}

interface IWizardData {
  stepNo: number
  stepData: IWizardStepData[]
}

type TExploreSubTypes = ExploreGenomeTypes | ExploreCandidateTypes

class SelectedDatasetStore {
  public isBuildFlowVisible = false
  public exploreType: ExploreTypes = ExploreTypes.Genome
  public selectedPreset: string = ''
  public selectedSecondaryDataset: string = ''

  public wizardData: IWizardData[] = []
  public actionHistory = new ActionsHistoryStore<IWizardData[]>(
    wizardData => (this.wizardData = wizardData),
  )

  constructor() {
    makeAutoObservable(this)
  }

  public get currentStepData() {
    return this.wizardData[this.wizardData.length - 1].stepData
  }

  public createFirstWizardStep(selectedValue: string) {
    const stepData = {
      title: 'Start with',
      value: selectedValue,
      type: CardTypes.RadioList,
      optionsList: startFlowOptionsList,
      hidden: false,
    }
    this.setExploreType(selectedValue)
    this.wizardData = [{ stepNo: 1, stepData: [stepData] }]
    this.actionHistory.addHistory([{ stepNo: 1, stepData: [stepData] }])
  }

  public addWizardStep(stepData: IWizardStepData) {
    const nextStep = {
      stepNo: this.wizardData.length + 1,
      stepData: [
        ...this.wizardData[this.wizardData.length - 1].stepData,
        stepData,
      ],
    }
    this.wizardData = [...this.wizardData, nextStep]

    this.actionHistory.addHistory([nextStep])
  }

  public hideNextSteps(index: number) {
    this.currentStepData.forEach(
      (item, currIndex) => (item.hidden = currIndex > index),
    )
  }

  public showNextSteps() {
    this.currentStepData.forEach(item => (item.hidden = false))
  }

  public resetWizard(selectedItem: string, index: number) {
    this.selectedSecondaryDataset = ''
    this.setExploreType(selectedItem)
    this.wizardData.length = index + 1
    this.wizardData[0].stepData.length = index + 1
    this.resetFirstWizardSteps(selectedItem)
  }

  public resetFirstWizardSteps(selectedItem: string) {
    const newExploreType = selectedItem as ExploreTypes
    this.selectedSecondaryDataset
      ? this.addWizardStep(exploreSteps[newExploreType][1])
      : this.addWizardStep(exploreSteps[newExploreType][0])
  }

  public continueEditWizardData(index: number, selectedItem: string) {
    const hasNextStep = this.currentStepData[index + 1]
    const shouldResetWizard = index === 0 && selectedItem !== this.exploreType
    const isSpecialDataset =
      !datasetStore.isXL &&
      selectedItem === ExploreCandidateTypes.ApplyFilter &&
      !this.secondaryDatasets

    if (hasNextStep && hasNextStep.hidden) {
      this.showNextSteps()

      if (shouldResetWizard) {
        this.resetWizard(selectedItem, index)
        return
      }
    } else {
      isSpecialDataset
        ? this.addWizardStep(exploreSteps[this.exploreType][2])
        : this.addWizardStep(exploreSteps[this.exploreType][index])
    }

    this.currentStepData[index].value = selectedItem
  }

  public selectDataset(value: string, index: number) {
    if (!this.selectedSecondaryDataset) {
      this.addWizardStep(exploreSteps[this.exploreType][index])
      this.setSecondaryDataset(value)
      return
    }

    this.setSecondaryDataset(value)
  }

  public clearWizardData() {
    this.wizardData = []
    this.selectedPreset = ''
    this.selectedSecondaryDataset = ''
  }

  public get secondaryDatasets(): string[] | undefined {
    return dirinfoStore.dirinfo.data?.dsDict[datasetStore.datasetName]
      ?.secondary
  }

  public get datasetName(): string {
    return datasetStore.datasetName
  }

  public toggleIsBuildFlowVisible(value: boolean) {
    this.isBuildFlowVisible = value
  }

  public setExploreType(value: string) {
    this.exploreType = value as ExploreTypes
  }

  public setPreset(value: string) {
    this.selectedPreset = value
  }

  public setSecondaryDataset(value: string) {
    this.selectedSecondaryDataset = value
  }

  public openNextPage(history: any, exploreSubType?: string) {
    const subType = exploreSubType
      ? exploreSubType
      : this.currentStepData[this.currentStepData.length - 2].value

    const nextPageData = getNextPageData(
      subType as TExploreSubTypes,
      this.selectedSecondaryDataset,
    )

    if (this.selectedSecondaryDataset) {
      datasetStore.setDatasetName(this.selectedSecondaryDataset)
    }

    history.push(nextPageData.route)

    filterStore.setMethod(nextPageData.method as GlbPagesNames)
  }

  public openWizardFowWsDataset(hasSecondaryDs: boolean) {
    this.createFirstWizardStep(ExploreTypes.Candidate)

    hasSecondaryDs
      ? this.addWizardStep(exploreSteps[ExploreTypes.Candidate][0])
      : this.addWizardStep(exploreSteps[ExploreTypes.Candidate][1])

    this.toggleIsBuildFlowVisible(true)
  }
}

export default new SelectedDatasetStore()
