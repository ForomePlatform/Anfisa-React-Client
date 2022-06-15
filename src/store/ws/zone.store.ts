import { makeAutoObservable, runInAction } from 'mobx'

import { IZoneDescriptor } from '@service-providers/ws-dataset-support/ws-dataset-support.interface'
import wsDatasetProvider from '@service-providers/ws-dataset-support/ws-dataset-support.provider'
import datasetStore from '../dataset/dataset'

class ZoneStore {
  genes: string[] = []
  genesList: string[] = []
  tags: string[] = []
  samples: string[] = []
  zone: any[] = []

  selectedGenes: string[] = []
  selectedGenesList: string[] = []
  selectedSamples: string[] = []
  selectedTags: string[] = []

  localGenes: string[] = []
  localGenesList: string[] = []
  localSamples: string[] = []
  localTags: string[] = []

  isFather: boolean | undefined = false
  isMother: boolean | undefined = false
  isProband: boolean | undefined = false

  isModeNOT = false
  modeNotSubmitted = false
  isModeWithNotes = false
  modeWithNotesSubmitted = false

  constructor() {
    makeAutoObservable(this)
  }

  public setZoneIndex(zone: [string, string[]], index: number): void {
    this.zone[index] = zone
  }

  public addZone(zone: [string, string[], false?]) {
    if (zone[1].length === 0) {
      this.zone = this.zone.filter(item => item[0] !== zone[0])

      return
    }

    if (this.zone.length === 0) {
      this.zone = [...this.zone, zone]

      return
    }

    const indexOfExistingZone = this.zone.findIndex(elem => elem[0] === zone[0])

    indexOfExistingZone !== -1
      ? (this.zone[indexOfExistingZone] = zone)
      : (this.zone = [...this.zone, zone])
  }

  public removeZone(zone: [string, string[]]) {
    this.zone.map((item, index) => {
      if (item[0] === zone[0]) {
        this.setZoneIndex(zone, index)
      }
    })

    this.zone = this.zone.filter(item => item[1].length > 0)
  }

  clearZone() {
    this.zone = []
  }

  public async fetchZoneListAsync(zone: string) {
    const zoneList = (await wsDatasetProvider.getZoneList({
      ds: datasetStore.datasetName,
      zone,
    })) as IZoneDescriptor

    runInAction(() => {
      zone === 'Symbol'
        ? (this.genes = zoneList.variants)
        : (this.genesList = zoneList.variants)
    })
  }

  public async fetchZoneSamplesAsync() {
    const zoneList = (await wsDatasetProvider.getZoneList({
      ds: datasetStore.datasetName,
      zone: 'Has_Variant',
    })) as IZoneDescriptor

    runInAction(() => {
      this.samples = zoneList.variants
    })
  }

  public async fetchZoneTagsAsync() {
    const tagSelect = await wsDatasetProvider.getTagSelect({
      ds: datasetStore.datasetName,
    })

    runInAction(() => {
      this.tags = [...tagSelect['tag-list']].filter(item => item !== '_note')
    })
  }

  public addGene = (gene: string) => {
    this.localGenes = [...this.localGenes, gene]
  }

  public removeGene = (geneName: string, type: string) => {
    this.localGenes = this.localGenes.filter(gene => geneName !== gene)

    if (type === 'fast') {
      this.createSelectedZoneFilter('isGenes')

      this.removeZone(['Symbol', this.selectedGenes])
    }
  }

  public unselectAllGenes = () => {
    this.localGenes = []
  }

  public addGenesList = (gene: string) => {
    this.localGenesList = [...this.localGenesList, gene]
  }

  public removeGenesList = (geneName: string, type: string) => {
    this.localGenesList = this.localGenesList.filter(
      genesList => geneName !== genesList,
    )

    if (type === 'fast') {
      this.createSelectedZoneFilter('isGenesList')

      this.removeZone(['Panels', this.selectedGenesList])
    }
  }

  public unselectAllGenesList = () => {
    this.localGenesList = []
  }

  public addSample = (sample: string) => {
    this.localSamples = [...this.localSamples, sample]
  }

  public removeSample = (sample: string, type: string) => {
    this.localSamples = this.localSamples.filter(
      sampleItem => sampleItem !== sample,
    )

    if (type === 'fast') {
      this.createSelectedZoneFilter('isSamples')

      this.removeZone(['Has_Variant', this.selectedSamples])
    }

    this.paintSelectedSamples()
  }

  public paintSelectedSamples() {
    const sampleTypes = new Set(
      this.selectedSamples.map(sample => sample.slice(0, 7).trim()),
    )

    this.isProband = sampleTypes.has('proband')

    this.isMother = sampleTypes.has('mother')

    this.isFather = sampleTypes.has('father')
  }

  public unselectAllSamples = (type?: string) => {
    this.localSamples = []

    if (type === 'clearAll') {
      this.isFather = false
      this.isMother = false
      this.isProband = false
    }
  }

  public addLocalTag = (tagName: string) => {
    this.localTags = [...this.localTags, tagName]
  }

  public removeLocalTag = (tagName: string, type: string) => {
    this.localTags = this.localTags.filter(tag => tag !== tagName)

    tagName === '_note' && this.setModeWithNotes(false)

    if (type === 'fast') {
      this.createSelectedZoneFilter('isTags')

      this.removeZone(['_tags', this.selectedTags])
    }
  }

  public unselectAllTags = () => {
    this.localTags = []
    this.resetModeNOT()
    this.resetModeWithNotes()
  }

  public createSelectedZoneFilter(type: string) {
    if (type === 'isGenes') this.selectedGenes = this.localGenes

    if (type === 'isGenesList') this.selectedGenesList = this.localGenesList

    if (type === 'isSamples') this.selectedSamples = this.localSamples

    if (type === 'isTags') this.selectedTags = this.localTags
  }

  public syncSelectedAndLocalFilters(type: string) {
    if (type === 'isGenes') this.localGenes = this.selectedGenes

    if (type === 'isGenesList') this.localGenesList = this.selectedGenesList

    if (type === 'isSamples') this.localSamples = this.selectedSamples

    if (type === 'isTags') this.localTags = this.selectedTags
  }

  public resetAllSelectedItems() {
    this.genes = []
    this.genesList = []
    this.samples = []
    this.tags = []
    this.selectedGenes = []
    this.selectedGenesList = []
    this.selectedSamples = []
    this.selectedTags = []
    this.localGenes = []
    this.localGenesList = []
    this.localSamples = []
    this.localTags = []
    this.isFather = false
    this.isMother = false
    this.isProband = false
    this.setModeNOT(false)
    this.setModeWithNotes(false)
    this.modeNotSubmitted = false
    this.modeWithNotesSubmitted = false
  }

  public setModeNOT(value: boolean) {
    this.isModeNOT = value
  }

  public resetModeNOT() {
    this.isModeNOT = this.modeNotSubmitted
  }

  public setModeWithNotes(value: boolean) {
    this.isModeWithNotes = value
  }

  public resetModeWithNotes() {
    this.isModeWithNotes = this.modeWithNotesSubmitted
  }

  public submitTagsMode() {
    this.modeNotSubmitted = this.isModeNOT
    this.modeWithNotesSubmitted = this.isModeWithNotes
  }
}

export default new ZoneStore()
