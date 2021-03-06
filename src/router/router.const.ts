import { GlbPagesNames } from '@glb/glb-names'
import { FilterControlOptions } from '@pages/filter/common/filter-control/filter-control.const'
import { PageRoute, Routes } from './routes.enum'

export const getPageRoute = (
  name: GlbPagesNames | FilterControlOptions,
): PageRoute => {
  let route = ''

  switch (name) {
    case GlbPagesNames.Table:
      route = Routes.WS
      break
    case GlbPagesNames.Dtree:
      route = Routes.Dtree
      break
    case GlbPagesNames.Refiner:
      route = Routes.Refiner
      break
    case GlbPagesNames.IGV:
      route = Routes.IGV
      break
  }

  return route as PageRoute
}
