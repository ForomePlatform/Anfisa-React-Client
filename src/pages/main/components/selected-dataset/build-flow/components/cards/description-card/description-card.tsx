import styles from './description-card.module.css'

import { useEffect } from 'react'
import { useHistory } from 'react-router'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import {
  ExploreCandidateTypesDictionary,
  TExploreCandidateKeys,
} from '@core/enum/explore-candidate-types-enum'
import { TExploreGenomeKeys } from '@core/enum/explore-genome-types-enum'
import { datasetStore } from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { Card } from '@ui/card'
import { Icon } from '@ui/icon'
import { GlbPagesNames } from '@glb/glb-names'
import { optionsForOpenButton } from '../../wizard/wizard.data'
import { ICardProps } from '../../wizard/wizard.interface'
import wizardStore from '../../wizard/wizard.store'
import { getNextPageData, memorizeLocation } from '../../wizard/wizard.utils'
import { CardTitleWithEdit } from '../components/card-edit-title'
import { useRadioListData } from '../components/card-radio.hooks'
import { CardRadioList } from '../components/card-radio-list'
import descriptionCardStore from './description-card.store'

export const DescriptionCard = observer(
  (props: ICardProps<TExploreGenomeKeys>) => {
    const {
      title,
      id,
      selectedValue,
      continueDisabled,
      contentDisabled,
      editDisabled,
      position,
    } = props
    const history = useHistory()
    const ds = title || datasetStore.datasetName
    const {
      note,
      isEditMode,
      isTyping,
      datasetDescription,
      fieldDefaultValue,
      editIconName,
      setDsName,
      toggleEditMode,
      handleChange,
    } = descriptionCardStore

    const isOpenButton = optionsForOpenButton.includes(selectedValue)

    const openNextPage = () => {
      const nextPageData = getNextPageData(selectedValue, ds)

      memorizeLocation(nextPageData.route)
      history.push(nextPageData.route)
      filterStore.setMethod(nextPageData.method as GlbPagesNames)
    }

    useEffect(() => {
      wizardStore.updateSelectedDataset(ds)
      setDsName(ds)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, ds])

    const radioListData = useRadioListData<TExploreCandidateKeys>(
      ExploreCandidateTypesDictionary,
    )

    return (
      <Card
        isNeedToAnimate={wizardStore.isNeedToAnimateCard(id)}
        className={cn(styles.descriptionCard)}
        position={position}
      >
        <CardTitleWithEdit
          title={ds}
          isEditShown={!editDisabled}
          onEdit={() => wizardStore.editCard(id)}
        />

        <div className="mb-4">
          <Card className="w-full mt-4 bg-grey-tertiary" position="stretch">
            <div className="flex items-center mb-2">
              <span className="font-bold">Description</span>
              <Button
                variant="secondary"
                size="xs"
                className={cn('cursor-pointer', 'mx-2')}
                icon={<Icon name={editIconName} className="text-blue-bright" />}
                loaderColor="default"
                isLoading={isTyping}
                disabled={isTyping}
                onClick={toggleEditMode}
              />
            </div>
            {isEditMode ? (
              <textarea
                className={cn(styles.descriptionCard__field, 'text-12')}
                autoFocus
                defaultValue={fieldDefaultValue}
                onChange={e => {
                  handleChange(e.target.value)
                }}
              />
            ) : (
              <div
                className={cn(
                  styles.descriptionCard__text,
                  !note && styles.descriptionCard__text_empty,
                  'text-12 overflow-y-auto',
                )}
              >
                {datasetDescription}
              </div>
            )}
          </Card>
        </div>

        <div className="mt-2 text-14">
          <CardRadioList<TExploreCandidateKeys>
            data={radioListData}
            selectedOption={isTyping ? '' : selectedValue}
            onChange={option => wizardStore.setDescriptionOption(option, id)}
            isOptionsDisabled={isTyping || contentDisabled}
          />

          {editDisabled && (
            <div className="flex justify-end">
              <Button
                text={isOpenButton ? 'Open' : 'Continue'}
                onClick={
                  isOpenButton
                    ? openNextPage
                    : () => wizardStore.finishEditCard(id)
                }
                disabled={continueDisabled || isTyping}
              />
            </div>
          )}
        </div>
      </Card>
    )
  },
)
