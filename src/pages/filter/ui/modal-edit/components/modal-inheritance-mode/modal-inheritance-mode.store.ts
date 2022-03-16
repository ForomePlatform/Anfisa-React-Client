import { Dispatch, SetStateAction } from 'react'
import { makeAutoObservable } from 'mobx'

import { ActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import modalEditStore from '@pages/filter/ui/modal-edit/modal-edit.store'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'

interface ISetProblemGroupsProps {
  checked: boolean
  value: string
  groupName: string
  setSelectedProblemGroups: Dispatch<SetStateAction<string[]>>
}
class ModalInheritanceModeStore {
  constructor() {
    makeAutoObservable(this)
  }

  public setProblemGroups = ({
    checked,
    value,
    groupName,
    setSelectedProblemGroups,
  }: ISetProblemGroupsProps) => {
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
    dtreeStore.closeModalInheritanceMode()
    dtreeStore.resetSelectedFilters()
  }

  public addAttribute = (
    action: ActionType,
    selectedProblemGroups: string[],
  ): void => {
    const params = { problem_group: selectedProblemGroups }

    addAttributeToStep(action, 'func', null, params)

    dtreeStore.resetSelectedFilters()
    dtreeStore.closeModalInheritanceMode()
  }

  public openModalAttribute = (): void => {
    dtreeStore.closeModalInheritanceMode()
    dtreeStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  public closeModal(): void {
    dtreeStore.closeModalInheritanceMode()
  }

  public fetchStatFunc(groupName: string, params: string): void {
    dtreeStore.fetchStatFuncAsync(groupName, params)
  }

  public checkExistedSelectedFilters() {
    dtreeStore.stepData[modalEditStore.currentStepIndex].groups[
      modalEditStore.currentGroupIndex
    ]
      .find((elem: any) => Array.isArray(elem))
      .map((item: string) => dtreeStore.addSelectedFilter(item))
  }
}

export default new ModalInheritanceModeStore()
