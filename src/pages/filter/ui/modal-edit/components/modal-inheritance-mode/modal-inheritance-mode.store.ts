import { Dispatch, SetStateAction } from 'react'
import { makeAutoObservable } from 'mobx'

import { ActionType } from '@declarations'
import { ModalTypeEnum } from '@core/enum/modal-type-enum'
import dtreeStore from '@store/dtree'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'

class ModalInheritanceModeStore {
  constructor() {
    makeAutoObservable(this)
  }

  public setProblemGroups = (
    checked: boolean,
    value: string,
    groupName: string,
    setSelectedProblemGroups: Dispatch<SetStateAction<string[]>>,
  ) => {
    if (checked) {
      setSelectedProblemGroups((prev: any) => {
        const newProblemGroupData = [...prev, value]

        const params = `{"problem_group":["${newProblemGroupData
          .reverse()
          .toString()
          .split(',')
          .join('","')}"]}`

        dtreeStore.fetchStatFuncAsync(groupName, params)

        return newProblemGroupData
      })
    } else {
      setSelectedProblemGroups((prev: any) => {
        const newProblemGroupData = prev.filter(
          (item: string) => item !== value,
        )

        const params = `{"problem_group": ["${newProblemGroupData
          .toString()
          .split(',')
          .join('", "')}"]}`

        dtreeStore.fetchStatFuncAsync(groupName, params)

        return newProblemGroupData
      })
    }
  }

  public resetProblemGroups = (
    groupName: string,
    setSelectedProblemGroups: Dispatch<SetStateAction<string[]>>,
  ): void => {
    setSelectedProblemGroups([])

    const params = `{"problem_group": ["${[]
      .toString()
      .split(',')
      .join('", "')}"]}`

    dtreeStore.fetchStatFuncAsync(groupName, params)
  }

  public saveChanges = (selectedProblemGroups: string[]): void => {
    const params = { problem_group: selectedProblemGroups }

    changeFunctionalStep(params, true)
    dtreeStore.closeModalEditInheritanceMode()
    dtreeStore.resetSelectedFilters()
  }

  public addAttribute = (
    action: ActionType,
    selectedProblemGroups: string[],
  ): void => {
    const params = { problem_group: selectedProblemGroups }

    addAttributeToStep(action, 'func', null, params)

    dtreeStore.resetSelectedFilters()
    dtreeStore.closeModalSelectInheritanceMode()
  }

  public openModalAttribute = (): void => {
    dtreeStore.closeModalSelectInheritanceMode()
    dtreeStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  public closeModal(modalType?: string): void {
    modalType === ModalTypeEnum.Select
      ? dtreeStore.closeModalSelectInheritanceMode()
      : dtreeStore.closeModalEditInheritanceMode()
  }
}

export default new ModalInheritanceModeStore()
