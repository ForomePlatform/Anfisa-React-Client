import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import changeDtreeProvider from '@utils/changeDtree/change-dtree.provider'

export const deleteAttribute = (): void => {
  const code = dtreeStore.dtreeCode ?? 'return False'

  const body = new URLSearchParams({
    ds: datasetStore.datasetName,
    code,
  })

  const { currentStepIndex } = dtreeStore

  const location = changeDtreeProvider.getLocationForChangeAttribute()
  const [indexForApi] = location

  const hasOneAttribute =
    dtreeStore.stepData[currentStepIndex].groups.length === 1
  const action = hasOneAttribute ? 'POINT' : 'ATOM'

  const currentLocation = hasOneAttribute ? indexForApi : location

  body.append('instr', JSON.stringify([action, 'DELETE', currentLocation]))

  dtreeStore.fetchDtreeSetAsync(body)
}
