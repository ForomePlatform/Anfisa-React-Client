import { ReactElement, useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import { LocalStoreManager } from '@core/storage-management'
import { t } from '@i18n'
import { CardTitle } from '@ui/card-main'
import { PREVIOUS_WORK_LOCATION } from '../../../build-flow/components/wizard/wizard.utils'
import { parseLocation } from './card-sections.utils'

export const CardPreviousExploreSection = (): ReactElement => {
  const [prevLocations, setPrevLocations] = useState<string[] | null>(null)
  const history = useHistory()

  useEffect(() => {
    const locations = LocalStoreManager.read<string[]>(PREVIOUS_WORK_LOCATION)

    if (locations) {
      setPrevLocations(locations)
    }
  }, [])

  const onClickLocation = (location: string) => {
    history.push(location)
  }

  const renderPrevLocations = () => {
    return prevLocations?.map(location => {
      return (
        <span
          key={location}
          className="text-blue-bright cursor-pointer"
          onClick={() => onClickLocation(location)}
        >
          {parseLocation(location)}
        </span>
      )
    })
  }

  return (
    <div className="w-1/2">
      <CardTitle text={t('home.startFlow.prevWorkWith')} className="text-16" />

      <div className="mt-1 text-14 text-grey-dark flex flex-col">
        {prevLocations
          ? renderPrevLocations()
          : t('home.startFlow.prevWorkSection')}
      </div>
    </div>
  )
}
