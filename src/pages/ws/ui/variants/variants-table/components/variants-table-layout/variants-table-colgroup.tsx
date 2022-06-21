import React from 'react'

import { IVariantsTableLayoutProps } from './variants-table-layout.interface'

export const VariantsTableColgroup = React.memo(
  ({ columns, layout }: IVariantsTableLayoutProps) => {
    return (
      <colgroup>
        {columns.map(({ name }, index) => (
          <col
            key={name}
            style={{
              width: `${layout.cellWidths[index]}px`,
            }}
          />
        ))}
      </colgroup>
    )
  },
)

VariantsTableColgroup.displayName = 'VariantsTableColgroup'
