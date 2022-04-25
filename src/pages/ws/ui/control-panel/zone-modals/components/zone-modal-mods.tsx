import { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterModsEnum } from '@core/enum/filter-mods-enum'
import { t } from '@i18n'
import zoneStore from '@store/filterZone'
import { StyledCheckboxContainer } from '@components/styled-checkbox-container'

export const ZoneModalMods = observer((): ReactElement => {
  const handleCheck = (checked: boolean, name: string) => {
    if (checked && name) {
      name === FilterModsEnum.NOTMode && zoneStore.setModeNOT(true)
      name === FilterModsEnum.VariantsWithNotesOnly &&
        zoneStore.setModeWithNotes(true)
    } else if (name) {
      name === FilterModsEnum.NOTMode && zoneStore.setModeNOT(false)
      name === FilterModsEnum.VariantsWithNotesOnly &&
        zoneStore.removeLocalTag('_note', 'slow')
    }
  }

  return (
    <Fragment>
      <div className="flex mt-3">
        <div className="mr-6 flex items-center">
          <StyledCheckboxContainer
            onChange={e =>
              handleCheck(
                e.target.checked,
                (e.target.name = FilterModsEnum.NOTMode),
              )
            }
            checked={zoneStore.isModeNOT}
            id={t('ds.notMode')}
            label={t('ds.notMode')}
          />
        </div>

        <div className="mr-6 flex items-center">
          <StyledCheckboxContainer
            onChange={e =>
              handleCheck(
                e.target.checked,
                (e.target.name = FilterModsEnum.VariantsWithNotesOnly),
              )
            }
            checked={zoneStore.isModeWithNotes}
            id={t('ds.variantsWithNotesOnly')}
            label={t('ds.variantsWithNotesOnly')}
          />
        </div>
      </div>
    </Fragment>
  )
})
