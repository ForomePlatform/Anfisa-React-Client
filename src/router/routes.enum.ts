import { Glb } from '@glb/glb'
import { GlbPagesNames } from '@glb/glb-names'

export const Routes = Glb.makeEnum({
  Root: '/',
  WS: '/ws',
  Dtree: '/filter/dtree',
  Refiner: '/filter/refiner',
})

export const RouteNames = Glb.makeEnum({
  [Routes.Dtree]: GlbPagesNames.Dtree,
  [Routes.Refiner]: GlbPagesNames.Refiner,
  [Routes.WS]: GlbPagesNames.Table,
  [Routes.Root]: GlbPagesNames.Root,
})

export type PageRoute = typeof Routes[keyof typeof Routes]
export type RouteNames = typeof RouteNames[keyof typeof RouteNames]
