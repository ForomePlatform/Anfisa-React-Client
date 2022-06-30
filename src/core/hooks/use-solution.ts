import { useEffect } from 'react'

import { SolutionTypesEnum } from '@core/enum/solution-types-enum'
import { pushQueryParams } from '@core/history'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import { useParams } from './use-params'

interface IUseSolutionProps {
  solutionType: SolutionTypesEnum
  activeSolution: string
  onApply: (solutionName: string) => void
}

export const useSolution = ({
  solutionType,
  activeSolution,
  onApply,
}: IUseSolutionProps) => {
  const params = useParams()
  const solutionName = params.get(solutionType) || ''

  useEffect(() => {
    if (solutionName) {
      onApply(solutionName)
    }

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
  }, [activeSolution, onApply, solutionName, solutionType])
}
