import { ExploreGenomeTypes } from '@core/enum/explore-genome-types-enum'
import { datasetStore } from '@store/dataset'
import { Routes } from '@router/routes.enum'
import { GlbPagesNames } from '@glb/glb-names'
import { ExploreCandidateTypes } from './../../../../core/enum/explore-candidate-types-enum'

export const getNextPageData = (
  exploreGenomeType: ExploreGenomeTypes | ExploreCandidateTypes,
  dsName?: string,
) => {
  const ds = dsName || datasetStore.datasetName

  const commonRoute = {
    route: datasetStore.isXL
      ? `${Routes.Refiner}?ds=${ds}`
      : `${Routes.WS}?ws=${ds}`,
    method: datasetStore.isXL ? GlbPagesNames.Refiner : GlbPagesNames.Table,
  }

  const exploreGenomeRoutes = {
    'Build inclusion/exclusion critetira': {
      route: `${Routes.Dtree}?ds=${ds}`,
      method: GlbPagesNames.Dtree,
    },
    'Explore data or build new filter': {
      route: `${Routes.Refiner}?ds=${ds}`,
      method: GlbPagesNames.Refiner,
    },
    'ACMG analysis': commonRoute,
    'Phenotype based analysis': commonRoute,
    'Genetic first analysis': commonRoute,
    'View all variants': commonRoute,
    'Apply additional preset filter': commonRoute,
  }

  return exploreGenomeRoutes[exploreGenomeType]
}
