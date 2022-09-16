import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { IStepData } from '@store/dtree/dtree.store'
import stepStore, { ActiveStepOptions } from '@store/dtree/step.store'
import { Icon } from '@ui/icon'
import { FnLabel } from '@components/fn-label'
import { DecisionTreesResultsDataCy } from '@data-testid'
import { AttributeKinds } from '@service-providers/common'
import modalsVisibilityStore from '../../../modals/modals-visibility-store'
import { InactiveFieldLabel } from '../inactive-field-label'
import { NotModeWrapper } from './not-mode-wrapper'

interface IContentItemHeaderProps {
  currentStep: IStepData
  stepType: AttributeKinds
  groupName: string
  stepNo: number
  groupNo: number
}

export const ContentItemHeader = observer(
  ({
    currentStep,
    stepType,
    groupName,
    stepNo,
    groupNo,
  }: IContentItemHeaderProps): ReactElement => {
    const isNegateStep: boolean = currentStep.isNegate || false
    const isStepInvalid: boolean =
      typeof groupName !== 'string' ||
      stepType === AttributeKinds.ERROR ||
      !stepType

    const handleModals = () => {
      stepStore.makeStepActive({
        index: stepNo - 1,
        option: ActiveStepOptions.StartedVariants,
      })

      stepType === AttributeKinds.ENUM &&
        modalsVisibilityStore.openEnumDialog(groupName, groupNo)

      stepType === AttributeKinds.NUMERIC &&
        modalsVisibilityStore.openNumericDialog(groupName, groupNo)

      if (stepType === AttributeKinds.FUNC) {
        groupName === FuncStepTypesEnum.InheritanceMode &&
          modalsVisibilityStore.openInheritanceModeDialog(groupName, groupNo)

        groupName === FuncStepTypesEnum.CustomInheritanceMode &&
          modalsVisibilityStore.openCustomInheritanceModeDialog(
            groupName,
            groupNo,
          )

        groupName === FuncStepTypesEnum.CompoundHet &&
          modalsVisibilityStore.openCompoundHetDialog(groupName, groupNo)

        groupName === FuncStepTypesEnum.CompoundRequest &&
          modalsVisibilityStore.openCompoundRequestDialog(groupName, groupNo)

        groupName === FuncStepTypesEnum.GeneRegion &&
          modalsVisibilityStore.openGeneRegionDialog(groupName, groupNo)
      }
    }

    return (
      <div className="flex flex-col w-full h-auto mr-2 pl-2 py-3 rounded-md border border-grey-light step-content-area">
        <div className="flex items-center h-auto w-full pr-2 ">
          <Icon
            name="SettingsFat"
            className="mr-1 cursor-pointer text-blue-bright"
            size={18}
            stroke={false}
            onClick={handleModals}
            dataTestId={DecisionTreesResultsDataCy.gearButton}
          />

          {isNegateStep && (
            <NotModeWrapper className="flex items-center justify-center">
              {'NOT'}
            </NotModeWrapper>
          )}

          <div className="flex items-center text-14">
            {stepType === AttributeKinds.FUNC && (
              <FnLabel
                isActive={currentStep && currentStep.isActive}
                className="shadow-dark mr-1"
              />
            )}
            {isStepInvalid ? (
              <InactiveFieldLabel stepNo={stepNo} groupIndex={groupNo} />
            ) : (
              groupName
            )}
          </div>

          {/* TODO: add switch to step after implementation in backend */}
          {/* <div className="pt-1.5">
              <Switch isChecked={isChecked} onChange={toggleChecked} />
            </div> */}
        </div>
      </div>
    )
  },
)
