import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import zoneStore from '@store/filterZone'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'

interface IZoneModalListProps {
  items: string[]
  isGenes?: boolean
  isGenesList?: boolean
  isSamples?: boolean
  isTags?: boolean
}

export const ZoneModalList = observer(
  ({ items, isGenes, isGenesList, isSamples, isTags }: IZoneModalListProps) => {
    const handleCheck = (checked: boolean, name: string) => {
      if (checked) {
        isGenes && zoneStore.addGene(name)
        isGenesList && zoneStore.addGenesList(name)
        isSamples && zoneStore.addSample(name)
        isTags && zoneStore.addLocalTag(name)
      } else {
        isGenes && zoneStore.removeGene(name, 'slow')
        isGenesList && zoneStore.removeGenesList(name, 'slow')
        isSamples && zoneStore.removeSample(name, 'slow')
        isTags && zoneStore.removeLocalTag(name, 'slow')
      }
    }

    return (
      <div className="mt-5 h-60 overflow-y-scroll">
        {items.map(item => (
          <div key={item} className="flex items-center mb-4">
            {isGenes && (
              <Checkbox
                checked={zoneStore.localGenes.includes(item)}
                className="w-4 h-4"
                onChange={e => handleCheck(e.target.checked, item)}
              />
            )}
            {isGenesList && (
              <Checkbox
                checked={zoneStore.localGenesList.includes(item)}
                className="w-4 h-4"
                onChange={e => handleCheck(e.target.checked, item)}
              />
            )}
            {isSamples && (
              <Checkbox
                checked={zoneStore.localSamples.includes(item)}
                className="w-4 h-4"
                onChange={e => handleCheck(e.target.checked, item)}
              />
            )}
            {isTags && (
              <Checkbox
                checked={zoneStore.localTags.includes(item)}
                className="w-4 h-4"
                onChange={e => handleCheck(e.target.checked, item)}
              />
            )}

            <span
              className="text-12 ml-1"
              data-testid={MainTableDataCy.checkboxListElement}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    )
  },
)
