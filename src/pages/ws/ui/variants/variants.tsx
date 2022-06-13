import styles from './variants.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import mainTableStore from '@store/ws/main-table.store'
import { Loader } from '@components/loader'
import { VariantsTable } from './variants-table'

interface IVariantsProps {
  className?: string
}

export const Variants = observer(
  ({ className }: IVariantsProps): ReactElement => {
    const isLoading =
      !mainTableStore.tabReport.firstPage?.data ||
      mainTableStore.tabReport.firstPage?.isLoading

    return (
      <div className={cn(styles.variants, className)}>
        {isLoading ? <Loader /> : <VariantsTable />}
      </div>
    )
  },
)
