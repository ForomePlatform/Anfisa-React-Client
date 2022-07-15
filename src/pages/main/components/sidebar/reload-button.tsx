import styles from './datasets.module.css'

import React, { FC } from 'react'
import cn from 'classnames'

import dirinfo from '@store/dirinfo'
import { Icon } from '@ui/icon'
import { FilterDatasetDataCy } from '@components/data-testid/filter-dataset.cy'

export const ReloadButton: FC = () => (
  <button
    data-test-id={FilterDatasetDataCy.updateDatasets}
    onClick={() => dirinfo.dirinfo.invalidate()}
    className={cn(styles.datasets__header__button)}
  >
    <Icon name="Reload" />
  </button>
)
