import { makeAutoObservable } from 'mobx'

import { ActionType } from '@declarations'
import { InheritanceModeEnum } from '@core/enum/inheritance-mode-enum'
import dtreeStore from '@store/dtree'
import modalEditStore from '@pages/filter/ui/modal-edit/modal-edit.store'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'
import { getSortedArray } from '@utils/getSortedArray'

interface ISelectValues {
  first: string
  second: string
  third: string
}

class ModalCustomInheritanceModeStore {
  selectValues: ISelectValues = {
    first: '--',
    second: '--',
    third: '--',
  }

  resetValue = ''

  constructor() {
    makeAutoObservable(this)
  }

  public setSingleSelectValue(type: string, value: string): void {
    switch (type) {
      case 'first':
        this.selectValues.first = value
        break
      case 'second':
        this.selectValues.second = value
        break
      case 'third':
        this.selectValues.third = value
        break
    }
  }

  public setComplexSelectValues(complexValue: ISelectValues): void {
    this.selectValues = complexValue
  }

  get firstSelectValue(): string {
    return this.selectValues.first
  }

  get secondSelectValue(): string {
    return this.selectValues.second
  }

  get thirdSelectValue(): string {
    return this.selectValues.third
  }

  public setResetValue(resetValue: string) {
    this.resetValue = resetValue
  }

  get reset(): string {
    return this.resetValue
  }

  public sendRequest(
    type: string,
    value: string,
    complexScenario?: ISelectValues[],
  ): void {
    let selectedData: any[] = []

    if (type && value) {
      selectedData = [
        [
          type === 'first' ? value : this.selectValues.first,
          modalEditStore.problemGroups[0],
        ],
        [
          type === 'second' ? value : this.selectValues.second,
          modalEditStore.problemGroups[1],
        ],
        [
          type === 'third' ? value : this.selectValues.third,
          modalEditStore.problemGroups[2],
        ],
      ]
    }

    const newScenario = getSortedArray(complexScenario || selectedData)

    let scenarioString = ''

    newScenario.map((item, index) => {
      scenarioString += `"${item[0]}":["${item[1]
        .toString()
        .split(',')
        .join('","')}"]`

      if (newScenario[index + 1]) scenarioString += ','
    })

    const params = `{"scenario":{${scenarioString}}}`

    dtreeStore.fetchStatFuncAsync(modalEditStore.groupName, params)
  }

  public setSingleScenario = (group: string, value: string): void => {
    const problemGroups: string[] = modalEditStore.problemGroups

    if (group === problemGroups[0]) {
      this.setSingleSelectValue('first', value)

      this.sendRequest('first', value)
    }

    if (group === problemGroups[1]) {
      this.setSingleSelectValue('second', value)

      this.sendRequest('second', value)
    }

    if (group === problemGroups[2]) {
      this.setSingleSelectValue('third', value)

      this.sendRequest('third', value)
    }

    this.setResetValue('')
  }

  public setComplexScenario(name: string): void {
    const problemGroups: string[] = modalEditStore.problemGroups

    if (name === InheritanceModeEnum.HomozygousRecessive_XLinked) {
      this.setComplexSelectValues({
        first: '2',
        second: '0-1',
        third: '0-1',
      })

      const complexScenario: any[] = [
        ['2', problemGroups[0]],
        ['0-1', problemGroups[1]],
        ['0-1', problemGroups[2]],
      ]

      this.sendRequest('', '', complexScenario)
    }

    if (name === InheritanceModeEnum.AutosomalDominant) {
      this.setComplexSelectValues({
        first: '1-2',
        second: '0',
        third: '0',
      })

      const complexScenario: any[] = [
        ['1-2', problemGroups[0]],
        ['0', problemGroups[1]],
        ['0', problemGroups[2]],
      ]

      this.sendRequest('', '', complexScenario)
    }

    if (name === InheritanceModeEnum.Compensational) {
      this.setComplexSelectValues({
        first: '0',
        second: '1-2',
        third: '1-2',
      })

      const complexScenario: any[] = [
        ['0', problemGroups[0]],
        ['1-2', problemGroups[1]],
        ['1-2', problemGroups[2]],
      ]

      this.sendRequest('', '', complexScenario)
    }

    if (name === 'empty') {
      this.setComplexSelectValues({
        first: '--',
        second: '--',
        third: '--',
      })

      const complexScenario: any[] = [
        ['--', problemGroups[0]],
        ['--', problemGroups[1]],
        ['--', problemGroups[2]],
      ]

      this.sendRequest('', '', complexScenario)
    }

    this.setResetValue(name)
  }

  public closeModal(): void {
    dtreeStore.closeModalCustomInheritanceMode()
    this.resetValue = ''
    this.selectValues = {
      first: '--',
      second: '--',
      third: '--',
    }
  }

  public openModalAttribute(): void {
    dtreeStore.closeModalCustomInheritanceMode()
    dtreeStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  public addAttribute = (action: ActionType) => {
    dtreeStore.addSelectedFilter(modalEditStore.variants[0][0])
    const params = { scenario: dtreeStore.scenario }

    addAttributeToStep(action, 'func', [null], params)
    dtreeStore.resetSelectedFilters()
    dtreeStore.closeModalCustomInheritanceMode()
  }

  public saveChanges = () => {
    const params = { scenario: dtreeStore.scenario }

    changeFunctionalStep(params)
    dtreeStore.closeModalCustomInheritanceMode()
  }
}

export default new ModalCustomInheritanceModeStore()
