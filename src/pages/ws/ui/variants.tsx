// TODO looks like unnecessary file
import { ReactElement } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { t } from '@i18n'
import { theme } from '@theme'
import datasetStore from '@store/dataset'
import { Box } from '@ui/box'
import { Text } from '@ui/text'

const Root = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e3e5e6;
`

const VariantsStyled = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${theme('colors.grey.0')};
  margin-block-start: 1em;
  margin-block-end: 1em;
`

const AmountVariants = styled(VariantsStyled)`
  color: ${theme('colors.black')};
  margin-left: 8px;
`

export const Variants = observer(
  (): ReactElement => (
    <Root>
      <VariantsStyled>{t('ds.variants')}</VariantsStyled>
      <AmountVariants>
        {datasetStore.isLoadingDsStat
          ? 'Loading'
          : get(datasetStore, 'dsStat.total-counts.0', 0)}
      </AmountVariants>
    </Root>
  ),
)
