import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { theme } from '@theme'
import datasetStore from '@store/dataset'
import variantStore from '@store/variant'
import columnsStore from '@store/wsColumns'
import { Loader } from '@components/loader'
import { variantColumnTable } from '../columns'
import { Table } from './table/table'

const Styles = styled.div`
  overflow-x: auto;
  overflow-y: hidden;

  .table {
    border-spacing: 0;
    border-collapse: collapse;
    min-width: 100%;

    .thead {
      .th {
        padding: 12px 16px;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 14px;
      }
    }

    .tbody {
      .td > div {
        cursor: text;
      }
    }

    .tr {
      border-bottom: 1px;
      border-style: solid;
      border-color: ${theme('colors.grey.light')};
    }
  }
`

export const TableVariants = observer((): ReactElement => {
  const defaultColumns = columnsStore.selectedColumns.map(column =>
    variantColumnTable.find(item => item.Header === column),
  )

  const collapsedColumns = defaultColumns.slice(0, 2)

  const { drawerVisible } = variantStore

  const columns = drawerVisible ? collapsedColumns : defaultColumns

  if (datasetStore.isLoadingTabReport) return <Loader />

  return (
    <Styles className="flex-1 overflow-auto">
      <Table columns={columns} data={datasetStore.tabReport} />
    </Styles>
  )
})
