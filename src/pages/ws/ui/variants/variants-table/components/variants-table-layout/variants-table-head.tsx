import styles from './variants-table-layout.module.css'

import React from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { IVariantsTableLayoutProps } from './variants-table-layout.interface'

export const VariantsTableHead = React.memo(
  ({ columns, layout }: IVariantsTableLayoutProps) => {
    return (
      <thead className={styles.table__head}>
        <tr>
          {columns.map(({ name, title }, index) => {
            const isSticky = typeof layout.stickyPos[index] === 'number'

            return (
              <th
                key={name}
                className={cn(
                  styles.table__th,
                  isSticky && styles.table__th_sticky,
                )}
                style={
                  isSticky
                    ? { left: `${layout?.stickyPos[index]}px` }
                    : undefined
                }
              >
                {t(title)}
              </th>
            )
          })}
        </tr>
      </thead>
    )
  },
)

VariantsTableHead.displayName = 'VariantsTableHead'
