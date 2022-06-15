import { ReactElement } from 'react'
import cn from 'classnames'
import Tooltip from 'rc-tooltip'

import { Icon } from '@ui/icon'
import { FnLabel } from '@components/fn-label'
import { AttributeKinds, TPropertyStatus } from '@service-providers/common'

interface IAttributeHeaderProps {
  className?: string
  attrStatus: TPropertyStatus
}

export const AttributeHeader = ({
  attrStatus,
  className,
}: IAttributeHeaderProps): ReactElement => {
  const { tooltip, name, title, kind } = attrStatus

  const isFunc = kind === AttributeKinds.FUNC

  return (
    <div className={cn('flex items-center', className)}>
      {isFunc && <FnLabel />}

      <span
        className={cn('text-16 font-bold cursor-pointer', isFunc && 'ml-1.5')}
      >
        {name || title}
      </span>

      {tooltip && (
        <Tooltip overlay={tooltip} placement="left" trigger={['click']}>
          <Icon name="Info" className="ml-1 text-grey-blue cursor-pointer" />
        </Tooltip>
      )}
    </div>
  )
}
