import styles from './condition-content.module.css'

import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { AttributeKinds } from '@service-providers/common'
import { IConditionContentProps } from './condition-content.interface'
import { ConditionContentEnum } from './condition-content-enum'
import { ConditionContentFunc } from './condition-content-func'
import { ConditionContentNumeric } from './condition-content-numeric'

export const ConditionContent = observer(
  ({ condition, isPreview = false, ...props }: IConditionContentProps) => {
    const conditionType = condition[0]

    switch (conditionType) {
      case AttributeKinds.NUMERIC:
        return <ConditionContentNumeric condition={condition} {...props} />
      case AttributeKinds.ENUM:
        return (
          <ConditionContentEnum
            isPreview={isPreview}
            condition={condition}
            {...props}
          />
        )
      case AttributeKinds.FUNC:
        return <ConditionContentFunc condition={condition} {...props} />
      case AttributeKinds.ERROR:
        return (
          <span className={cn(styles.condition__error)}>
            {t('filter.inactiveField')}
          </span>
        )
    }
  },
)
