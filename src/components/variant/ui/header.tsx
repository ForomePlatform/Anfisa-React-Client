import { Dispatch, ReactElement, SetStateAction } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import get from 'lodash/get'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useKeydown } from '@core/hooks/use-keydown'
import { useVariantIndex } from '@core/hooks/use-variant-index'
import datasetStore from '@store/dataset/dataset'
import columnsStore from '@store/ws/columns'
import mainTableStore from '@store/ws/main-table.store'
import variantStore from '@store/ws/variant'
import { Routes } from '@router/routes.enum'
import { Icon } from '@ui/icon'
import {
  HgModes,
  IAttributeDescriptors,
} from '@service-providers/dataset-level/dataset-level.interface'
import { findElementInRow } from '@utils/mian-table/find-element-in-row'
import { ChangeVariantButton } from './change-variant-button'
import { DrawerNote } from './drawer-note/drawer-note'
import { DrawerTags } from './drawer-tags'

interface IVariantHeaderProps {
  setLayout: Dispatch<SetStateAction<any>>
}

export const VariantHeader = observer(
  ({ setLayout }: IVariantHeaderProps): ReactElement => {
    const history = useHistory()
    const location = useLocation()
    const { wsListData } = mainTableStore
    const variant = toJS(variantStore.variant)
    const rows: IAttributeDescriptors[] = get(variant, '[0].rows', [])

    const variantWithoutGenesName = 'None'
    const genes = findElementInRow(rows, 'genes') || variantWithoutGenesName

    const hg19locus = findElementInRow(rows, 'hg19')
    const hg38locus = findElementInRow(rows, 'hg38')

    const { locusMode } = datasetStore
    const currentLocus = locusMode === HgModes.HG19 ? hg19locus : hg38locus

    const filteredNo = toJS(mainTableStore.filteredNo)

    const canGetPrevVariant = !(
      filteredNo[filteredNo.indexOf(variantStore.index) - 1] >= 0
    )

    const canGetNextVariant = !(
      filteredNo[filteredNo.indexOf(variantStore.index) + 1] >= 0
    )

    const { setVariantIndex } = useVariantIndex()

    const handlePrevVariant = () => {
      if (!variantStore.drawerVisible || canGetPrevVariant) return
      variantStore.prevVariant()
    }

    const handleNextVariant = () => {
      if (!variantStore.drawerVisible || canGetNextVariant) return
      variantStore.nextVariant()
    }

    useKeydown([
      { eventCode: 'ArrowUp', callback: handlePrevVariant },
      { eventCode: 'ArrowDown', callback: handleNextVariant },
    ])

    const handleCloseDrawer = () => {
      // TODO: add this requests to "Apply" btn in modals for change tags and notes in another task
      wsListData.invalidate()

      mainTableStore.fetchWsTagsAsync()

      columnsStore.closeDrawer()

      // if url has 'variant' should be navigated to prev route
      const previousLocation = location.search.split('&variant')[0]

      history.push(`${Routes.WS + previousLocation}`)
      setVariantIndex()
    }

    return (
      <div className="px-4 pb-4 pt-1 bg-blue-dark">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              <ChangeVariantButton
                className="mr-2"
                direction="up"
                disabled={canGetPrevVariant}
                onClick={handlePrevVariant}
              />
              <ChangeVariantButton
                className="mr-3"
                direction="down"
                disabled={canGetNextVariant}
                onClick={handleNextVariant}
              />
            </div>
            <div className="text-blue-bright font-bold leading-18px">
              {`[${genes}] `}
              <span dangerouslySetInnerHTML={{ __html: currentLocus }} />
            </div>
            <DrawerTags />

            <DrawerNote />
          </div>

          <div className="flex items-center">
            <div className="flex text-grey-blue">
              <Icon
                name="Expand"
                size={24}
                className="cursor-pointer hover:text-blue-bright"
                onClick={() => {
                  const parents = document.querySelectorAll('#parent')

                  setLayout((prev: any[]) => {
                    const newLayout = prev.map((item: any, index: number) => ({
                      ...item,
                      h:
                        get(
                          parents[index].children[1].firstChild,
                          'clientHeight',
                          0,
                        ) *
                          0.0208 +
                        1.3,
                      y: index,
                    }))

                    window.sessionStorage.setItem(
                      'gridLayout',
                      JSON.stringify(newLayout),
                    )

                    return newLayout
                  })
                }}
              />

              <Icon
                name="Collapse"
                size={24}
                className="cursor-pointer hover:text-blue-bright ml-1 mr-5"
                onClick={() => {
                  setLayout((prev: any[]) => {
                    const newLayout = prev.map((item: any) => ({
                      ...item,
                      h: 1,
                    }))

                    window.sessionStorage.setItem(
                      'gridLayout',
                      JSON.stringify(newLayout),
                    )

                    return newLayout
                  })
                }}
              />
            </div>

            <Icon
              name="Close"
              className="cursor-pointer text-white hover:text-blue-bright"
              onClick={handleCloseDrawer}
            />
          </div>
        </div>
      </div>
    )
  },
)
