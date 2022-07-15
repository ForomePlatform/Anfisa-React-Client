import { FC, useState } from 'react'
import { useHistory } from 'react-router'
import cn from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { pushQueryParams } from '@core/history'
import { LocalStoreManager } from '@core/storage-management'
import dirinfoStore from '@store/dirinfo'
import { Routes } from '@router/routes.enum'
import { DatasetName } from '@pages/main/components/sidebar/datasets-list/components/dataset-name'
import { DatasetTime } from '@pages/main/components/sidebar/datasets-list/components/dataset-time'
import {
  DEFAULT_DATASET_P,
  LEVEL_DATASET_P,
} from '@pages/main/components/sidebar/datasets-list/datasets-list.constants'
import { datasetNameByKey } from '@pages/main/components/sidebar/datasets-list/datasets-list.utils'
import { IDirInfoDatasetDescriptor } from '@service-providers/vault-level/vault-level.interface'
import wizardStore from '../../selected-dataset/build-flow/components/wizard/wizard.store'
import { DatasetType } from './components/dataset-type'

interface IDatasetsListItemProps {
  item: IDirInfoDatasetDescriptor
  level: number
}

export const DatasetsListItem: FC<IDatasetsListItemProps> = observer(
  ({ item, level }) => {
    const history = useHistory()

    const isActive = item.name === dirinfoStore.selectedDirinfoName

    const [isOpenFolder, setIsOpenFolder] = useState<boolean>(
      !dirinfoStore.isFoldedDs(item.name),
    )

    const isNullKind = item.kind === null
    const secondaryKeys: string[] = get(item, 'secondary', [])
    const hasChildren = secondaryKeys.length > 0

    wizardStore.observeHistory.useHook()

    const isActiveParent =
      hasChildren && secondaryKeys.includes(dirinfoStore.selectedDirinfoName)

    const handleClick = () => {
      if (level > 0) return

      if (isNullKind && !hasChildren) return

      if (wizardStore.isWizardVisible) {
        wizardStore.toggleIsWizardVisible(false)
        wizardStore.resetScenario()
        wizardStore.actionHistory.resetHistory()
      }

      if (hasChildren) {
        setIsOpenFolder(opened => {
          if (!(opened && isActive)) {
            dirinfoStore.unfoldDs(item.name)
          } else {
            dirinfoStore.foldDs(item.name)
          }

          return !(opened && isActive)
        })
        dirinfoStore.setDsInfo(item as IDirInfoDatasetDescriptor)
      }

      // LocalStoreManager.write('wizard', {
      //   isXL: dirinfoStore.xlDatasets.includes(item.name),
      //   hasSecondaryDs: false,
      // })

      history.replace(`${Routes.Root}?ds=${isNullKind ? '' : item.name}`)

      const kind = dirinfoStore.xlDatasets.includes(item.name) ? 'xl' : 'ws'
      const secondary = 'false'

      wizardStore.setDatasetKind(kind)

      pushQueryParams({ kind, secondary })

      dirinfoStore.setInfoFrameLink('')
      dirinfoStore.setActiveInfoName('')
    }

    const padding = DEFAULT_DATASET_P + level * LEVEL_DATASET_P

    return (
      <>
        <div
          key={item.name}
          onClick={handleClick}
          className={cn('flex items-center relative w-full pr-4 py-2', {
            'cursor-pointer': hasChildren || !isNullKind,
            'bg-blue-bright hover:bg-blue-hover': isActive,
            'hover:bg-blue-darkHover': !isActive,
            'cursor-not-allowed': level > 0,
          })}
          style={{ paddingLeft: `${padding}px` }}
        >
          <DatasetType
            hasChildren={hasChildren}
            isActive={isActive || isActiveParent}
          />
          <DatasetName
            dsName={item.name}
            kind={item.kind}
            isActive={isActive}
            isActiveParent={isActiveParent}
          />
          <DatasetTime time={item['create-time']} isActive={isActive} />
        </div>

        {isOpenFolder &&
          hasChildren &&
          secondaryKeys.map(datasetNameByKey(level + 1))}
      </>
    )
  },
)
