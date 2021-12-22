import { get } from 'lodash'
import { makeAutoObservable, runInAction } from 'mobx'

import { ReccntCommon, ReccntDisplayItem } from '@declarations'
import { getApiUrl } from '@core/get-api-url'
import datasetStore from './dataset'
import { INITIAL_VARIANT } from './store.const'

export class VariantStore {
  drawerVisible = false
  variant: ReccntCommon[] = []
  recordsDisplayConfig: any = {}

  index = INITIAL_VARIANT
  dsName = ''
  generalTags: string[] = []
  optionalTags: string[] = []
  checkedTags: string[] = []
  tagsWithNotes: any = {}
  currentTag = ''
  noteText = ''

  isModalNotesVisible = false

  defaultVariantLayout: any[] = [
    { y: 0, x: 0, w: 6, h: 1, i: 'view_gen' },
    { y: 1, x: 0, w: 6, h: 1, i: 'view_transcripts' },
    { y: 2, x: 0, w: 6, h: 1, i: 'view_qsamples' },
    { y: 3, x: 0, w: 6, h: 1, i: 'view_gnomAD' },
    { y: 4, x: 0, w: 6, h: 1, i: 'view_db' },
    { y: 5, x: 0, w: 6, h: 1, i: 'view_pred' },
    { y: 6, x: 0, w: 6, h: 1, i: 'view_pharmagkb' },
    { y: 7, x: 0, w: 6, h: 1, i: 'view_genetics' },
    { y: 8, x: 0, w: 6, h: 1, i: '_main' },
    { y: 9, x: 0, w: 6, h: 1, i: 'transcripts' },
    { y: 10, x: 0, w: 6, h: 1, i: 'colocated_v' },
    { y: 11, x: 0, w: 6, h: 1, i: 'input' },
  ]

  constructor() {
    makeAutoObservable(this)
  }

  setNoteText(value: string) {
    this.noteText = value
  }

  prevVariant() {
    datasetStore.filteredNo.length === 0
      ? (this.index += 1)
      : (this.index =
          datasetStore.filteredNo[
            datasetStore.filteredNo.indexOf(this.index) - 1
          ])
    this.fetchVarinatInfoAsync()
  }

  nextVariant() {
    datasetStore.filteredNo.length === 0
      ? (this.index += 1)
      : (this.index =
          datasetStore.filteredNo[
            datasetStore.filteredNo.indexOf(this.index) + 1
          ])

    this.fetchVarinatInfoAsync()
  }

  setDrawerVisible(visible: boolean) {
    this.drawerVisible = visible
  }

  initRecordsDisplayConfig() {
    const conf: { [key: string]: ReccntDisplayItem } = {}
    const isFirstInit = Object.keys(this.recordsDisplayConfig).length === 0

    if (!isFirstInit) return

    this.variant.map(record => {
      conf[record.name] = { isOpen: false, h: 1 }
    })

    this.recordsDisplayConfig = conf
  }

  handleAllRecordsOpen(status: boolean) {
    for (const key in this.recordsDisplayConfig) {
      if (
        Object.prototype.hasOwnProperty.call(this.recordsDisplayConfig, key)
      ) {
        this.recordsDisplayConfig[key].isOpen = status
      }
    }
  }

  updateRecordsDisplayConfig(name: string, height: number) {
    this.recordsDisplayConfig[name].h = height
  }

  checkRecodsDisplaying() {
    Object.values(this.recordsDisplayConfig).map((record: any) => {
      record.h > 1 ? (record.isOpen = true) : (record.isOpen = false)
    })
  }

  setIndex(index: number) {
    runInAction(() => {
      this.index = index
      this.fetchVarinatInfoAsync()
    })
  }

  setDsName(dsName: string) {
    const oldDsName = this.dsName

    this.dsName = dsName

    if (oldDsName !== dsName) {
      this.fetchVarinatInfoAsync()
    }
  }

  updateGeneralTags(tagName: string) {
    this.generalTags = [...this.generalTags, tagName]
  }

  async fetchVarinatInfoAsync() {
    if (datasetStore.isXL) return

    const details = datasetStore.wsRecords.find(
      record => record.no === this.index,
    )

    const [variantResponse, tagsResponse] = await Promise.all([
      fetch(
        getApiUrl(
          `reccnt?ds=${this.dsName}&rec=${this.index}&details=${
            details ? details.dt : ''
          }`,
        ),
        {
          method: 'POST',
        },
      ),
      fetch(getApiUrl(`ws_tags?ds=${this.dsName}&rec=${this.index}`)),
    ])

    const [variant, tagsData] = await Promise.all([
      variantResponse.json(),
      tagsResponse.json(),
    ])

    const checkedTags = Object.keys(tagsData['rec-tags']).filter(
      tag => tag !== '_note',
    )

    const optionalTags = get(tagsData, 'op-tags').filter(
      (tag: string) => tag !== '_note',
    )

    runInAction(() => {
      this.variant = variant
      this.generalTags = get(tagsData, 'check-tags')
      this.optionalTags = optionalTags
      this.checkedTags = checkedTags
      this.tagsWithNotes = get(tagsData, 'rec-tags')
      this.noteText = tagsData['rec-tags']['_note']
      this.initRecordsDisplayConfig()
    })
  }

  async fetchSelectedTagsAsync(params: string) {
    if (datasetStore.isXL) return

    const body = new URLSearchParams({
      ds: this.dsName,
      rec: this.index.toString(),
      tags: `{${params}}`,
    })

    const response = await fetch(getApiUrl(`ws_tags`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    const tagsData = await response.json()

    const checkedTags = Object.keys(tagsData['rec-tags']).filter(
      tag => tag !== '_note',
    )

    runInAction(() => {
      this.checkedTags = checkedTags

      this.initRecordsDisplayConfig()
    })
  }

  async fetchVarinatInfoForModalAsync(
    datasetName: string,
    orderNumber: number,
  ) {
    const variantResponse = await fetch(
      getApiUrl(`reccnt?ds=${datasetName}&rec=${orderNumber}`),
      {
        method: 'POST',
      },
    )

    const variant = await variantResponse.json()

    runInAction(() => {
      this.variant = variant
      this.initRecordsDisplayConfig()
    })
  }

  updateTagsWithNotes(tagWithNote: any[], operation = 'add') {
    if (operation === 'add') {
      let keyProp = ''

      for (const key in this.tagsWithNotes) {
        if (key === tagWithNote[0]) {
          keyProp = key
        }
      }

      keyProp
        ? (this.tagsWithNotes[keyProp] = tagWithNote[1])
        : (this.tagsWithNotes[tagWithNote[0]] = tagWithNote[1])
    } else {
      delete this.tagsWithNotes[tagWithNote[0]]
    }
  }

  showModalNotes() {
    this.isModalNotesVisible = true
  }

  hideModalNotes() {
    this.isModalNotesVisible = false
  }

  setCurrentTag(tag: string) {
    this.currentTag = tag
  }

  resetStore(): void {
    runInAction(() => {
      this.index = INITIAL_VARIANT
    })
  }
}

export default new VariantStore()
