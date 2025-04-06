import styles from './content-code.module.css'

import { memo, ReactElement } from 'react'

import { Tooltip } from '@ui/tooltip'
import { DecisionTreesResultsDataCy } from '@data-testid'

interface IContentCodeProps {
  codeCondition: string
  codeResult: string
  errString: string | undefined
}

export const ContentCode = memo(
  ({
    codeCondition,
    codeResult,
    errString,
  }: IContentCodeProps): ReactElement => (
    <div className={styles.contentCode}>
      <Tooltip title={errString} placement="left-start">
        <div
          className={styles.contentCode__wrapper}
          style={errString ? { border: '3px solid red' } : {}}
          data-testid={DecisionTreesResultsDataCy.contentEditor}
        >
          <div dangerouslySetInnerHTML={{ __html: codeCondition }} />
          <div
            dangerouslySetInnerHTML={{ __html: codeResult }}
            className={styles.contentCode__result}
          />
        </div>
      </Tooltip>
    </div>
  ),
)
