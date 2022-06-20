import { TCustomizableListItem } from './customizable-list.interface'

export const toggleItem = (
  value: TCustomizableListItem[],
  name: string,
  isEnabled: boolean,
): TCustomizableListItem[] => {
  const index = value.findIndex(column => column.name === name)

  if (index > -1) {
    const newValue = value.slice()
    value[index] = {
      ...value[index],
      isHidden: !isEnabled,
    }

    return newValue
  }

  return value
}

export const reorderItems = (
  value: TCustomizableListItem[],
  srcIndex: number,
  dstIndex: number | undefined,
): TCustomizableListItem[] => {
  const newValue = value.slice()
  const [item] = newValue.splice(srcIndex, 1)

  if (typeof dstIndex === 'number' && dstIndex < newValue.length) {
    newValue.splice(dstIndex, 0, item)
  } else {
    newValue.push(item)
  }

  return newValue
}
