import { makeAutoObservable, reaction } from 'mobx'

import dataset from '@store/dataset/dataset'
import { TTagsDescriptor } from '@service-providers/ws-dataset-support'
import { TagSelectAsyncStore } from './tag-select.async.store'
import { ZoneVariantsAsyncStore } from './zone-variants.async.store'

class ZoneStore {
  zone: any[] = []

  selectedGenes: string[] = []
  selectedGenesList: string[] = []
  selectedSamples: string[] = []
  selectedTags: string[] = []

  localGenes: string[] = []
  localGenesList: string[] = []
  localSamples: string[] = []
  localTags: string[] = []

  isModeNOT = false
  modeNotSubmitted = false
  isModeWithNotes = false
  modeWithNotesSubmitted = false

  private readonly geneVariants = new ZoneVariantsAsyncStore('Symbol')
  private readonly genesListVariants = new ZoneVariantsAsyncStore('Panels')
  private readonly sampleVariants = new ZoneVariantsAsyncStore('Has_Variant')
  private readonly tagsSelect = new TagSelectAsyncStore()

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => dataset.datasetName,
      datasetName => {
        this.geneVariants.setQuery({ datasetName })
        this.genesListVariants.setQuery({ datasetName })
        this.sampleVariants.setQuery({ datasetName })
        this.tagsSelect.setQuery({ datasetName })
      },
    )
  }

  public get genes(): string[] {
    return this.geneVariants.variants
  }

  public get genesList(): string[] {
    return this.genesListVariants.variants
  }

  public get samples(): string[] {
    return this.sampleVariants.variants
  }

  public get tags(): string[] {
    return this.tagsSelect.tags
  }

  public get specialSamples(): [boolean, boolean, boolean] {
    let proband = false
    let mother = false
    let father = false

    for (const sample of this.selectedSamples) {
      if (!proband && sample.startsWith('proband ')) {
        proband = true
      } else if (!mother && sample.startsWith('mother ')) {
        mother = true
      } else if (!father && sample.startsWith('father ')) {
        father = true
      }
    }

    return [proband, mother, father]
  }

  public invalidateTags(): void {
    this.tagsSelect.invalidate()
  }

  setZoneIndex(zone: [string, string[]], index: number): void {
    this.zone[index] = zone
  }

  addZone(zone: [string, string[], false?]) {
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

  removeZone(zone: [string, string[]]) {
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

  addGene(gene: string) {
    this.localGenes = [...this.localGenes, gene]
  }

  removeGene = (geneName: string, type: string) => {
    this.localGenes = this.localGenes.filter(gene => geneName !== gene)

    if (type === 'fast') {
      this.createSelectedZoneFilter('isGenes')

      this.removeZone(['Symbol', this.selectedGenes])
    }
  }

  unselectAllGenes() {
    this.localGenes = []
  }

  addGenesList(gene: string) {
    this.localGenesList = [...this.localGenesList, gene]
  }

  removeGenesList = (geneName: string, type: string) => {
    this.localGenesList = this.localGenesList.filter(
      genesList => geneName !== genesList,
    )

    if (type === 'fast') {
      this.createSelectedZoneFilter('isGenesList')

      this.removeZone(['Panels', this.selectedGenesList])
    }
  }

  unselectAllGenesList() {
    this.localGenesList = []
  }

  addSample(sample: string) {
    this.localSamples = [...this.localSamples, sample]
  }

  removeSample = (sample: string, type: string) => {
    this.localSamples = this.localSamples.filter(
      sampleItem => sampleItem !== sample,
    )

    if (type === 'fast') {
      this.createSelectedZoneFilter('isSamples')

      this.removeZone(['Has_Variant', this.selectedSamples])
    }
  }

  unselectAllSamples = () => {
    this.localSamples = []
  }

  addLocalTag(tagName: string) {
    this.localTags = [...this.localTags, tagName]
  }

  removeLocalTag = (tagName: string, type: string) => {
    this.localTags = this.localTags.filter(tag => tag !== tagName)

    tagName === '_note' && this.setModeWithNotes(false)

    if (type === 'fast') {
      this.createSelectedZoneFilter('isTags')

      this.removeZone(['_tags', this.selectedTags])
    }
  }

  unselectAllTags() {
    this.localTags = []
  }

  createSelectedZoneFilter(type: string) {
    if (type === 'isGenes') this.selectedGenes = this.localGenes

    if (type === 'isGenesList') this.selectedGenesList = this.localGenesList

    if (type === 'isSamples') this.selectedSamples = this.localSamples

    if (type === 'isTags') this.selectedTags = this.localTags
  }

  syncSelectedAndLocalFilters(type: string) {
    if (type === 'isGenes') this.localGenes = this.selectedGenes

    if (type === 'isGenesList') this.localGenesList = this.selectedGenesList

    if (type === 'isSamples') this.localSamples = this.selectedSamples

    if (type === 'isTags') this.localTags = this.selectedTags
  }

  hasDifferenceWithZoneTags(
    tags: TTagsDescriptor,
    prevTags?: TTagsDescriptor,
  ): boolean {
    const extendedSelectedTags = this.isModeWithNotes
      ? [...this.selectedTags, '_note']
      : this.selectedTags

    if (!extendedSelectedTags.length) {
      return false
    }

    const check = (testTags: TTagsDescriptor): boolean =>
      this.isModeNOT
        ? Object.keys(testTags).some(tag => extendedSelectedTags.includes(tag))
        : Object.keys(testTags).every(
            tag => !extendedSelectedTags.includes(tag),
          )

    const hasDifferenceWithCurrent = check(tags)
    const hasDifferenceWithPrevious = prevTags ? check(prevTags) : false

    return hasDifferenceWithCurrent || hasDifferenceWithPrevious
  }

  resetAllSelectedItems() {
    this.selectedGenes = []
    this.selectedGenesList = []
    this.selectedSamples = []
    this.selectedTags = []
    this.localGenes = []
    this.localGenesList = []
    this.localSamples = []
    this.localTags = []
    this.setModeNOT(false)
    this.setModeWithNotes(false)
    this.modeNotSubmitted = false
    this.modeWithNotesSubmitted = false
  }

  setModeNOT(value: boolean) {
    this.isModeNOT = value
  }

  resetModeNOT() {
    this.isModeNOT = this.modeNotSubmitted
  }

  setModeWithNotes(value: boolean) {
    this.isModeWithNotes = value
  }

  resetModeWithNotes() {
    this.isModeWithNotes = this.modeWithNotesSubmitted
  }

  resetModes() {
    this.resetModeNOT()
    this.resetModeWithNotes()
  }

  submitTagsMode() {
    this.modeNotSubmitted = this.isModeNOT
    this.modeWithNotesSubmitted = this.isModeWithNotes
  }
}

export default new ZoneStore()
