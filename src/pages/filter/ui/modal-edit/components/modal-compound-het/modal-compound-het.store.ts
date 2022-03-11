import { makeAutoObservable, toJS } from 'mobx'

import { ActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'
import { getQueryBuilder } from '@utils/getQueryBuilder'
import modalEditStore, { IParams } from '../../modal-edit.store'

class ModalCompoundHetStore {
  stateCondition = '-current-'
  approxCondition = 'transcript'
  stateOptions: string[] = [this.stateCondition]

  constructor() {
    makeAutoObservable(this)
  }

  public setStateCondition(condtition: string): void {
    this.stateCondition = condtition
  }

  public setApproxCondition(condtition: string): void {
    this.approxCondition = condtition
  }

  public resetConditions(): void {
    this.stateCondition = '-current-'
    this.approxCondition = 'transcript'
  }

  public get attrData() {
    let attrData: any

    const subGroups = Object.values(
      getQueryBuilder(toJS(dtreeStore.startDtreeStat['stat-list'])),
    )

    subGroups.map(subGroup => {
      subGroup.map((item, currNo) => {
        if (item.name === modalEditStore.groupName) {
          attrData = subGroup[currNo]
        }
      })
    })

    return attrData
  }

  public get approxOptions(): string[] {
    const approxOptions: string[] = []

    this.attrData['approx-modes'].map((mode: string[]) => {
      approxOptions.push(mode[1])
    })

    return approxOptions
  }

  public get approxValues(): string[] {
    const approxValues: string[] = []

    this.attrData['approx-modes'].map((mode: string[]) => {
      approxValues.push(mode[0])
    })

    return approxValues
  }

  public openModalAttribute(): void {
    dtreeStore.closeModalCompoundHet()
    dtreeStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  public openModalJoin(): void {
    dtreeStore.openModalJoin()
  }

  public addAttribute(action: ActionType): void {
    dtreeStore.addSelectedFilter(modalEditStore.variants[0][0])

    const params: IParams = {
      approx:
        this.approxCondition === 'transcript' ? null : this.approxCondition,
    }

    if (this.stateCondition) {
      params.state =
        JSON.stringify(this.stateOptions) === JSON.stringify(['-current-'])
          ? null
          : this.stateOptions
    }

    addAttributeToStep(action, 'func', null, params)

    dtreeStore.resetSelectedFilters()
    dtreeStore.closeModalCompoundHet()
  }

  public closeModal(): void {
    dtreeStore.closeModalCompoundHet()
  }

  public getApprox(approxValue: string): null | string {
    return approxValue === 'transcript' ? null : `${approxValue}`
  }

  public setCondition = (value: string, type: string) => {
    if (type === 'approx') {
      this.setApproxCondition(value)

      const params = `{"approx":${this.getApprox(value)},"state":${
        this.stateCondition !== '-current-' ? `"${this.stateCondition}"` : null
      }}`

      dtreeStore.fetchStatFuncAsync(modalEditStore.groupName, params)
    }

    if (type === 'state') {
      this.setStateCondition(value)

      const params = `{"approx":${this.getApprox(
        this.approxCondition,
      )},"state":${value !== '-current-' ? `"${value}"` : null}}`

      dtreeStore.fetchStatFuncAsync(modalEditStore.groupName, params)
    }
  }

  public saveChanges = () => {
    const params: IParams = { approx: this.approxCondition }

    if (this.stateCondition) {
      params.state =
        JSON.stringify(this.stateOptions) === JSON.stringify(['-current-'])
          ? null
          : this.stateOptions
    }

    changeFunctionalStep(params)
    dtreeStore.closeModalCompoundHet()
  }
}

export default new ModalCompoundHetStore()
