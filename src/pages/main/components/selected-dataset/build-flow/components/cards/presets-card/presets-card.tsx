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

export const PresetsCard = observer(
  ({ title, id, maxHeight, position }: ICardProps) => {
    const history = useHistory()

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
      const presets = presetsCardStore.getSolutionsByRubric(
        wizardStore.whatsNextOption,
      )

      const names = presets.reduce((acc, preset) => {
        const value = acc.get(preset.name) || 0
        acc.set(preset.name, value + 1)
        return acc
      }, new Map<string, number>())

      return presets.map(preset => {
        const selectedPreset = wizardStore.selectedPreset
        const isSelected =
          selectedPreset?.name === preset.name &&
          selectedPreset?.kind === preset.kind
        const isDisabled = !['ok', null].includes(preset['eval-status'])
        const getIconColor = () => {
          if (isDisabled) return 'text-grey-dark'
          if (isSelected) return 'text-white'
          return 'text-blue-bright'
        }
        const countWithSameNames = names.get(preset.name) || 0
        const showingName =
          countWithSameNames > 1
            ? t('home.buildFlow.presetNameWithKind', {
                name: preset.name,
                kind: preset.kind,
              })
            : preset.name

        return (
          <Tooltip
            theme="light"
            key={preset.name + preset.kind}
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
                  'w-full flex items-center py-2 px-4 leading-5 cursor-pointer',
                  isSelected
                    ? 'bg-blue-bright text-white'
                    : 'hover:bg-blue-light',
                  isDisabled && 'text-grey-dark',
                )}
              >
                <Icon name="File" className={cn(getIconColor())} />

                <div className="ml-1.5">{showingName}</div>
              </div>
            </div>
          </Tooltip>
        )
      })
    }

    return (
      <Card
        isNeedToAnimate={wizardStore.isNeedToAnimateCard(id)}
        className="!px-0"
        position={position}
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
  },
)
