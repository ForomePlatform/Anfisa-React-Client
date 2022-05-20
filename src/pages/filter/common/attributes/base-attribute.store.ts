import { makeAutoObservable } from 'mobx'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import {
  AttributeKinds,
  TCondition,
  TNumericConditionBounds,
  TPropertyStatus,
  TVariant,
} from '@service-providers/common'
import { getCurrentModeType } from '@utils/getCurrentModeType'

export class BaseAttributeStore {
  private _attributeStatus: TPropertyStatus | undefined
  private _initialCondition: TCondition | undefined

  constructor(
    attributeStatus: TPropertyStatus | undefined,
    initialCondition?: TCondition | undefined,
  ) {
    this._attributeStatus = attributeStatus
    this._initialCondition = initialCondition

    makeAutoObservable(this)
  }

  public get attributeName(): string | undefined {
    return this._attributeStatus?.name
  }

  public get attributeSubKind(): string | undefined {
    if (this._attributeStatus && 'sub-kind' in this._attributeStatus) {
      return this._attributeStatus['sub-kind']
    }

    return undefined
  }

  public get initialEnumVariants(): string[] | undefined {
    if (this._initialCondition?.[0] === FilterKindEnum.Enum) {
      return this._initialCondition[3]
    }

    return undefined
  }

  public get initialEnumMode(): ModeTypes | undefined {
    if (this._initialCondition?.[0] === FilterKindEnum.Enum) {
      return getCurrentModeType(this._initialCondition[2])
    }

    return undefined
  }

  public get enumVariants(): TVariant[] {
    if (this._attributeStatus?.kind !== AttributeKinds.ENUM) {
      return []
    }
    const variants: TVariant[] = []
    const conditionVariants = this.initialEnumVariants
    const statusVariants = this._attributeStatus.variants ?? []
    const conditionIncludes = new Array<boolean>(
      conditionVariants?.length ?? 0,
    ).fill(false)

    for (const variant of statusVariants) {
      const conditionIndex = conditionVariants?.indexOf(variant[0]) ?? -1
      if (variant[1] > 0 || conditionIndex > -1) {
        variants.push(variant)
      }
      if (conditionIndex > -1) {
        conditionIncludes[conditionIndex] = true
      }
    }

    if (conditionVariants) {
      for (let i = 0; i < conditionIncludes.length; ++i) {
        if (!conditionIncludes[i]) {
          variants.push([conditionVariants[i], 0])
        }
      }
    }

    return variants
  }

  public get initialNumericValue(): TNumericConditionBounds | undefined {
    if (this._initialCondition?.[0] === FilterKindEnum.Numeric) {
      return this._initialCondition[2]
    }

    return undefined
  }
}
