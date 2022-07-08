import { makeAutoObservable } from 'mobx'

import { ExploreCandidateTypes } from '@core/enum/explore-candidate-types-enum'
import { ExploreGenomeTypes } from '@core/enum/explore-genome-types-enum'
import { ExploreTypes } from '@core/enum/explore-types-enum'
import { datasetStore } from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import filterStore from '@store/filter'
import { GlbPagesNames } from '@glb/glb-names'
import { stepsForXlDatasets } from './selected-dataset.constants'
import { getNextPageData } from './selected-dataset.utils'

interface IWizardStepData {
  title: string
  type: string
  value: string
  description?: string
  hidden: boolean
  optionsList: string[]
  hasNoSecondaryDatasets?: boolean
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

  constructor() {
    makeAutoObservable(this)
  }

  public get currentStepData() {
    return this.wizardData[this.wizardData.length - 1].stepData
  }

  public createFirstWizardStep(stepData: IWizardStepData) {
    this.wizardData = [{ stepNo: 1, stepData: [stepData] }]
  }

  public addWizardStep(stepData: IWizardStepData) {
    this.wizardData = [
      ...this.wizardData,
      {
        stepNo: this.wizardData.length + 1,
        stepData: [
          ...this.wizardData[this.wizardData.length - 1].stepData,
          stepData,
        ],
      },
    ]
  }

  public editWizardData(index: number) {
    this.currentStepData.forEach((item, currIndex) => {
      if (currIndex > index) {
        item.hidden = true
      }
    })
  }

  public continueEditWizardData(index: number, selectedItem: string) {
    const hasNextStep = this.currentStepData[index + 1]
    this.currentStepData[index].value = selectedItem

    if (hasNextStep && hasNextStep.hidden) {
      this.currentStepData.forEach((item, currIndex) => {
        if (currIndex > index) {
          item.hidden = false
        }
      })

      this.currentStepData[index].value = selectedItem

      if (index === 0 && selectedItem !== this.exploreType) {
        this.setExploreType(selectedItem)
        this.wizardData.length = index + 1
        this.resetFirstWizardSteps()
      }
    } else {
      this.addWizardStep(stepsForXlDatasets[this.exploreType][index])
    }
  }

  public selectDataset(value: string, index: number) {
    this.setSecondaryDataset(value)
    this.addWizardStep(stepsForXlDatasets[this.exploreType][index])
  }

  public resetFirstWizardSteps() {
    this.selectedSecondaryDataset
      ? this.addWizardStep(stepsForXlDatasets[this.exploreType][1])
      : this.addWizardStep(stepsForXlDatasets[this.exploreType][0])
  }

  public clearWizardData() {
    this.wizardData = []
    this.selectedPreset = ''
    this.selectedSecondaryDataset = ''
  }

  public get secondaryDatasets(): string[] | undefined {
    return dirinfoStore.dirinfo.data?.dsDict[datasetStore.datasetName].secondary
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
}

export default new SelectedDatasetStore()
