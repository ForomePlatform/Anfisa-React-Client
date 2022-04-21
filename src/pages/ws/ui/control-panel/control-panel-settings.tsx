import { ReactElement } from 'react'

import { PopperButton } from '@components/popper-button'
import { SettingsPanel } from '../customize-table-modal/settings-panel/settings-panel'
import { TableProperiesButton } from '../table-properties-button'

export const Results = (): ReactElement => (
  <div>
    <PopperButton
      ButtonElement={TableProperiesButton}
      ModalElement={SettingsPanel}
    />
  </div>
)
