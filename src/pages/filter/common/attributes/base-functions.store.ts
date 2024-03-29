import { makeAutoObservable } from 'mobx'

import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { DefaultProblemGroup } from '@core/enum/default-problem-group-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset/dataset'
import { getApproxName } from '@components/conditions/utils/conditions.utils'
import {
  AttributeKinds,
  ICompoundHetArgs,
  ICompoundRequestArgs,
  ICustomInheritanceModeArgs,
  IFuncPropertyStatus,
  IGeneRegionArgs,
  IInheritanceModeArgs,
  IScenario,
  TFuncCondition,
  TPropertyStatus,
  TRequestCondition,
} from '@service-providers/common'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import { BaseAttributeStore } from './base-attribute.store'

export class BaseFunctionsStore {
  readonly attributeStore: BaseAttributeStore

  constructor(attributeStore: BaseAttributeStore) {
    this.attributeStore = attributeStore
    makeAutoObservable(this)
  }

  public get attributeStatus(): TPropertyStatus | undefined {
    return this.attributeStore.attributeStatus
  }

  public get initialCondition(): TFuncCondition | undefined {
    return this.attributeStore.initialCondition as TFuncCondition
  }

  public get attributeName(): string | undefined {
    return this.attributeStatus?.name
  }

  public get attributeSubKind(): string | undefined {
    if (this.attributeStatus && 'sub-kind' in this.attributeStatus) {
      return this.attributeStatus['sub-kind']
    }

    return undefined
  }

  public get problemGroups(): string[] {
    const status = this.attributeStatus as IFuncPropertyStatus

    return status?.family || []
  }

  public get initialVariants(): string[] | undefined {
    return this.initialCondition?.[3]
  }

  public get initialScenario(): IScenario {
    const condition = this.initialCondition?.[4] as ICustomInheritanceModeArgs
    return condition?.scenario
  }

  public get initialApprox(): ApproxNameTypes {
    if (this.initialCondition?.[0] === AttributeKinds.FUNC) {
      const condition = this.initialCondition?.[4] as ICompoundHetArgs

      return getApproxName(condition.approx)
    }
    return datasetStore.isXL
      ? ApproxNameTypes.Non_Intersecting_Transcript
      : ApproxNameTypes.Shared_Transcript
  }

  public get initialRequestCondition(): TRequestCondition[] {
    const condition = this.initialCondition?.[4] as ICompoundRequestArgs

    return condition?.request || [[1, {}]]
  }

  public get initialProblemGroups(): string[] | undefined {
    const funcArguments = this.initialCondition?.[4] as IInheritanceModeArgs

    if (this.initialCondition && !funcArguments?.problem_group) {
      return datasetStore.isXL
        ? [DefaultProblemGroup.HG002]
        : [DefaultProblemGroup.NA24385]
    }

    return funcArguments?.problem_group
  }

  public get initialMode(): ModeTypes | undefined {
    return getCurrentModeType(this.initialCondition?.[2])
  }

  public get initialLocusValue(): string | undefined {
    const condition = this.initialCondition?.[4] as IGeneRegionArgs
    return condition?.locus
  }

  public get affectedGroup(): string[] {
    const status = this.attributeStatus as IFuncPropertyStatus

    return status?.affected || []
  }
}
