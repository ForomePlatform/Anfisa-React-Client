import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import filterStore from '@store/filter'
import { getPageRoute } from '@router/router.const'
import { Routes } from '@router/routes.enum'
import { Divider } from '@ui/divider'
import { Icon } from '@ui/icon'
import { UndoRedoButtons } from '@components/undo-redo-buttons'
import { CreateDatasetButton } from '@pages/ws/ui/control-panel/create-dataset-button'
import { FilterControlOptions } from './filter-control.const'
import { IFilterControlProps } from './filter-control.interface'
import { SolutionSelect } from './solution-select'

export const FilterControl = observer(
  ({
    SolutionControl,
    TextEditorButton,
    className,
    isForwardAllowed,
    isBackwardAllowed,
    pageName,
    goForward,
    goBackward,
  }: IFilterControlProps): ReactElement => {
    const history = useHistory()
    const params = useParams()
    const dsName = params.get('ds') || ''

    const goToPage = (name: FilterControlOptions) => {
      const route = getPageRoute(name)

      filterStore.setMethod(name)

      history.push(`${route}?ds=${dsName}`)
    }

    return (
      <div
        className={cn(
          'flex flex-wrap justify-end bg-blue-dark px-4 pb-4',
          className,
        )}
      >
        <div className="flex items-center justify-between w-full mt-3">
          <div className="flex items-center">
            <SolutionSelect pageName={pageName} goToPage={goToPage} />

            <Divider orientation="vertical" className="h-[75%]" />

            <SolutionControl />

            <Divider orientation="vertical" className="h-[75%]" />

            <CreateDatasetButton />

            {TextEditorButton && (
              <>
                <Divider orientation="vertical" className="h-[75%]" />

                <TextEditorButton />
              </>
            )}
          </div>

          <div className="flex items-center">
            <UndoRedoButtons
              onUndo={goBackward}
              onRedo={goForward}
              isUndoDisabled={!isBackwardAllowed}
              isRedoDisabled={!isForwardAllowed}
            />

            <Link
              className="flex flex-wrap ml-3 text-white cursor-pointer"
              to={Routes.Root}
            >
              <Icon size={15} name="Close" />
            </Link>
          </div>
        </div>
      </div>
    )
  },
)
