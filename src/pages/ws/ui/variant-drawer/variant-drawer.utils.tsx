import { TAspectDescriptor } from '@service-providers/dataset-level'

export const getFoundedValuesNumber = (
  value: string,
  aspects: TAspectDescriptor[],
) => {
  let acc = 0

  if (value.trim()) {
    aspects.forEach(aspect => {
      if (aspect.rows) {
        aspect.rows.forEach(row => {
          if (
            row &&
            row.title.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())
          ) {
            acc++
          }
        })
      }
    })
  }

  return acc
}
