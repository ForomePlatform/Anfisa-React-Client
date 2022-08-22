import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { CompoundRequestScenario } from '@components/conditions/compound-request/components/compound-request-scenario'
import { IRequestConditionsProps } from '@components/conditions/compound-request/compound-request.interface'
import { TRequestCondition } from '@service-providers/common'

export const RequestConditions = observer(
  (props: IRequestConditionsProps): ReactElement => (
    <div className="flex flex-col w-full text-14 mb-4 overflow-y-auto">
      {props.requestCondition.map((item: TRequestCondition, index: number) => (
        <CompoundRequestScenario
          requestItem={item}
          key={index}
          requestIndex={index}
          className={
            props.activeRequestIndex === index &&
            'border-blue-active bg-blue-medium'
          }
          {...props}
        />
      ))}
    </div>
  ),
)
