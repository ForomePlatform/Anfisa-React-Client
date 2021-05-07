import get from 'lodash/get'
import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '../../ui/box'
import { Tag } from './tag'
import { CellI } from './variant-cell'

const Root = styled(Box)`
  padding-right: 56px;
  min-width: 75px;
`

export const TagsCell = ({ cell }: CellI): ReactElement => {
  const tags = get(cell, 'value', [])

  if (tags.length === 0) {
    return <Root>-</Root>
  }

  return (
    <Root>
      <Tag text={tags[0]} />
    </Root>
  )
}
