import { useEffect } from 'react'

import { SolutionTypesEnum } from '@core/enum/solution-types-enum'
import { pushQueryParams } from '@core/history'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import { useParams } from './use-params'

export const useSolution = (
  solutionType: SolutionTypesEnum,
  activeSolution: string,
) => {
  const params = useParams()
  const solutionName = params.get(solutionType) || ''

  useEffect(() => {
    if (solutionType === SolutionTypesEnum.Preset) {
      if (activeSolution && !solutionName) {
        pushQueryParams({ preset: activeSolution })
      }
    } else {
      if (activeSolution && !solutionName) {
        pushQueryParams({ dtree: activeSolution })
      }

      if (!activeSolution && !solutionName) {
        dtreeStore.fetchDtreeSetAsync({
          ds: datasetStore.datasetName,
          tm: '0',
          code: 'return False',
        })
      }
    }
  }, [activeSolution, solutionName, solutionType])
}
