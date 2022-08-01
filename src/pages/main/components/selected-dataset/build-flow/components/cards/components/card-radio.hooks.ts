import { useMemo } from 'react'

import {
  ExploreCandidateTypesDictionary,
  TExploreCandidateKeys,
} from '@core/enum/explore-candidate-types-enum'
import {
  ExploreGenomeTypesDictionary,
  TExploreGenomeKeys,
} from '@core/enum/explore-genome-types-enum'
import {
  ExploreTypesDictionary,
  TExploreKeys,
} from '@core/enum/explore-types-enum'

type TExploreType<T> = T extends TExploreKeys
  ? typeof ExploreTypesDictionary
  : T extends TExploreGenomeKeys
  ? typeof ExploreGenomeTypesDictionary
  : T extends TExploreCandidateKeys
  ? typeof ExploreCandidateTypesDictionary
  : never

export const useRadioListData = <T>(exploreType: TExploreType<T>) => {
  return useMemo(() => {
    return Object.entries(exploreType).map(([key, value]) => {
      return {
        label: value as unknown as TExploreType<T>[keyof TExploreType<T>],
        value: key as unknown as T,
      }
    })
  }, [exploreType])
}
