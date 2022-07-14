import { ExploreCandidateTypes } from '@core/enum/explore-candidate-types-enum'
import { ExploreGenomeTypes } from '@core/enum/explore-genome-types-enum'
import { datasetStore } from '@store/dataset'
import { Routes } from '@router/routes.enum'
import { GlbPagesNames } from '@glb/glb-names'

export const getNextPageData = (
  exploreType: ExploreGenomeTypes | ExploreCandidateTypes,
  dsName?: string,
) => {
  const ds = dsName || datasetStore.datasetName

  const refinerAndTableRoute = {
    route: `${datasetStore.isXL ? Routes.Refiner : Routes.WS}?ds=${ds}`,
    method: datasetStore.isXL ? GlbPagesNames.Refiner : GlbPagesNames.Table,
  }

  const refinerRoute = {
    route: `${Routes.Refiner}?ds=${ds}`,
    method: GlbPagesNames.Refiner,
  }

  const tableRoute = {
    route: `${Routes.WS}?ds=${ds}`,
    method: GlbPagesNames.Table,
  }

  const dtreeRoute = {
    route: `${Routes.Dtree}?ds=${ds}`,
    method: GlbPagesNames.Dtree,
  }

  const routes = {
    'Build inclusion/exclusion critetira': dtreeRoute,
    'Apply additional preset filter': refinerRoute,
    'Explore data or build new filter': refinerRoute,
    'View all variants': tableRoute,
    'ACMG analysis': refinerAndTableRoute,
    'Phenotype based analysis': refinerAndTableRoute,
    'Genetic first analysis': refinerAndTableRoute,
  }

  return routes[exploreType]
}
