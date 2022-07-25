import styles from '@pages/main/components/selected-dataset/components/dataset-info/dataset-info.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { Row } from '../dataset-info.interfaces'

interface ITableRowsProps<T> {
  info: T | undefined
  rows: ReadonlyArray<Row<keyof T>> | Row<keyof T>[]
}

export const TableRows = <T,>({
  info,
  rows,
}: ITableRowsProps<T>): ReactElement | null => {
  if (!info) {
    return null
  }

  return (
    <>
      {rows.map(
        ({ field, fieldName, render, optional }: Row<keyof T>, i: number) => {
          const value = info[field]

          if (optional && (!value || (render && !render(value)))) {
            return null
          }

          return (
            <tr
              key={fieldName + i}
              className={cn(styles.datasetInfo__table_row)}
            >
              <td className={cn(styles.datasetInfo__table_row_title)}>
                {fieldName}
              </td>
              <td>{render ? render(value) : value}</td>
            </tr>
          )
        },
      )}
    </>
  )
}
