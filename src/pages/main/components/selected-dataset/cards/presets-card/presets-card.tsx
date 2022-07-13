import { useEffect } from 'react'
import { useHistory } from 'react-router'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import datasetStore from '@store/dataset/dataset'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { Card, CardTitle } from '@ui/card'
import { Icon } from '@ui/icon'
import { Loader } from '@ui/loader'
import cardsStore, { ICardProps } from '../../selected-dataset-cards.store'
import presetsCardStore from './presets-card.store'

export const RelevantPresetsCard = observer((props: ICardProps) => {
  const history = useHistory()
  useEffect(() => {
    presetsCardStore.loadSolutions()
  }, [])

  const onClickOpen = () => {
    if (!cardsStore.selectedPreset) return

    const { kind, name } = cardsStore.selectedPreset

    if (kind === 'preset') {
      history.push(
        `${Routes.Refiner}?ds=${datasetStore.datasetName}&preset=${name}`,
      )
    } else if (kind === 'dtree') {
      history.push(
        `${Routes.Dtree}?ds=${datasetStore.datasetName}&dtree=${name}`,
      )
    }
  }

  const renderPresets = () => {
    return presetsCardStore.solutions.map(preset => {
      const isSelected = props.selectedValue === preset.name

      return (
        <div
          key={preset.name}
          onClick={() => cardsStore.setSelectedPreset(preset, 2)}
        >
          <div
            className={cn(
              'w-full flex items-center py-2 leading-5 cursor-pointer px-4',
              isSelected ? 'bg-blue-bright text-white' : 'hover:bg-blue-light',
            )}
          >
            <Icon
              name="File"
              className={cn(isSelected ? 'text-white' : 'text-blue-bright')}
            />

            <div className="ml-1.5">{preset.name}</div>
          </div>
        </div>
      )
    })
  }

  return (
    <Card className={'mt-4'}>
      <CardTitle text={'Relevant presets'} className="text-16 px-4" />

      <div
        className="mb-4 text-14 overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 285px)' }}
      >
        {presetsCardStore.isFetchingSolutions ? (
          <Loader size="m" />
        ) : (
          renderPresets()
        )}
      </div>

      <div className="flex justify-end px-4">
        <Button
          onClick={onClickOpen}
          text="Open"
          disabled={!cardsStore.selectedPreset}
        />
      </div>
    </Card>
  )
})
