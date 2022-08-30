import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { CompoundRequestScenario } from '@components/conditions/compound-request/components/compound-request-scenario'
import { IRequestConditionsProps } from '@components/conditions/compound-request/compound-request.interface'
import { TRequestCondition } from '@service-providers/common'

export const RequestConditions = observer(
  (props: IRequestConditionsProps): ReactElement => {
    const { spacing, isRedactorMode, activeRequestIndex } = props

    return (
      <div
        className={cn(
          'flex flex-col w-full text-14 mb-2 -mt-2 overflow-y-auto',
          spacing,
        )}
      >
        {props.requestCondition.map(
          (item: TRequestCondition, index: number) => {
            const isActive = activeRequestIndex === index

            const isActiveInRedactorMode = isRedactorMode && isActive

            return (
              <CompoundRequestScenario
                requestItem={item}
                key={index}
                requestIndex={index}
                className={cn(
                  isActive && '!border-blue-light bg-blue-tertiary',
                  isActiveInRedactorMode && '!border-blue-bright',
                )}
                {...props}
              />
            )
          },
        )}
      </div>
    )
  },
)
