import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { CompoundRequestScenario } from '@components/conditions/compound-request/components/compound-request-scenario'
import { IRequestConditionsProps } from '@components/conditions/compound-request/compound-request.interface'
import { TRequestCondition } from '@service-providers/common'

export const RequestConditions = observer(
  (props: IRequestConditionsProps): ReactElement => (
    <div
      className={cn(
        'flex flex-col w-full text-14 mb-2 -mt-2 overflow-y-auto',
        props.spacing,
      )}
    >
      {props.requestCondition.map((item: TRequestCondition, index: number) => (
        <CompoundRequestScenario
          requestItem={item}
          key={index}
          requestIndex={index}
          className={
            props.activeRequestIndex === index &&
            '!border-blue-light bg-blue-tertiary'
          }
          {...props}
        />
      ))}
    </div>
  ),
)
