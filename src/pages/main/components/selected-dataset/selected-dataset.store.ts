import { makeAutoObservable } from 'mobx'

import { ExploreCandidateTypes } from '@core/enum/explore-candidate-types-enum'
import { ExploreGenomeTypes } from '@core/enum/explore-genome-types-enum'
import { ExploreTypes } from '@core/enum/explore-types-enum'
import { datasetStore } from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
class SelectedDatasetStore {
  public isStartFlowVisible = false
  public isEditionExploreType = false
  public isEditionExploreGenome = false
  public isEditionExploreCandidate = false

  public exploreType: ExploreTypes = ExploreTypes.Genome
  public exploreGenomeType: ExploreGenomeTypes = ExploreGenomeTypes.ACMG
  public exploreCandidateType: ExploreCandidateTypes =
    ExploreCandidateTypes.ViewAllVariants

  public selectedPreset: string = ''
  public selectedSecondaryDataset: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  public get secondaryDatasets(): string[] | undefined {
    return dirinfoStore.dirinfo.data?.dsDict[datasetStore.datasetName].secondary
  }

  public toggleIsStartFlowVisible(value: boolean) {
    this.isStartFlowVisible = value
  }

  public setExploreType(value: string) {
    this.exploreType = value as ExploreTypes
  }

  public setExploreGenomeType(value: string) {
    this.exploreGenomeType = value as ExploreGenomeTypes
  }

  public setExploreCandidateType(value: string) {
    this.exploreCandidateType = value as ExploreCandidateTypes
  }

  public setPreset(value: string) {
    this.selectedPreset = value
  }

  public setSecondaryDataset(value: string) {
    this.selectedSecondaryDataset = value
  }

  public toggleIsEditionExploreType(value: boolean) {
    this.isEditionExploreType = value
    this.setPreset('')
    this.setSecondaryDataset('')
    this.toggleIsEditionExploreGenome(false)
    this.setExploreCandidateType(ExploreCandidateTypes.ViewAllVariants)
    this.setExploreGenomeType(ExploreGenomeTypes.ACMG)
    this.toggleIsEditionExploreCandidate(false)
  }

  public toggleIsEditionExploreGenome(value: boolean) {
    this.isEditionExploreGenome = value
    this.setPreset('')
  }

  public toggleIsEditionExploreCandidate(value: boolean) {
    this.isEditionExploreCandidate = value
  }
}

export default new SelectedDatasetStore()
