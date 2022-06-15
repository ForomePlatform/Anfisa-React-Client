import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { ViewVariantsModal } from '@pages/filter/common/view-variants'
import { ExportDialog } from '@pages/main/components/dialogs/export-dialog'
import { ImportDialog } from '@pages/main/components/dialogs/import-dialog'
import { EnumDialog } from './components/enum-dialog/enum-dialog'
import { ModalCompoundHet } from './components/modal-compound-het/modal-compound-het'
import { ModalCompoundRequest } from './components/modal-compound-request/modal-compound-request'
import { ModalCustomInheritanceMode } from './components/modal-custom-inheritance-mode/modal-custom-inheritance-mode'
import { ModalGeneRegion } from './components/modal-gene-region/modal-gene-region'
import { ModalInheritanceMode } from './components/modal-inheritance-mode/modal-inheritance-mode'
import { ModalSelectAttribute } from './components/modal-select-attribute'
import { NumericDialog } from './components/numeric-dialog'
import modalsVisibilityStore from './modals-visibility-store'

export const ModalsContainer = observer(
  (): ReactElement => (
    <>
      {modalsVisibilityStore.isModalAttributeVisible && (
        <ModalSelectAttribute />
      )}

      <EnumDialog />

      <NumericDialog />

      {modalsVisibilityStore.isModalInheritanceModeVisible && (
        <ModalInheritanceMode />
      )}

      {modalsVisibilityStore.isModalCustomInheritanceModeVisible && (
        <ModalCustomInheritanceMode />
      )}

      {modalsVisibilityStore.isModalCompoundHetVisible && <ModalCompoundHet />}

      {modalsVisibilityStore.isModalCompoundRequestVisible && (
        <ModalCompoundRequest />
      )}

      {modalsVisibilityStore.isModalGeneRegionVisible && <ModalGeneRegion />}

      <ViewVariantsModal
        query={dtreeStore.variantsModalQuery}
        isOpen={dtreeStore.isModalViewVariantsVisible}
        onClose={dtreeStore.closeModalViewVariants}
      />

      <ExportDialog />

      <ImportDialog />
    </>
  ),
)
