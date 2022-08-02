import { t } from '@i18n'
import { Routes } from '@router/routes.enum'

export const parseLocation = (location: string) => {
  const addDelimeter = (str: string) => {
    return str + ' | '
  }
  const {
    location: { protocol, host },
  } = window

  const url = new URL(`${protocol}${host}${location}`)
  let result = ''

  const isFilter = url.pathname === Routes.Refiner
  const isDtree = url.pathname === Routes.Dtree
  const isWs = url.pathname === Routes.WS

  if (isFilter) {
    result += t('home.buildFlow.simpleFilter')
  } else if (isDtree) {
    result += t('home.buildFlow.inclusionExclusion')
  } else if (isWs) {
    result += t('home.buildFlow.viewVariants')
  }

  result = addDelimeter(result)

  result += url.searchParams.get('ds')

  const preset = url.searchParams.get('preset') || ''
  const dtree = url.searchParams.get('dtree') || ''

  if (preset || dtree) {
    result = addDelimeter(result)
  }

  result += preset || dtree

  return result
}
