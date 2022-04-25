import { observer } from 'mobx-react-lite'

import zoneStore from '@store/filterZone'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'
import { StyledCheckboxContainer } from '@components/styled-checkbox-container'

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
      <div
        className="mt-5 overflow-y-auto"
        style={{ height: 'auto', maxHeight: 240 }}
      >
        {items.map((itemName, index) => (
          <div key={itemName} className="flex items-center mb-4">
            {isGenes && (
              <StyledCheckboxContainer
                checked={zoneStore.localGenes.includes(itemName)}
                className="w-4 h-4"
                onChange={e => handleCheck(e.target.checked, itemName)}
                id={index}
                label={itemName}
                datatestId={MainTableDataCy.checkboxListElement}
              />
            )}
            {isGenesList && (
              <StyledCheckboxContainer
                checked={zoneStore.localGenesList.includes(itemName)}
                className="w-4 h-4"
                onChange={e => handleCheck(e.target.checked, itemName)}
                id={index}
                label={itemName}
                datatestId={MainTableDataCy.checkboxListElement}
              />
            )}
            {isSamples && (
              <StyledCheckboxContainer
                checked={zoneStore.localSamples.includes(itemName)}
                className="w-4 h-4"
                onChange={e => handleCheck(e.target.checked, itemName)}
                id={index}
                label={itemName}
                datatestId={MainTableDataCy.checkboxListElement}
              />
            )}
            {isTags && (
              <StyledCheckboxContainer
                checked={zoneStore.localTags.includes(itemName)}
                className="w-4 h-4"
                onChange={e => handleCheck(e.target.checked, itemName)}
                id={index}
                label={itemName}
                datatestId={MainTableDataCy.checkboxListElement}
              />
            )}
          </div>
        ))}
      </div>
    )
  },
)
