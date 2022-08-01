import { useHistory } from 'react-router'

import { ExploreGenomeTypes } from '@core/enum/explore-genome-types-enum'
import { datasetStore } from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { Card } from '@ui/card'
import { GlbPagesNames } from '@glb/glb-names'
import {
  optionsForOpenButton,
  whatsNextOptionsList,
} from '../wizard/wizard.data'
import { ICardProps } from '../wizard/wizard.interface'
import wizardStore from '../wizard/wizard.store'
import { getNextPageData, memorizeLocation } from '../wizard/wizard.utils'
import { CardTitleWithEdit } from './components/card-edit-title'
import { CardRadioList } from './components/card-radio-list'

export const WhatsNextCard = (props: ICardProps) => {
  const history = useHistory()
  const {
    title,
    id,
    selectedValue,
    contentDisabled,
    continueDisabled,
    editDisabled,
    position,
  } = props

  const openNextPage = () => {
    const nextPageData = getNextPageData(
      selectedValue as ExploreGenomeTypes,
      datasetStore.datasetName,
    )

    memorizeLocation(nextPageData.route)
    history.push(nextPageData.route)
    filterStore.setMethod(nextPageData.method as GlbPagesNames)
  }

  return (
    <Card
      isNeedToAnimate={wizardStore.isNeedToAnimateCard(id)}
      className="mt-4"
      position={position}
    >
      <>
        <CardTitleWithEdit
          title={title}
          isEditShown={!editDisabled}
          onEdit={() => wizardStore.editCard(id)}
        />

        <div className="mt-4 text-14">
          <CardRadioList
            optionsList={whatsNextOptionsList}
            selectedOption={selectedValue}
            onChange={option => wizardStore.setWhatsNextOption(option, id)}
            isOptionsDisabled={contentDisabled}
          />

          {editDisabled && (
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
          )}
        </div>
      </>
    </Card>
  )
}
