import { ReactElement, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import dtreeStore from '@store/dtree'
import { AllNotModalMods } from './all-not-modal-mods'
import { ApproxStateModalMods } from './approx-state-modal-mods'
import { EditModalVariants } from './edit-modal-variants'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'
import { SelectModalButtons } from './select-modal-buttons'

export const ModalSelectCompoundHet = observer(
  (): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, () => dtreeStore.closeModalSelectCompoundHet())

    const currentStepIndex = dtreeStore.currentStepIndex

    const currentGroup = dtreeStore.stepData[currentStepIndex].groups

    const groupName = dtreeStore.groupNameToChange

    const variants = dtreeStore.statFuncData.variants

    const approxValues: string[] = []
    const approxOptions: string[] = []

    let attrData: any

    const subGroups = Object.values(dtreeStore.getQueryBuilder)

    subGroups.map(subGroup => {
      subGroup.map((item, currNo) => {
        if (item.name === groupName) {
          attrData = subGroup[currNo]
        }
      })
    })

    attrData['approx-modes'].map((mode: string[]) => {
      approxOptions.push(mode[1])
      approxValues.push(mode[0])
    })

    const [stateCondition, setStateCondition] = useState('-current-')

    const [approxCondition, setApproxCondition] = useState('transcript')

    const stateOptions: string[] = [stateCondition]

    useEffect(() => {
      const indexForApi = dtreeStore.getStepIndexForApi(currentStepIndex)

      const params = `{"approx":"${approxCondition}","state":${
        stateCondition === '-current-' || !stateCondition
          ? null
          : `"${stateCondition}"`
      }}`

      dtreeStore.setCurrentStepIndexForApi(indexForApi)

      dtreeStore.fetchStatFuncAsync(groupName, params)

      return () => dtreeStore.resetStatFuncData()

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClose = () => {
      dtreeStore.closeModalSelectCompoundHet()
    }

    const handleSetCondition = (value: string, type: string) => {
      const indexForApi = dtreeStore.getStepIndexForApi(currentStepIndex)

      if (type === 'approx') {
        setApproxCondition(value)

        const params = `{"approx":"${value}","state":${
          stateCondition !== '-current-' ? `"${stateCondition}"` : null
        }}`

        dtreeStore.setCurrentStepIndexForApi(indexForApi)

        dtreeStore.fetchStatFuncAsync(groupName, params)
      }

      if (type === 'state') {
        setStateCondition(value)

        const params = `{"approx":"${approxCondition}","state":${
          value !== '-current-' ? `"${value}"` : null
        }}`

        dtreeStore.setCurrentStepIndexForApi(indexForApi)

        dtreeStore.fetchStatFuncAsync(groupName, params)
      }
    }

    const handleModals = () => {
      dtreeStore.closeModalSelectCompoundHet()
      dtreeStore.openModalAttribute(currentStepIndex)
      dtreeStore.resetSelectedFilters()
    }

    // TODO:fix
    const handleReplace = () => {
      // dtreeStore.replaceStepData(subGroupName, 'enum')
      dtreeStore.resetSelectedFilters()
      dtreeStore.closeModalSelectCompoundHet()
    }

    const handleModalJoin = () => {
      dtreeStore.openModalJoin()
    }

    const handleAddAttribute = (_subGroupName: string) => {
      // addAttributeToStep('func', subGroupName)

      dtreeStore.resetSelectedFilters()
      dtreeStore.closeModalSelectCompoundHet()
    }

    return (
      <ModalBase refer={ref} minHeight={250}>
        <HeaderModal
          groupName={dtreeStore.groupNameToChange}
          handleClose={handleClose}
        />

        <div className="flex justify-between w-full mt-4 text-14">
          <ApproxStateModalMods
            approxOptions={approxOptions}
            approxValues={approxValues}
            approxCondition={approxCondition}
            stateOptions={stateOptions}
            stateCondition={stateCondition}
            handleSetCondition={handleSetCondition}
          />

          <AllNotModalMods />
        </div>

        <EditModalVariants variants={variants} disabled={true} />

        <SelectModalButtons
          handleAddAttribute={handleAddAttribute}
          handleClose={handleClose}
          handleModals={handleModals}
          handleModalJoin={handleModalJoin}
          handleReplace={handleReplace}
          disabled={!variants}
          currentGroup={currentGroup}
        />
      </ModalBase>
    )
  },
)
