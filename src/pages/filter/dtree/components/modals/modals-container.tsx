import { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ExportModal } from '@pages/main/components/modals/export-modal'
import { ImportModal } from '@pages/main/components/modals/import-modal'
import handleDatasetStore from '../../../../main/components/handle-dataset/handle-dataset.store'
import { ModalCompoundHet } from './components/modal-compound-het/modal-compound-het'
import { ModalCompoundRequest } from './components/modal-compound-request/modal-compound-request'
import { ModalCustomInheritanceMode } from './components/modal-custom-inheritance-mode/modal-custom-inheritance-mode'
import { ModalEnum } from './components/modal-enum/modal-enum'
import { ModalGeneRegion } from './components/modal-gene-region/modal-gene-region'
import { ModalInheritanceMode } from './components/modal-inheritance-mode/modal-inheritance-mode'
import { ModalNumeric } from './components/modal-numeric'
import { ModalSelectAttribute } from './components/modal-select-attribute'
import { ModalViewVariants } from './components/modal-view-variants'
import modalsVisibilityStore from './modals-visibility-store'

export const ModalsContainer = observer(
  (): ReactElement => (
    <Fragment>
      {modalsVisibilityStore.isModalAttributeVisible && (
        <ModalSelectAttribute />
      )}

      <ModalEnum />

      <ModalNumeric />

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

      {modalsVisibilityStore.isModalViewVariantsVisible && (
        <ModalViewVariants />
      )}

      {handleDatasetStore.isExportModalShown && <ExportModal />}
      {handleDatasetStore.isImportModalShown && <ImportModal />}
    </Fragment>
  ),
)
