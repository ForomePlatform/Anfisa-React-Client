import { makeAutoObservable, reaction, toJS } from 'mobx'

import { TGenomeOptionsKeys } from '@core/enum/explore-genome-types-enum'
import { pushQueryParams } from '@core/history'
import { t } from '@i18n'
import { createHistoryObserver } from '@store/common'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import { ISolutionEntryDescription } from '@service-providers/common'
import {
  ActionTypes,
  DtreeModifyingActions,
  dtreeProvider,
} from '@service-providers/decision-trees'
import decisionTreesProvider from '@service-providers/decision-trees/decision-trees.provider'
import { filterPresetsData } from '@utils/filter-presets'
import { showToast } from '@utils/notifications/showToast'
import { validatePresetName } from '@utils/validation/validatePresetName'
import { AvailableDtreesAsyncStore } from './available-dtrees.async.store'

export enum DtreeModifiedState {
  NotDtree = 'NotDtree',
  NotModified = 'NotModified',
  Modified = 'Modified',
}

export class FilterDtreesStore {
  public activeDtree: string = ''

  private readonly dtrees = new AvailableDtreesAsyncStore()

  readonly observeHistory = createHistoryObserver({
    dtree: {
      get: () => this.activeDtree ?? '',
      apply: dtree => {
        this.setActiveDtree(dtree ?? '')
      },
    },
  })

  constructor() {
    makeAutoObservable(this)

    reaction(
      () => datasetStore.datasetName,
      datasetName => {
        this.resetActiveDtree()
        this.dtrees.setQuery({ datasetName, code: dtreeStore.dtreeCode })
      },
    )

    reaction(
      () => this.activeDtree,
      dtree => {
        this.updateURLWithDtreeName(dtree)
      },
    )
  }

  public get isFetchingDtrees(): boolean {
    return this.dtrees.isFetching
  }

  public get availableDtreesNames(): string[] {
    const availableDtreesNames: string[] = []
    this.availableDtrees.forEach(dtree => availableDtreesNames.push(dtree.name))

    return availableDtreesNames
  }

  public get availableDtrees(): ISolutionEntryDescription[] {
    return filterPresetsData(toJS(this.dtrees.data) || [])
  }

  public get activeDtreeInfo(): ISolutionEntryDescription | undefined {
    const dtreeName = this.activeDtree

    return this.availableDtrees.find(dtree => dtree.name === dtreeName)
  }

  public setActiveDtree = (dtree: string): void => {
    this.activeDtree = dtree
  }

  public resetActiveDtree() {
    this.setActiveDtree('')
  }

  public createDtree = (
    dtreeName: string,
    rubric?: TGenomeOptionsKeys,
  ): void => {
    if (!validatePresetName(dtreeName)) {
      showToast(t('filter.notValidName'), 'error')

      return
    }
    decisionTreesProvider
      .updateDtree({
        ds: datasetStore.datasetName,
        code: dtreeStore.dtreeCode,
        instr: [
          ActionTypes.DTREE,
          DtreeModifyingActions.UPDATE,
          dtreeName,
          rubric,
        ],
      })
      .then(() => {
        this.dtrees.invalidate()
        this.setActiveDtree(dtreeName)
        showToast(
          t('header.dtreeAction.success.create', { dtreeName }),
          'success',
        )
      })
      .catch(() => {
        showToast(t('header.dtreeAction.error.create', { dtreeName }), 'error')
      })
  }

  public modifyDtree = (dtreeName: string): void => {
    dtreeProvider
      .updateDtree({
        ds: datasetStore.datasetName,
        code: dtreeStore.dtreeCode,
        instr: [ActionTypes.DTREE, DtreeModifyingActions.UPDATE, dtreeName],
      })
      .then(
        () => {
          this.setActiveDtree(dtreeName)
          showToast(
            t('header.dtreeAction.success.modify', { dtreeName }),
            'success',
          )
        },
        () => {
          showToast(
            t('header.dtreeAction.error.modify', { dtreeName }),
            'error',
          )
        },
      )
  }

  // TODO[control]: when dtree_set async store is ready, add invalidation after tree is deleted

  deleteDtree = (dtreeName: string): void => {
    if (this.activeDtree === dtreeName) {
      this.resetActiveDtree()
    }

    dtreeProvider
      .deleteDtree({
        ds: datasetStore.datasetName,
        code: dtreeStore.dtreeCode,
        instr: [ActionTypes.DTREE, DtreeModifyingActions.DELETE, dtreeName],
      })
      .then(
        () => {
          this.dtrees.invalidate()
          showToast(
            t('header.dtreeAction.success.delete', { dtreeName }),
            'success',
          )
        },
        () => {
          showToast(
            t('header.dtreeAction.error.delete', { dtreeName }),
            'error',
          )
        },
      )
  }

  private updateURLWithDtreeName(dtree: string) {
    pushQueryParams({ dtree })
  }
}
