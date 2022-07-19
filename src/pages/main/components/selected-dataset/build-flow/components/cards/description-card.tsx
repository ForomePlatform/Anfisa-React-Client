import { useEffect } from 'react'
import { useHistory } from 'react-router'

import { ExploreGenomeTypes } from '@core/enum/explore-genome-types-enum'
import { datasetStore } from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { Card } from '@ui/card-main'
import { GlbPagesNames } from '@glb/glb-names'
import {
  exploreCandidateOptionsList,
  optionsForOpenButton,
} from '../wizard/wizard.data'
import { ICardProps } from '../wizard/wizard.interface'
import wizardStore from '../wizard/wizard.store'
import { getNextPageData, memorizeLocation } from '../wizard/wizard.utils'
import { CardTitleWithEdit } from './components/card-edit-title'
import { CardRadioList } from './components/card-radio-list'

export const DescriptionCard = (props: ICardProps) => {
  const {
    title,
    id,
    selectedValue,
    continueDisabled,
    contentDisabled,
    editDisabled,
  } = props
  const history = useHistory()
  const ds = title || datasetStore.datasetName

  const openNextPage = () => {
    datasetStore.setDatasetName(ds)
    const nextPageData = getNextPageData(
      selectedValue as ExploreGenomeTypes,
      ds,
    )

    memorizeLocation(nextPageData.route)
    history.push(nextPageData.route)
    filterStore.setMethod(nextPageData.method as GlbPagesNames)
  }

  useEffect(() => {
    wizardStore.wizardScenario[id].title = ds
    wizardStore.updateSelectedDataset(ds)
  }, [id, ds])

  return (
    <Card className="mt-4">
      <CardTitleWithEdit
        title={ds}
        isEditDisabled={editDisabled}
        onEdit={() => wizardStore.editCard(id)}
      />

      <div className="mb-4">
        <Card className="w-full mt-4 bg-grey-tertiary">
          <div className="font-bold mb-2">Description</div>

          <div
            className="text-12 overflow-y-auto"
            style={{ maxHeight: '14vh' }}
          ></div>
        </Card>
      </div>

      <div className="mt-2 text-14">
        <CardRadioList
          optionsList={exploreCandidateOptionsList}
          selectedOption={selectedValue}
          onChange={option => wizardStore.setDescriptionOption(option, id)}
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
    </Card>
  )
}
