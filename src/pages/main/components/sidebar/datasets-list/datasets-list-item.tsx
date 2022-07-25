import { FC, useState } from 'react'
import cn from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { datasetStore } from '@store/dataset'
import dirinfoStore, { BASE_INFO_NAME } from '@store/dirinfo'
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

      if (datasetStore.datasetName === item.name) {
        return
      }

      const kind = dirinfoStore.xlDatasets.includes(item.name) ? 'xl' : 'ws'

      if (wizardStore.isWizardVisible && kind === 'xl') {
        wizardStore.toggleIsWizardVisible(false)
        wizardStore.resetWizard()
        wizardStore.actionHistory.resetHistory()
      } else {
        if (wizardStore.actionHistory.historyIndex !== -1) {
          wizardStore.actionHistory.resetHistory()
        }
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

      const dsName = isNullKind ? '' : item.name
      datasetStore.setDatasetName(dsName)
      dirinfoStore.setSelectedDirinfoName(dsName)

      wizardStore.setDatasetKind(kind)

      dirinfoStore.setInfoFrameLink('')
      dirinfoStore.setActiveInfoName(BASE_INFO_NAME)
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
