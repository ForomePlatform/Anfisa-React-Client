import {
  ExploreCandidateKeys,
  TExploreCandidateKeys,
} from '@core/enum/explore-candidate-types-enum'
import {
  ExploreGenomeKeys,
  TExploreGenomeKeys,
} from '@core/enum/explore-genome-types-enum'
import { LocalStoreManager } from '@core/storage-management/local-store-manager'
import { datasetStore } from '@store/dataset'
import { Routes } from '@router/routes.enum'
import { GlbPagesNames } from '@glb/glb-names'
import { WizardCardIds } from './scenarios/wizard-scenarios.constants'
import {
  IWizardRoute,
  IWizardScenario,
  TRouteDictionary,
} from './wizard.interface'

export const PREVIOUS_WORK_LOCATION = 'prevWorkLocation'

const isExploreTypeGenomeGuard = (
  exploreType: TExploreGenomeKeys | TExploreCandidateKeys,
): exploreType is TExploreGenomeKeys => {
  return Object.keys(ExploreGenomeKeys).some(key => key === exploreType)
}

export const getNextPageData = (
  exploreType: TExploreGenomeKeys | TExploreCandidateKeys,
  dsName?: string,
) => {
  const ds = dsName || datasetStore.datasetName

  const refinerAndTableRoute: IWizardRoute = {
    route: `${datasetStore.isXL ? Routes.Refiner : Routes.WS}?ds=${ds}`,
    method: datasetStore.isXL ? GlbPagesNames.Refiner : GlbPagesNames.Table,
  }

  const refinerRoute: IWizardRoute = {
    route: `${Routes.Refiner}?ds=${ds}`,
    method: GlbPagesNames.Refiner,
  }

  const tableRoute: IWizardRoute = {
    route: `${Routes.WS}?ds=${ds}`,
    method: GlbPagesNames.Table,
  }

  const dtreeRoute: IWizardRoute = {
    route: `${Routes.Dtree}?ds=${ds}`,
    method: GlbPagesNames.Dtree,
  }

  const candidateRoutes: TRouteDictionary<TExploreCandidateKeys> = {
    [ExploreCandidateKeys.ApplyFilter]: refinerRoute,
    [ExploreCandidateKeys.ExploreData]: refinerRoute,
    [ExploreCandidateKeys.ViewAllVariants]: tableRoute,
  }

  const genomeRoutes: TRouteDictionary<TExploreGenomeKeys> = {
    [ExploreGenomeKeys.ExploreData]: refinerRoute,
    [ExploreGenomeKeys.BuildInclusionExclusion]: dtreeRoute,
    [ExploreGenomeKeys.ACMGSecondary]: refinerAndTableRoute,
    [ExploreGenomeKeys.GeneticFirst]: refinerAndTableRoute,
    [ExploreGenomeKeys.PhenotypeBased]: refinerAndTableRoute,
  }

  return isExploreTypeGenomeGuard(exploreType)
    ? genomeRoutes[exploreType]
    : candidateRoutes[exploreType]
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

export const getActiveCardIds = (scenario: IWizardScenario[]) => {
  return scenario.reduce((acc, card) => {
    if (!card.hidden) {
      acc.push(card.id)
    }
    return acc
  }, [] as WizardCardIds[])
}
