import { useEffect } from 'react'

import dirInfoStore from '@store/dirinfo'
import { applyPreset } from '@pages/filter/refiner/components/solution-control-refiner/solution-control-refiner.utils'
import { useParams } from './use-params'

export const usePreset = () => {
  const params = useParams()
  const presetName = params.get('preset') || ''

  useEffect(() => {
    presetName && applyPreset(presetName)

    return () => {
      dirInfoStore.resetData()
    }
  }, [presetName])
}
