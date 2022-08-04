import { useEffect } from 'react'
import { useHistory } from 'react-router'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset/dataset'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { Card, CardTitle } from '@ui/card'
import { Icon } from '@ui/icon'
import { Loader } from '@ui/loader'
import { Tooltip } from '@ui/tooltip'
import { ICardProps } from '../../wizard/wizard.interface'
import wizardStore from '../../wizard/wizard.store'
import { memorizeLocation } from '../../wizard/wizard.utils'
import presetsCardStore from './presets-card.store'

export const PresetsCard = observer((props: ICardProps) => {
  const history = useHistory()
  const { title, id, selectedValue, maxHeight } = props

  useEffect(() => {
    presetsCardStore.loadSolutions()
  }, [])

  const onClickOpen = () => {
    if (!wizardStore.selectedPreset) return

    const { kind, name } = wizardStore.selectedPreset
    let location = ''

    if (kind === 'preset') {
      location = `${Routes.Refiner}?ds=${datasetStore.datasetName}&preset=${name}`
    } else if (kind === 'dtree') {
      location = `${Routes.Dtree}?ds=${datasetStore.datasetName}&dtree=${name}`
    }

    memorizeLocation(location)
    history.push(location)
  }

  const renderPresets = () => {
    return presetsCardStore
      .getSolutionsByRubric(wizardStore.whatsNextOption)
      .map(preset => {
        const isSelected = selectedValue === preset.name
        const isDisabled = !['ok', null].includes(preset['eval-status'])
        const getIconColor = () => {
          if (isDisabled) return 'text-grey-dark'
          if (isSelected) return 'text-white'
          return 'text-blue-bright'
        }

        return (
          <Tooltip
            theme="light"
            key={preset.name}
            title={isDisabled && t('home.buildFlow.notApplicableForXl')}
            placement="top-start"
          >
            <div
              onClick={() =>
                !isDisabled && wizardStore.setSelectedPreset(preset, id)
              }
            >
              <div
                className={cn(
                  'w-full flex items-center py-2 leading-5 cursor-pointer px-4',
                  isSelected
                    ? 'bg-blue-bright text-white'
                    : 'hover:bg-blue-light',
                  isDisabled && 'text-grey-dark',
                )}
              >
                <Icon name="File" className={cn(getIconColor())} />

                <div className="ml-1.5">{preset.name}</div>
              </div>
            </div>
          </Tooltip>
        )
      })
  }

  return (
    <Card
      isNeedToAnimate={wizardStore.isNeedToAnimateCard(id)}
      className="mt-4"
      style={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <CardTitle text={title} className="px-4" />

      <div
        className="mb-4 mt-2 text-14 overflow-y-auto"
        style={{ maxHeight: maxHeight }}
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
          disabled={!wizardStore.selectedPreset}
        />
      </div>
    </Card>
  )
})
