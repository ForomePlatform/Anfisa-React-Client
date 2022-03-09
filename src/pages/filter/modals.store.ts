import { makeAutoObservable } from 'mobx'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { showToast } from '@utils/notifications/showToast'

class DtreeModalStore {
  dtreeOperation = ''
  isModalConfirmationVisible = false

  constructor() {
    makeAutoObservable(this)
  }

  public deleteTree(): void {
    const instruction: string[] = [
      'DTREE',
      'DELETE',
      dtreeStore.currentDtreeName,
    ]

    const notification: string = `${t('dtree.dtree')} "${
      dtreeStore.currentDtreeName
    }" ${t('dtree.hasBeenDeleted')}`

    const body = new URLSearchParams({
      ds: datasetStore.datasetName,
      code: dtreeStore.dtreeCode,
      instr: JSON.stringify(instruction),
    })

    dtreeStore.fetchDtreeSetAsync(body)

    showToast(notification, 'success')

    filterStore.setActionName()

    dtreeStore.resetCurrentDtreeName()
  }

  public openModalConfirmation(dtreeOperation: string): void {
    this.isModalConfirmationVisible = true
    this.dtreeOperation = dtreeOperation
  }

  public closeModalConfirmation(): void {
    this.isModalConfirmationVisible = false
  }
}

export default new DtreeModalStore()
