import orderBy from 'lodash/orderBy'

import { ISolutionEntryDescription } from '@service-providers/common'

export const filterPresetsData = <T extends ISolutionEntryDescription>(
  presets: T[],
): T[] => {
  const orderedPresets = orderBy(presets, ['name'])

  const [standard, custom] = orderedPresets.reduce(
    (acc, preset) => {
      preset.standard ? acc[0].push(preset) : acc[1].push(preset)

      return acc
    },
    [[], []] as [T[], T[]],
  )
  return [...standard, ...custom]
}
