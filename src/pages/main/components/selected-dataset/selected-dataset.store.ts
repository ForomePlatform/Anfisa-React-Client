import { makeAutoObservable } from 'mobx'

import { ExploreCandidateType } from '@core/enum/explore-candidate-type-enum'
import { ExploreGenomeTypes } from '@core/enum/explore-genome-type-enum'
import { ExploreTypes } from '@core/enum/explore-types-enum'

class SelectedDatasetStore {
  public isStartFlowVisible = false
  public isEditionExploreType = false
  public isEditionExploreGenome = false
  public isEditionExploreCandidate = false

  public exploreType: ExploreTypes = ExploreTypes.Candidate
  public exploreGenomeType: ExploreGenomeTypes = ExploreGenomeTypes.ACMG
  public exploreCandidateType: ExploreCandidateType =
    ExploreCandidateType.ViewAllVariants

  public selectedPreset: string = ''
  public selectedSecondaryDataset: string = ''

  constructor() {
    makeAutoObservable(this)
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
    this.exploreCandidateType = value as ExploreCandidateType
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
    this.setExploreCandidateType(ExploreCandidateType.ViewAllVariants)
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
