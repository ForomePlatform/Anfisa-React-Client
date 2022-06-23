import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { Prompt } from 'react-router-dom'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { useExitPrompt } from '@core/hooks/use-exit-prompt'
import { useParams } from '@core/hooks/use-params'
import { SessionStoreManager } from '@core/storage-management/session-store-manager'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { getPageRoute } from '@router/router.const'
import { Routes } from '@router/routes.enum'
import { Divider } from '@ui/divider'
import { Icon } from '@ui/icon'
import { UndoRedoButtons } from '@components/undo-redo-buttons'
import { GlbPagesNames } from '@glb/glb-names'
import { CreateDatasetButton } from '@pages/ws/ui/control-panel/create-dataset-button'
import {
  FILTER_REFERRER,
  FilterControlOptions,
  FilterControlOptionsNames,
} from './filter-control.const'
import { IFilterControlProps } from './filter-control.interface'
import { SolutionSelect } from './solution-select'

export const FilterControl = observer(
  ({
    SolutionControl,
    SolutionCreate,
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

    const isNeedToShowPrompt = () => {
      if (pageName === FilterControlOptionsNames.refiner) {
        return (
          (isBackwardAllowed && filterStore.isNotPreset) ||
          filterStore.isPresetModified
        )
      } else if (pageName === FilterControlOptionsNames.dtree) {
        return (
          (isBackwardAllowed && dtreeStore.isNotDtree) ||
          dtreeStore.isDtreeModified
        )
      }

      return false
    }

    useExitPrompt(isNeedToShowPrompt())

    const goToPage = (name: FilterControlOptions) => {
      const route = getPageRoute(name)

      filterStore.setMethod(name)

      history.push(`${route}?ds=${dsName}`)
    }

    const onLeave = () => {
      const referrer = SessionStoreManager.read<GlbPagesNames>(FILTER_REFERRER)

      if (!referrer || referrer === GlbPagesNames.Root) {
        history.push(Routes.Root)
      } else if (referrer === GlbPagesNames.Table) {
        history.push(`${Routes.WS}?ds=${dsName}`)
      }
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

            <SolutionCreate />

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

            <div
              className="flex flex-wrap ml-3 text-white cursor-pointer"
              onClick={onLeave}
            >
              <Icon size={15} name="Close" />
            </div>
          </div>
        </div>

        <Prompt
          when={isNeedToShowPrompt()}
          message={t('filter.leaveConfirm.body')}
        />
      </div>
    )
  },
)
