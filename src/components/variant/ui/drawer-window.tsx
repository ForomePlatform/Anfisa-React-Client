import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useRef,
  useState,
} from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import Checkbox from 'react-three-state-checkbox'
import cn from 'classnames'
import clone from 'lodash/clone'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { IGridLayout } from '@declarations'
import { t } from '@i18n'
import variantStore from '@store/variant'
import { Icon } from '@ui/icon'
import {
  ICommonAspectDescriptor,
  IPreAspectDescriptor,
  ITableAspectDescriptor,
  TRecCntResponse,
} from '@service-providers/dataset-level/dataset-level.interface'
import { DrawerClass, useScrollShadow } from '../drawer.utils'
import { DrawerPreView } from './drawer-pre-view'
import { DrawerTable } from './drawer-table'
import { IgvButton } from './igv-button'

export const DrawerWindow = observer(
  ({
    aspect,
    layout,
    setLayout,
  }: {
    aspect: TRecCntResponse
    layout: IGridLayout[]
    setLayout: Dispatch<SetStateAction<IGridLayout[]>>
  }) => {
    const ref = useRef<HTMLDivElement>(null)

    const [filterSelection, setFilterSelection] = useState(
      DrawerClass.normClass,
    )

    const { shouldAddShadow, handleScroll, handleStartScroll } =
      useScrollShadow(ref.current)

    const handleSelection = (checked: boolean) => {
      checked
        ? setFilterSelection(DrawerClass.normHitClass)
        : setFilterSelection(DrawerClass.normClass)
    }

    const currentLayout = layout.find(element => element.i === aspect.name)

    const isWindowOpen = currentLayout?.h !== 1

    const shouldShowCheckbox =
      isWindowOpen && aspect.name === 'view_transcripts'

    return (
      <>
        <div
          className="flex justify-between p-3 rounded-t font-bold text-white cursor-pointer hover:bg-blue-bright"
          onClick={e => {
            const target = e.target as HTMLButtonElement

            if (target && target.classList.contains('dragHandleSelector')) {
              return
            }

            const cloneRecords: any = variantStore.recordsDisplayConfig

            const drawerElement = document.querySelector(
              `#drawer-${aspect.name}`,
            )

            const clientHeight = get(
              drawerElement?.firstChild,
              'clientHeight',
              0,
            )

            const openedH = clientHeight * 0.0208 + 1.3

            setLayout((prev: IGridLayout[]) => {
              const clonedLayout: any[] = clone(prev)

              const layoutItemIndex = clonedLayout.findIndex(
                (aspectItem: any) => aspectItem.i === aspect.name,
              )

              clonedLayout[layoutItemIndex].h = cloneRecords[aspect.name].isOpen
                ? 1
                : openedH

              variantStore.updateRecordsDisplayConfig(
                clonedLayout[layoutItemIndex].i,
                clonedLayout[layoutItemIndex].h,
              )

              const reflowLayout = clonedLayout.map(
                (layoutItem, layoutIndex: number) => {
                  if (layoutIndex < layoutItemIndex) {
                    return layoutItem
                  }

                  return {
                    ...layoutItem,
                    y: layoutItem.y + openedH,
                  }
                },
              )

              window.sessionStorage.setItem(
                'gridLayout',
                JSON.stringify(reflowLayout),
              )

              return reflowLayout
            })
            variantStore.checkRecodsDisplaying()
          }}
        >
          <span className="uppercase">{aspect.title}</span>
          <div className="flex">
            {aspect.name === 'view_gen' && <IgvButton />}
            {shouldShowCheckbox && (
              <label
                className="mx-2 whitespace-nowrap flex items-center"
                onClick={(event: MouseEvent) => event.stopPropagation()}
              >
                <span className="pr-2 font-normal text-xs">
                  {t('variant.showSelectionOnly')}
                </span>
                <Checkbox
                  className="h-4 w-4"
                  checked={filterSelection !== DrawerClass.normClass}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    handleSelection(event.target.checked)
                  }}
                />
              </label>
            )}

            <Icon
              name="ArrowsOut"
              className="dragHandleSelector mr-1 cursor-move hover:text-blue-bright"
            />
          </div>
        </div>
        <ScrollContainer
          hideScrollbars={false}
          onScroll={handleScroll}
          onStartScroll={handleStartScroll}
          className="cursor-grab"
        >
          <div
            className={cn('py-3 pr-3   content-child')}
            id={`drawer-${aspect.name}`}
            style={{
              height: get(layout, aspect.name, 0).h,
            }}
            ref={ref}
          >
            {aspect.type === 'pre' ? (
              <DrawerPreView
                {...(aspect as ICommonAspectDescriptor & IPreAspectDescriptor)}
              />
            ) : (
              <DrawerTable
                {...(aspect as ICommonAspectDescriptor &
                  ITableAspectDescriptor)}
                name={aspect.name}
                shouldAddShadow={shouldAddShadow}
                filterSelection={filterSelection}
              />
            )}
          </div>
        </ScrollContainer>
      </>
    )
  },
)
