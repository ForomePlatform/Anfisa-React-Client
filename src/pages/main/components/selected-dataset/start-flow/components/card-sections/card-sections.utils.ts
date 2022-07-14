import { Routes } from '@router/routes.enum'

export const parseLocation = (location: string) => {
  const addDelimeter = (str: string) => {
    return str + ' | '
  }

  const url = new URL(
    `${window.location.protocol}${window.location.host}${location}`,
  )
  let result = ''

  const isFilter = url.pathname === Routes.Refiner
  const isDtree = url.pathname === Routes.Dtree
  const isWs = url.pathname === Routes.WS

  if (isFilter) {
    result += 'Filter Refiner'
  } else if (isDtree) {
    result += 'Decision Tree'
  } else if (isWs) {
    result += 'Table'
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
