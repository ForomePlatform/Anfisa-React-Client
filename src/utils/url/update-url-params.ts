export const updateURLParams = (paramName: string, data: any) => {
  const url = new URL(window.location.href)

  url.searchParams.set(paramName, data)
  window.history.pushState({}, '', url)
}
