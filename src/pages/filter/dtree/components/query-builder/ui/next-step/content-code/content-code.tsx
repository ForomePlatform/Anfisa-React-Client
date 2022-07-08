import styles from './content-code.module.css'

import { memo, ReactElement } from 'react'

import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'

interface IContentCodeProps {
  codeCondition: string
  codeResult: string
}

export const ContentCode = memo(
  ({ codeCondition, codeResult }: IContentCodeProps): ReactElement => (
    <div className={styles.contentCode}>
      <div
        className={styles.contentCode__wrapper}
        data-testid={DecisionTreesResultsDataCy.contentEditor}
      >
        <div dangerouslySetInnerHTML={{ __html: codeCondition }} />

        <div
          dangerouslySetInnerHTML={{ __html: codeResult }}
          className={styles.contentCode__result}
        />
      </div>
    </div>
  ),
)
