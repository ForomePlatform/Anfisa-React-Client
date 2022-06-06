import styles from './content-code.module.css'

import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'

interface IContentCodeProps {
  codeCondition: string
  codeResult: string
}

export const ContentCode = observer(
  ({ codeCondition, codeResult }: IContentCodeProps): ReactElement => {
    return (
      <div className={styles.contentCode}>
        <div
          className={styles['content-code_wrapper']}
          data-testid={DecisionTreesResultsDataCy.contentEditor}
        >
          <div dangerouslySetInnerHTML={{ __html: codeCondition }} />

          <div
            dangerouslySetInnerHTML={{ __html: codeResult }}
            className={styles['content-code_result']}
          />
        </div>
      </div>
    )
  },
)
