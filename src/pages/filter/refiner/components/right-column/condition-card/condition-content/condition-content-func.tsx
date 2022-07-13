import styles from './condition-content.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import {
  FuncUnits,
  TFuncCondition,
} from '@service-providers/common/common.interface'
import { CompoundHetView } from './components/compound-het-view'
import { CompoundRequestView } from './components/compound-request-view'
import { CustomInheritanceModeView } from './components/custom-inheritance-mode-view'
import { GeneRegionView } from './components/gene-region-view'
import { InheritanceModeView } from './components/inheritance-mode-view'
import { IConditionContentProps } from './condition-content.interface'

export const ConditionContentFunc = ({
  className: classNameProp,
  condition,
}: IConditionContentProps<TFuncCondition>): ReactElement | null => {
  const className = cn(styles.conditionContent, classNameProp)

  switch (condition[1]) {
    case FuncUnits.InheritanceMode:
      return (
        <InheritanceModeView
          className={className}
          filterContent={condition[3]}
          filterExpression={condition[4]}
        />
      )
    case FuncUnits.CustomInheritanceMode:
      return (
        <CustomInheritanceModeView
          className={className}
          filterContent={condition[3]}
          filterExpression={condition[4]}
        />
      )
    case FuncUnits.CompoundHet:
      return (
        <CompoundHetView
          className={className}
          filterContent={condition[3]}
          filterExpression={condition[4]}
        />
      )
    case FuncUnits.CompoundRequest:
      return (
        <CompoundRequestView
          className={className}
          filterContent={condition[3]}
          filterExpression={condition[4]}
        />
      )
    case FuncUnits.GeneRegion:
      return (
        <GeneRegionView
          className={className}
          filterContent={condition[3]}
          filterExpression={condition[4]}
        />
      )
    default:
      return null
  }
}
