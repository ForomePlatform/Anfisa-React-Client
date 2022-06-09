import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { CompoundRequestScenario } from '@components/conditions/compound-request/components/compound-request-scenario'
import { IRequestConditionsProps } from '@components/conditions/compound-request/compound-request.interface'
import { TRequestCondition } from '@service-providers/common'

export const RequestConditions = observer(
  ({
    problemGroups,
    activeRequestIndex,
    requestCondition,
    onChangeScenario,
    handleRequestConditionNumber,
    handleActiveRequest,
  }: IRequestConditionsProps): ReactElement => {
    return (
      <div className="flex flex-col w-full text-14 mb-4">
        {requestCondition.map((item: TRequestCondition, index: number) => (
          <CompoundRequestScenario
            requestItem={item}
            requestCondition={requestCondition}
            key={index}
            requestIndex={index}
            problemGroups={problemGroups}
            onChangeScenario={onChangeScenario}
            handleActiveRequest={handleActiveRequest}
            handleRequestConditionNumber={handleRequestConditionNumber}
            className={activeRequestIndex === index && 'bg-blue-light'}
          />
        ))}
      </div>
    )
  },
)
