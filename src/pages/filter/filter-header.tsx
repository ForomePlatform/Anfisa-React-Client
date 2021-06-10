import { ReactElement } from 'react'
import { useHistory } from 'react-router'

import { useParams } from '@core/hooks/use-params'
import { CloseSvg } from '@icons/close'
import { FilterControl } from './ui/filter-control'
import { VisualEditorSwitch } from './ui/visual-editor-switch'

export const FilterHeader = (): ReactElement => {
  const params = useParams()
  const history = useHistory()

  const handleClose = () => history.goBack()

  return (
    <div className="flex flex-wrap justify-between bg-blue-dark pt-7 pr-6 pb-4 pl-6">
      <span className="text-20 text-white font-bold">{params.get('ds')}</span>

      <div className="flex items-center">
        <VisualEditorSwitch />
        <CloseSvg onClick={handleClose} style={{ cursor: 'pointer' }} />
      </div>

      <FilterControl />
    </div>
  )
}
