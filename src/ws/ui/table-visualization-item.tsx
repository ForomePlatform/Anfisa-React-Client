import { noop } from 'lodash'
import { ReactElement } from 'react'
import styled from 'styled-components'

import { ANYType } from '../../..'
import { Box } from '../../ui/box'
import { RadioButton } from '../../ui/radio-button'
import { Text } from '../../ui/text'

interface Props {
  isChecked: boolean
  Icon: ANYType
  text: string
}

const Root = styled(Box)`
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledText = styled(Text)`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
  color: #595959;
  margin-top: 6px;
  margin-bottom: 12px;
`

export const TableVisualizationItem = ({
  isChecked,
  Icon,
  text,
}: Props): ReactElement => (
  <Root>
    <Icon />
    <StyledText>{text}</StyledText>
    <RadioButton isChecked={isChecked} onChange={noop} />
  </Root>
)
