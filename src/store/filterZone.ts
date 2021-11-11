import { difference } from 'lodash'
import { makeAutoObservable, runInAction } from 'mobx'

import { getApiUrl } from '@core/get-api-url'
import datasetStore from './dataset'

const ADD = true

class ZoneStore {
  selectedGenes: string[] = []
  selectedGenesList: string[] = []
  selectedSamples: string[] = []
  selectedTags: string[] = []

  isFather: boolean | undefined = false
  isMother: boolean | undefined = false
  isProband: boolean | undefined = false

  isModeNOT = false
  isModeWithNotes = false

  constructor() {
    makeAutoObservable(this)
  }

  addGene(gene: string) {
    runInAction(() => {
      this.selectedGenes = [...this.selectedGenes, gene]
    })
  }

  removeGene(geneName: string) {
    runInAction(() => {
      this.selectedGenes = this.selectedGenes.filter(gene => geneName !== gene)
    })

    datasetStore.removeZone(['Symbol', this.selectedGenes])
  }

  unselectAllGenes() {
    runInAction(() => {
      this.selectedGenes = []
    })
    datasetStore.addZone(['Symbol', this.selectedGenes])
  }

  addGenesList(gene: string) {
    runInAction(() => {
      this.selectedGenesList = [...this.selectedGenesList, gene]
    })
  }

  removeGenesList(geneName: string) {
    runInAction(() => {
      this.selectedGenesList = this.selectedGenesList.filter(
        genesList => geneName !== genesList,
      )
    })

    datasetStore.removeZone(['Panels', this.selectedGenesList])
  }

  unselectAllGenesList() {
    runInAction(() => {
      this.selectedGenesList = []
    })
    datasetStore.addZone(['Panels', this.selectedGenesList])
  }

  addSample(sample: string) {
    runInAction(() => {
      this.selectedSamples = [...this.selectedSamples, sample]
    })
  }

  removeSample(sample: string) {
    runInAction(() => {
      this.selectedSamples = this.selectedSamples.filter(
        sampleItem => sampleItem !== sample,
      )
    })

    datasetStore.removeZone(['Has_Variant', this.selectedSamples])
  }

  paintSelectedSamples() {
    this.selectedSamples.map(sample => this.checkSampleType(sample, ADD))
  }

  checkSampleType(sample: string, isAdding = false) {
    const type = sample.slice(0, 7).trim()

    if (type === 'father') {
      this.isFather = isAdding
    } else if (type === 'mother') {
      this.isMother = isAdding
    } else if (type === 'proband') {
      this.isProband = isAdding
    }
  }

  unselectAllSamples = () => {
    runInAction(() => {
      this.selectedSamples = []
      this.isFather = false
      this.isMother = false
      this.isProband = false
    })
    datasetStore.addZone(['Has_Variant', this.selectedSamples])
  }

  addTag(tagName: string) {
    runInAction(() => {
      this.selectedTags = [...this.selectedTags, tagName]
    })
  }

  removeTag(tagName: string) {
    runInAction(() => {
      this.selectedTags = this.selectedTags.filter(tag => tag !== tagName)
    })

    tagName === '_note' && this.resetModeWithNotes()

    datasetStore.removeZone(['_tags', this.selectedTags])
  }

  unselectAllTags() {
    runInAction(() => {
      this.selectedTags = []
    })
    this.resetModeNOT()
    this.resetModeWithNotes()
  }

  resetAllSelectedItems() {
    this.selectedGenes = []
    this.selectedGenesList = []
    this.selectedSamples = []
    this.selectedTags = []
    this.isFather = false
    this.isMother = false
    this.isProband = false
  }

  async fetchTagSelectAsync() {
    if (this.selectedTags.length === 0 && !this.isModeWithNotes) {
      datasetStore.setIndexTabReport(0)
      await datasetStore.fetchTabReportAsync()

      return
    }

    this.isModeWithNotes && this.selectedTags.push('_note')

    if (!this.isModeWithNotes && this.selectedTags.includes('_note')) {
      runInAction(() => {
        this.selectedTags = this.selectedTags.filter(item => item !== '_note')
      })
    }

    const filteredData = await Promise.all(
      (this.isModeNOT
        ? difference(datasetStore.tags, this.selectedTags)
        : this.selectedTags
      ).map(async tag => {
        const response = await fetch(
          getApiUrl(`tag_select?ds=${datasetStore.datasetName}&tag=${tag}`),
        )

        const result = await response.json()
        const currentNo = result['tag-rec-list']

        return currentNo
      }),
    )

    const uniqueNo = Array.from(new Set(filteredData.flat()))

    datasetStore.setIndexFilteredNo(0)
    datasetStore.setFilteredNo(uniqueNo)

    await datasetStore.fetchFilteredTabReportAsync()
  }

  setModeNOT() {
    runInAction(() => {
      this.isModeNOT = true
    })
  }

  resetModeNOT() {
    runInAction(() => {
      this.isModeNOT = false
    })
  }

  setModeWithNotes() {
    runInAction(() => {
      this.isModeWithNotes = true
    })
  }

  resetModeWithNotes() {
    runInAction(() => {
      this.isModeWithNotes = false
    })
  }
}

export default new ZoneStore()
