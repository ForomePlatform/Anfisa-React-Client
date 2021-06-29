import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { theme } from '@theme'
import datasetStore from '@store/dataset'
import columnsStore from '@store/wsColumns'
import { Loader } from '@ui/loader'
import { NoResultsFound } from '@ui/no-results-found'
import { variantColumnTable } from '../columns'
import { Table } from './table'

const Styles = styled.div`
  overflow-x: auto;
  overflow-y: hidden;

  & * {
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .table {
    border-spacing: 0;
    border-collapse: collapse;
    min-width: 100%;

    .thead {
      .tr {
        border-color: ${theme('colors.grey.light')};

        .th {
          padding: 12px 16px;
          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          line-height: 14px;
        }
      }
    }

    .tbody {
      .tr {
        border-top: 1px;
        border-bottom: 1px;
        border-style: solid;
        border-color: ${theme('colors.grey.light')};
      }
    }
  }
`

export const TableVariants = observer(
  (): ReactElement => {
    const columns = columnsStore.selectedColumns.map(column =>
      variantColumnTable.find(item => item.Header === column),
    )

    if (datasetStore.isLoadingTabReport) return <Loader />

    return (
      <Styles className="flex-1 min-w-max">
        <Table columns={columns} data={datasetStore.tabReport} />

        {datasetStore.tabReport.length === 0 && <NoResultsFound />}
      </Styles>
    )
  },
)
