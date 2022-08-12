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

  switch (url.pathname) {
    case Routes.Refiner: {
      result += t('home.buildFlow.simpleFilter')
      break
    }
    case Routes.Dtree: {
      result += t('home.buildFlow.inclusionExclusion')
      break
    }
    case Routes.WS: {
      result += t('home.buildFlow.viewVariants')
      break
    }
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
