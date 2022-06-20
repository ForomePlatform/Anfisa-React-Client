import { columnDefs } from '@pages/ws/ui/variants'

export const popoverOffset: [number, number] = [0, 10]

export const availableOptionalColumns = columnDefs
  .filter(column => !column.isRequired)
  .map(({ name, title }) => ({
    name,
    title,
  }))
