import { useEffect } from 'react'
import { useHistory } from 'react-router'

import datasetStore from '@store/dataset/dataset'
import { Routes } from '@router/routes.enum'
import { useParams } from './use-params'
export const useDatasetName = () => {
  const params = useParams()
  const history = useHistory()

  useEffect(() => {
    const dsName = params.get('ds')

    if (!datasetStore.datasetName || datasetStore.datasetName !== dsName) {
      if (!dsName) {
        history.push(Routes.Root)

        return
      }

      datasetStore.setDatasetName(dsName)
    }
  }, [params, history])
}
