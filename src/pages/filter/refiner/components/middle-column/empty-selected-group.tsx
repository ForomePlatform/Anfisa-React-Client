import { ReactElement } from 'react'
import cn, { Argument } from 'classnames'

import { t } from '@i18n'

type IEmptySelectedGroupProps = {
  content?: JSX.Element
  className?: Argument
}
export const EmptySelectedGroup = ({
  content,
  className,
}: IEmptySelectedGroupProps): ReactElement => {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      {!content ? (
        <p className="leading-16px text-grey-blue align-center">
          {t('condition.selectAttribute')}
        </p>
      ) : (
        content
      )}
    </div>
  )
}
