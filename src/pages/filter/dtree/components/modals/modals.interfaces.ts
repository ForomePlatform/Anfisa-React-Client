import { BaseAttributeStore } from '@pages/filter/common/attributes/base-attribute.store'
import { BaseFunctionsStore } from '@pages/filter/common/attributes/base-functions.store'
import { ISavePanelAttributeProps } from '@pages/filter/refiner/components/middle-column/panels/utils/save-pannel-attribute'
import {} from '@service-providers/common'
import { IAddAttributeToStepProps } from '@utils/addAttributeToStep'

export interface IModalsContainerProps {
  attributeStore: BaseAttributeStore
  funcStore: BaseFunctionsStore
  isDataReady: boolean
  onAddEnum: (props: IAddAttributeToStepProps) => void
  onSaveEnum: (props: ISavePanelAttributeProps) => void
  onAddNumeric: (props: IAddAttributeToStepProps) => void
  onSaveNumeric: (props: ISavePanelAttributeProps) => void
  onAddFunc: (props: IAddAttributeToStepProps) => void
  onSaveFunc: (props: ISavePanelAttributeProps) => void
}

export interface ICommonDialogProps {
  attributeStore: BaseAttributeStore
}

export interface IEnumDialogProps extends ICommonDialogProps {
  isDataReady: boolean
  onAddEnum: (props: IAddAttributeToStepProps) => void
  onSaveEnum: (props: ISavePanelAttributeProps) => void
}

export interface INumericDialogProps extends ICommonDialogProps {
  onAddNumeric: (props: IAddAttributeToStepProps) => void
  onSaveNumeric: (props: ISavePanelAttributeProps) => void
}

export interface IFuncDialogProps {
  funcStore: BaseFunctionsStore
  onAddFunc: (props: IAddAttributeToStepProps) => void
  onSaveFunc: (props: ISavePanelAttributeProps) => void
}
