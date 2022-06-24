import { CSSProperties, ReactElement } from 'react'
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from 'react-beautiful-dnd'

import { MainTableDataCy } from '@components/data-testid/main-table.cy'
import { CustomizableListItem } from './components'
import { TCustomizableListItem } from './customizable-list.interface'
import { reorderItems, toggleItem } from './customizable-list.utils'

const getItemStyle = (
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
): CSSProperties => ({
  userSelect: 'none',
  ...draggableStyle,
  left: '0px !important',
  top:
    draggableStyle && 'top' in draggableStyle ? draggableStyle.top - 130 : 600,
})

interface IColumnsListProps {
  value: TCustomizableListItem[]
  onChange: (value: TCustomizableListItem[]) => void
}

export const CustomizableList = ({
  value,
  onChange,
}: IColumnsListProps): ReactElement => {
  const handleDragEnd = (result: DropResult) => {
    onChange(
      reorderItems(value, result.source.index, result.destination?.index),
    )
  }

  return (
    <div className="mt-3">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {value.map(({ name, title, isHidden }, index) => (
                <Draggable key={name} draggableId={name} index={index}>
                  {providedDraggable => (
                    <div
                      ref={providedDraggable.innerRef}
                      {...providedDraggable.draggableProps}
                      {...providedDraggable.dragHandleProps}
                      style={getItemStyle(
                        providedDraggable.draggableProps.style,
                      )}
                      data-testid={MainTableDataCy.customizeTableList}
                    >
                      <CustomizableListItem
                        title={title}
                        isChecked={!isHidden}
                        onClickSwitch={checked =>
                          toggleItem(value, name, checked)
                        }
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
