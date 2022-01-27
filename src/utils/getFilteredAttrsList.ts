import { StatList } from '@declarations'

export const getFilteredAttrsList = (data: StatList[]) => {
  const filteredAttrsList = data.map((item: any) => {
    if (item.kind === 'enum' && item.variants) {
      const filteredVariants = item.variants.filter((subItem: any) => subItem[1] > 0)

      item.variants = filteredVariants

      if (item.variants.length > 0) return item

      return
    }

    return item
  })

  return filteredAttrsList.filter((item: any) => item)
}
