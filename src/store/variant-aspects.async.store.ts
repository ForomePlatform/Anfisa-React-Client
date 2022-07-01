import { computed, makeObservable, toJS } from 'mobx'

import {
  BaseAsyncDataStore,
  TBaseDataStoreFetchOptions,
  TBaseDataStoreOptions,
} from '@store/common'
import datasetStore from '@store/dataset/dataset'
import {
  datasetProvider,
  HgModes,
  IIgvParams,
  IReccntArguments,
  ITableAspectDescriptor,
  TAspectDescriptor,
} from '@service-providers/dataset-level'
import { findElementInRow } from '@utils/mian-table/find-element-in-row'

const VARIANT_WITHOUT_GENES = 'None'

export class VariantAspectsAsyncStore extends BaseAsyncDataStore<
  TAspectDescriptor[],
  IReccntArguments
> {
  constructor(options: TBaseDataStoreOptions = {}) {
    super(options)

    makeObservable(this, {
      aspects: computed,
      generalAspect: computed,
      hg19locus: computed,
      hg38locus: computed,
      locus: computed,
      genes: computed,
      igvParams: computed,
    })
  }

  public get aspects(): TAspectDescriptor[] {
    return toJS(this.data) ?? []
  }

  public get generalAspect(): ITableAspectDescriptor | undefined {
    return this.aspects.find(aspect => aspect.name === 'view_gen') as
      | ITableAspectDescriptor
      | undefined
  }

  public get hg19locus(): string {
    return findElementInRow(this.generalAspect?.rows ?? [], 'hg19')
  }

  public get hg38locus(): string {
    return findElementInRow(this.generalAspect?.rows ?? [], 'hg38')
  }

  public get locus(): string {
    const { locusMode } = datasetStore
    return locusMode === HgModes.HG19 ? this.hg19locus : this.hg38locus
  }

  public get genes(): string {
    const rows = this.generalAspect?.rows ?? []

    return findElementInRow(rows, 'genes') || VARIANT_WITHOUT_GENES
  }

  public get igvParams(): IIgvParams | undefined {
    const igvUrls = datasetStore.dsInfoData?.igvUrls

    // uncomment to check igv modal for ws-page/PGP3140_wgs_panel_hl
    // const igvUrls = [
    //   'https://forome-bam.s3.us-south.cloud-object-storage.appdomain.cloud/GRCh38/NA24385.sorted.bam',
    //   'https://forome-bam.s3.us-south.cloud-object-storage.appdomain.cloud/GRCh38/NA24143.sorted.bam',
    //   'https://forome-bam.s3.us-south.cloud-object-storage.appdomain.cloud/GRCh38/NA24149.sorted.bam',
    // ]

    // uncomment to check igv modal for filter-page/xl_PGP3140_wgs_NIST-4_2
    // const igvUrls = [
    //   'https://forome-bam.s3.us-south.cloud-object-storage.appdomain.cloud/GRCh38/HG002.sorted.bam',
    //   'https://forome-bam.s3.us-south.cloud-object-storage.appdomain.cloud/GRCh38/HG003.sorted.bam',
    //   'https://forome-bam.s3.us-south.cloud-object-storage.appdomain.cloud/GRCh38/HG004.sorted.bam',
    // ]

    if (!igvUrls) {
      return
    }

    let names: string[] = []

    const qualityAspect = this.aspects.find(
      aspect => aspect.name === 'view_qsamples',
    ) as ITableAspectDescriptor | undefined

    if (qualityAspect) {
      names = qualityAspect.rows[0]?.cells
        .map(cell => cell[0].split(': ')[1])
        .filter(Boolean)
    }

    if (!this.generalAspect) {
      return undefined
    }

    const locus = this.generalAspect.rows
      .find(row => row.name === 'hg38')
      ?.cells[0]?.[0]?.split(' ')[0]

    if (!locus) {
      return undefined
    }

    const igvUrlSearchParams = new URLSearchParams({
      locus,
      names: names.join(','),
      igvUrls: JSON.stringify(igvUrls),
    }).toString()

    return {
      locus,
      names: names.join(','),
      igvUrls,
      igvUrlSearchParams,
    }
  }

  protected fetch(
    query: IReccntArguments,
    options: TBaseDataStoreFetchOptions,
  ): Promise<TAspectDescriptor[]> {
    return datasetProvider.getRecCnt(query, {
      signal: options.abortSignal,
    })
  }
}
