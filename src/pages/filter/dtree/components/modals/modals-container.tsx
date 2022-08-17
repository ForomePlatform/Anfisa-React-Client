import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { ViewVariantsModal } from '@pages/filter/common/view-variants'
import { viewVariantsStore } from '@pages/filter/common/view-variants/store'
import { IgvModal } from '@pages/filter/dtree/components/modals/components/igv'
import { ExportDialog } from '@pages/main/components/dialogs/export-dialog'
import { ImportDialog } from '@pages/main/components/dialogs/import-dialog'
import { CompoundHetDialog } from './components/compound-het-dialog'
import { CompoundRequestDialog } from './components/compound-request-dialog'
import { CustomInheritanceModeDialog } from './components/custom-inheritance-mode-dialog'
import { EnumDialog } from './components/enum-dialog'
import { GeneRegionDialog } from './components/gene-region-dialog'
import { InheritanceModeDialog } from './components/inheritance-mode-dialog'
import { NumericDialog } from './components/numeric-dialog'
import { SelectAttributeDialog } from './components/select-attribute-dialog'
import { IModalsContainerProps } from './modals.interfaces'
import modalsVisibilityStore from './modals-visibility-store'

export const ModalsContainer = observer(
  ({
    isDataReady,
    attributeStore,
    funcStore,
    onAddEnum,
    onSaveEnum,
    onAddNumeric,
    onSaveNumeric,
    onAddFunc,
    onSaveFunc,
  }: IModalsContainerProps): ReactElement => (
    <>
      <SelectAttributeDialog />

      <EnumDialog
        attributeStore={attributeStore}
        onAddEnum={onAddEnum}
        onSaveEnum={onSaveEnum}
        isDataReady={isDataReady}
      />

      <NumericDialog
        attributeStore={attributeStore}
        onAddNumeric={onAddNumeric}
        onSaveNumeric={onSaveNumeric}
      />

      <InheritanceModeDialog
        funcStore={funcStore}
        onAddFunc={onAddFunc}
        onSaveFunc={onSaveFunc}
      />

      <CustomInheritanceModeDialog
        funcStore={funcStore}
        onAddFunc={onAddFunc}
        onSaveFunc={onSaveFunc}
      />

      <CompoundHetDialog
        funcStore={funcStore}
        onAddFunc={onAddFunc}
        onSaveFunc={onSaveFunc}
      />

      <CompoundRequestDialog
        funcStore={funcStore}
        onAddFunc={onAddFunc}
        onSaveFunc={onSaveFunc}
      />

      <GeneRegionDialog
        funcStore={funcStore}
        onAddFunc={onAddFunc}
        onSaveFunc={onSaveFunc}
      />

      <ViewVariantsModal
        query={dtreeStore.variantsModalQuery}
        isOpen={dtreeStore.isModalViewVariantsVisible}
        onClose={dtreeStore.closeModalViewVariants}
      />

      <ExportDialog />

      <ImportDialog />

      <IgvModal
        isOpen={modalsVisibilityStore.isIgvModalVisible}
        igvParams={viewVariantsStore.record.igvParams}
      />
    </>
  ),
)
