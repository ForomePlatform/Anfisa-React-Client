import { useEffect } from 'react'
import { useHistory } from 'react-router'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'

import {
  ExploreGenomeTypesDictionary,
  TExploreGenomeKeys,
} from '@core/enum/explore-genome-types-enum'
import { datasetStore } from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { Card } from '@ui/card'
import { GlbPagesNames } from '@glb/glb-names'
import { optionsForOpenButton } from '../wizard/wizard.data'
import { ICardProps } from '../wizard/wizard.interface'
import wizardStore from '../wizard/wizard.store'
import { getNextPageData, memorizeLocation } from '../wizard/wizard.utils'
import { CardTitleWithEdit } from './components/card-edit-title'
import { useRadioListData } from './components/card-radio.hooks'
import { CardRadioList } from './components/card-radio-list'

export const WhatsNextCard = observer((props: ICardProps) => {
  const history = useHistory()
  const {
    title,
    id,
    selectedValue,
    contentDisabled,
    continueDisabled,
    editDisabled,
  } = props

  const openNextPage = () => {
    const nextPageData = getNextPageData(
      selectedValue as TExploreGenomeKeys,
      datasetStore.datasetName,
    )

    memorizeLocation(nextPageData.route)
    history.push(nextPageData.route)
    filterStore.setMethod(nextPageData.method as GlbPagesNames)
  }

  const radioListData = useRadioListData<TExploreGenomeKeys>(
    ExploreGenomeTypesDictionary,
  )

  useEffect(() => {
    runInAction(() => {
      wizardStore.whatsNextOption = selectedValue as TExploreGenomeKeys
    })

    return () =>
      runInAction(() => {
        wizardStore.whatsNextOption = undefined
      })
  }, [selectedValue])

  return (
    <Card
      isNeedToAnimate={wizardStore.isNeedToAnimateCard(id)}
      className="mt-4"
    >
      <>
        <CardTitleWithEdit
          title={title}
          isEditDisabled={editDisabled}
          onEdit={() => wizardStore.editCard(id)}
        />

        <div className="mt-4 text-14">
          <CardRadioList<TExploreGenomeKeys>
            data={radioListData}
            selectedOption={selectedValue}
            onChange={value => wizardStore.setWhatsNextOption(value, id)}
            isOptionsDisabled={contentDisabled}
          />

          <div className="flex justify-end">
            {optionsForOpenButton.includes(selectedValue) ? (
              <Button
                text="Open"
                onClick={openNextPage}
                disabled={continueDisabled}
              />
            ) : (
              <Button
                text="Continue"
                onClick={() => wizardStore.finishEditCard(id)}
                disabled={continueDisabled}
              />
            )}
          </div>
        </div>
      </>
    </Card>
  )
})
