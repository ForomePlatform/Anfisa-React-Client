import { makeAutoObservable } from 'mobx'

import { getApiUrl } from '@core/get-api-url'
import datasetStore from './dataset'

class ZoneStore {
  selectedGenes: string[] = []
  selectedGenesList: string[] = []
  selectedSamples: string[] = []
  selectedTags: string[] = []

  isFather = false
  isMother = false
  isProband = false

  constructor() {
    makeAutoObservable(this)
  }

  addGene(gene: string) {
    this.selectedGenes = [...this.selectedGenes, gene]
  }

  removeGene(geneName: string) {
    this.selectedGenes = this.selectedGenes.filter(gene => geneName !== gene)
  }

  unselectAllGenes = () => {
    this.selectedGenes = []
  }

  addGenesList(gene: string) {
    this.selectedGenesList = [...this.selectedGenesList, gene]
  }

  removeGenesList(geneName: string) {
    this.selectedGenesList = this.selectedGenesList.filter(
      genesList => geneName !== genesList,
    )
  }

  unselectAllGenesList = () => {
    this.selectedGenesList = []
  }

  addSample(sample: string) {
    this.selectedSamples = [...this.selectedSamples, sample]
    this.checkSampleType(sample)
  }

  removeSample(sample: string) {
    this.selectedSamples = this.selectedSamples.filter(
      sampleItem => sampleItem !== sample,
    )
    this.checkSampleType(sample)
  }

  checkSampleType(sample: string) {
    const type = sample.slice(0, 7).trim()

    if (type === 'father') this.isFather = !this.isFather

    if (type === 'mother') this.isMother = !this.isMother

    if (type === 'proband') this.isProband = !this.isProband
  }

  unselectAllSamples = () => {
    this.selectedSamples = []
    this.isFather = false
    this.isMother = false
    this.isProband = false
  }

  addTag(tagName: string) {
    this.selectedTags = [...this.selectedTags, tagName]
  }

  removeTag(tagName: string) {
    this.selectedTags = this.selectedTags.filter(tag => tag !== tagName)
  }

  unselectAllTags = () => {
    this.selectedTags = []
  }

  fetchTagSelectAsync = async () => {
    if (this.selectedTags.length === 0) {
      datasetStore.indexTabReport = 0
      await datasetStore.fetchTabReportAsync()

      return
    }

    const response = await fetch(
      getApiUrl(
        `tag_select?ds=${datasetStore.datasetName}&tag=${this.selectedTags[0]}`,
      ),
    )

    const result = await response.json()

    datasetStore.indexFilteredNo = 0
    datasetStore.filteredNo = result['tag-rec-list']

    await datasetStore.fetchFilteredTabReportAsync()
  }
}

export default new ZoneStore()
