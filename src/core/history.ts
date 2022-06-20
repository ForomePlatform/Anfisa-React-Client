export const pushQueryParams = (
  newParams: Record<string, string | null>,
): void => {
  const url = new URL(window.location.toString())
  const params = new URLSearchParams(url.searchParams)

  Object.entries(newParams).forEach(([name, value]) => {
    if (value) {
      params.set(name, value)
    } else {
      params.delete(name)
    }
  })

  url.search = params.toString()

  window.history.pushState(null, '', url)
}

export const getQueryParam = (name: string): string | null => {
  return new URLSearchParams(window.location.search).get(name)
}
