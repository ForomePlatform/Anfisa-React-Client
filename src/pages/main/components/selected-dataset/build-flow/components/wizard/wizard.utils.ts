import { ExploreCandidateTypes } from '@core/enum/explore-candidate-types-enum'
import { ExploreGenomeTypes } from '@core/enum/explore-genome-types-enum'
import { LocalStoreManager } from '@core/storage-management/local-store-manager'
import { datasetStore } from '@store/dataset'
import { Routes } from '@router/routes.enum'
import { GlbPagesNames } from '@glb/glb-names'

export const PREVIOUS_WORK_LOCATION = 'prevWorkLocation'

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
    [ExploreGenomeTypes.BuildInclusionExclusion]: dtreeRoute,
    [ExploreCandidateTypes.ApplyFilter]: refinerRoute,
    [ExploreCandidateTypes.ExploreData]: refinerRoute,
    [ExploreCandidateTypes.ViewAllVariants]: tableRoute,
    [ExploreGenomeTypes.ACMG]: refinerAndTableRoute,
    [ExploreGenomeTypes.Phenotype]: refinerAndTableRoute,
    [ExploreGenomeTypes.GeneticAnalysis]: refinerAndTableRoute,
  }

  return routes[exploreType]
}

export const memorizeLocation = (location: string) => {
  const locations = LocalStoreManager.read<string[]>(PREVIOUS_WORK_LOCATION)

  if (locations && !locations.includes(location)) {
    locations.unshift(location)
    if (locations.length > 5) {
      locations.pop()
    }
  }

  LocalStoreManager.write(PREVIOUS_WORK_LOCATION, locations || [location])
}
