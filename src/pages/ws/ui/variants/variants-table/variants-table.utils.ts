import { ITableLayout, IVariantsTableColumn } from './components'

export const calculateTableLayout = (
  columns: IVariantsTableColumn[],
  containerWidth: number | undefined,
  withSticky?: boolean,
): ITableLayout | undefined => {
  if (!containerWidth || !columns.length) {
    return undefined
  }

  const origWidth = columns.reduce((acc, column) => acc + column.width, 0)
  let grow = columns.map(column => column.grow ?? 1)
  const maxGrow = grow.reduce((acc, value) => (value > acc ? value : acc))
  grow = grow.map(value => value / maxGrow)

  const tableWidth = Math.max(origWidth, containerWidth)
  const k = (tableWidth - origWidth) / grow.reduce((acc, value) => acc + value)
  const cellWidths = columns.map(({ width }, index) =>
    Math.floor(width + k * grow[index]),
  )

  let stickyAcc = 0
  const needSticky = withSticky && tableWidth > containerWidth

  return {
    width: tableWidth,
    cellWidths,
    stickyPos: needSticky
      ? columns.map(({ isSticky }, index) => {
          const pos = isSticky ? stickyAcc : false
          stickyAcc += isSticky ? cellWidths[index] : 0

          return pos
        })
      : [],
  }
}
