import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'
import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'
import { Loader } from '@ui/loader'
import { AttributeKinds } from '@service-providers/common'
import { EmptySelectedGroup } from './empty-selected-group'
import { EnumPanel } from './panels/enum-panel'
import { FunctionPanel } from './panels/function-panel'
import { NumericPanel } from './panels/numeric-panel'

interface ISelectedGroupProps {
  className?: Argument
}

export const SelectedGroup = observer(
  ({ className }: ISelectedGroupProps): ReactElement => {
    const { selectedAttributeStatus } = filterStore

    if (!selectedAttributeStatus || selectedAttributeStatus.incomplete) {
      return (
        <EmptySelectedGroup
          content={
            selectedAttributeStatus?.incomplete ? (
              <Loader size="l" />
            ) : undefined
          }
          className={className}
        />
      )
    }

    const { isRedactorMode, selectedConditionIndex } = filterStore
    const panelKey = `${selectedAttributeStatus.name}_${selectedConditionIndex}`

    return (
      <div
        className={cn(
          'flex flex-col p-4 overflow-y-auto',
          isRedactorMode && 'bg-blue-tertiary',
          className,
        )}
      >
        {selectedAttributeStatus.kind === AttributeKinds.ENUM && (
          <EnumPanel key={panelKey} />
        )}

        {selectedAttributeStatus.kind === AttributeKinds.FUNC && (
          <FunctionPanel key={panelKey} />
        )}

        {selectedAttributeStatus.kind === AttributeKinds.NUMERIC && (
          <NumericPanel key={panelKey} />
        )}
      </div>
    )
  },
)
