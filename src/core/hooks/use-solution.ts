import { useEffect } from 'react'

import { SolutionTypesEnum } from '@core/enum/solution-types-enum'
import { pushQueryParams } from '@core/history'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import filterDtreesStore from '@store/filter-dtrees'
import { applyPreset } from '@pages/filter/refiner/components/solution-control-refiner/solution-control-refiner.utils'
import { useParams } from './use-params'

export const useSolution = (
  solutionType: SolutionTypesEnum,
  activeSolution: string,
) => {
  const params = useParams()
  const solutionName = params.get(solutionType) || ''

  useEffect(() => {
    activeSolution &&
      !solutionName &&
      pushQueryParams({ solutionType: activeSolution })

    if (solutionType === SolutionTypesEnum.Preset) {
      solutionName && applyPreset(solutionName)
    } else {
      solutionName && filterDtreesStore.setActiveDtree(solutionName)

      !activeSolution &&
        !solutionName &&
        dtreeStore.fetchDtreeSetAsync({
          ds: datasetStore.datasetName,
          tm: '0',
          code: 'return False',
        })
    }
  }, [activeSolution, solutionName, solutionType])
}
