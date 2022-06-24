import { observer } from 'mobx-react-lite'

import { Checkbox } from '@ui/checkbox/checkbox'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'

interface IZoneListProps {
  zoneItems: string[]
  selectedItems: string[]
  onRemove: (itemName: string, type: string) => void
  onAdd: (itemName: string) => void
}

export const ZoneList = observer(
  ({ zoneItems, selectedItems, onAdd, onRemove }: IZoneListProps) => {
    const onCheck = (checked: boolean, itemName: string) => {
      checked ? onAdd(itemName) : onRemove(itemName, 'slow')
    }

    return (
      <div
        className="pt-4 overflow-y-auto flex flex-col"
        style={{ height: 'auto', maxHeight: 240 }}
      >
        {zoneItems.map((itemName, index) => (
          <Checkbox
            key={itemName + index}
            checked={selectedItems.includes(itemName)}
            onChange={e => onCheck(e.target.checked, itemName)}
            id={itemName + index}
            datatestId={MainTableDataCy.checkboxListElement}
            className="mb-3 text-12"
          >
            {itemName}
          </Checkbox>
        ))}
      </div>
    )
  },
)
