import { ReactElement } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'
import { PopperButton } from '@components/popper-button'
import { ControlPanelDivider } from '../control-panel-divider'
import { FilterTags } from './components/filter-tags'
import { HeaderTableButton } from './components/header-table-button'

interface IZoneItemProps {
  title: string
  modalElement: any
  data: string[]
}

export const ZoneItem = observer(
  ({ title, modalElement, data }: IZoneItemProps): ReactElement => {
    const ButtonElementEdit = ({ refEl, onClick }: any) => (
      <HeaderTableButton
        refEl={refEl}
        onClick={onClick}
        icon={<Icon name="Plus" />}
        className="text-blue-bright mt-px ml-1"
      />
    )

    const ButtonElementAdd = ({ refEl, onClick }: any) => (
      <HeaderTableButton
        text={`${t('general.add')} ${title}`}
        refEl={refEl}
        onClick={onClick}
        noIcon={true}
        className="flex items-center text-14 text-blue-bright"
        dataTestId={MainTableDataCy.addGene}
      />
    )

    return (
      <div className="flex items-center">
        <PopperButton
          title={title}
          ButtonElement={ButtonElementAdd}
          ModalElement={modalElement}
          data={data}
          type="add"
        />

        <div className="flex justify-between">
          <FilterTags data={data} isGenes />
        </div>

        {toJS(data).length > 0 && (
          <PopperButton
            title={title}
            ButtonElement={ButtonElementEdit}
            ModalElement={modalElement}
          />
        )}

        <ControlPanelDivider className="bg-blue-lighter h-2/3" />
      </div>
    )
  },
)
