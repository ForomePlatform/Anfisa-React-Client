import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '@ui/box'
import { Header } from '@ui/header'
import { Datasets } from './ui/datasets'
import { SelectedDataset } from './ui/selected-dataset'

const Root = styled(Box)``

const Container = styled(Box)`
  display: flex;
`

export const MainPage = (): ReactElement => {
  return (
    <Root>
      <Header />

      <Container>
        <Datasets />

        <SelectedDataset />
      </Container>
    </Root>
  )
}
