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

  const commonExploreGenomeRoute = {
    route: `${datasetStore.isXL ? Routes.Refiner : Routes.WS}?ds=${ds}`,
    method: datasetStore.isXL ? GlbPagesNames.Refiner : GlbPagesNames.Table,
  }

  const commonExploreCandidadteRoute = {
    route: `${dsName ? Routes.WS : Routes.Refiner}?ds=${ds}`,
    method: dsName ? GlbPagesNames.Table : GlbPagesNames.Refiner,
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
    'ACMG analysis': commonExploreGenomeRoute,
    'Phenotype based analysis': commonExploreGenomeRoute,
    'Genetic first analysis': commonExploreGenomeRoute,
    'View all variants': commonExploreCandidadteRoute,
    'Apply additional preset filter': commonExploreCandidadteRoute,
  }

  return exploreGenomeRoutes[exploreGenomeType]
}
