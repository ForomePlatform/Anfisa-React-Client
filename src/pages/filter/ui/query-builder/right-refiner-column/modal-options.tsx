import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import { showToast } from '@utils/notifications/showToast'

interface IModalOptionsProps {
  closeModal: () => void
  filterId: string
}

export const ModalOptions = observer(
  ({ closeModal, filterId }: IModalOptionsProps): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, () => closeModal())

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      showToast('This function is not ready yet', 'error')
    }

    const handleDeleteFilterBlock = (e: React.MouseEvent) => {
      e.stopPropagation()
      filterStore.removeFilterBlock(filterId)
    }

    return (
      <div
        ref={ref}
        className="top-4 right-6 absolute z-50 text-14 font-normal"
      >
        <div className="top-8 w-28 flex flex-col justify-between px-0 py-0 bg-white rounded-md shadow-dark">
          <div
            onClick={(e: React.MouseEvent) => handleDeleteFilterBlock(e)}
            className="cursor-pointer rounded-br-none rounded-bl-none rounded-l-md rounded-r-md py-2 px-2 hover:bg-blue-bright hover:text-white"
            data-testId={DecisionTreeModalDataCy.joinByAnd}
          >
            {t('filter.deleteAttriubute')}
          </div>

          <div
            onClick={(e: React.MouseEvent) => handleClick(e)}
            className="cursor-pointer py-2 px-2 hover:bg-blue-bright hover:text-white rounded-bl-md rounded-br-md"
            data-testId={DecisionTreeModalDataCy.joinByOr}
          >
            {t('filter.copyData')}
          </div>
        </div>
      </div>
    )
  },
)
