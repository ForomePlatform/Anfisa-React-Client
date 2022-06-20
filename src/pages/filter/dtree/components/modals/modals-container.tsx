import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { ViewVariantsModal } from '@pages/filter/common/view-variants'
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

export const ModalsContainer = observer(
  (): ReactElement => (
    <>
      <SelectAttributeDialog />

      <EnumDialog />

      <NumericDialog />

      <InheritanceModeDialog />

      <CustomInheritanceModeDialog />

      <CompoundHetDialog />

      <CompoundRequestDialog />

      <GeneRegionDialog />

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
