import { ReactElement } from 'react'

import { TEnumCondition } from '@service-providers/common'
import { IConditionContentProps } from './condition-content.interface'

export const ConditionContentEnum = ({
  condition,
  isPreview = false,
}: IConditionContentProps<TEnumCondition>): ReactElement => {
  const conditionsList = condition[3]
  if (isPreview) {
    return <div>{conditionsList[0]}</div>
  }
  return (
    <div>
      {conditionsList.map(item => (
        <div key={item}>{item}</div>
      ))}
    </div>
  )
}
