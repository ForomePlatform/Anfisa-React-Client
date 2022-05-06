export const getCamelizedData = <T>(data: any): T => {
  const camelizedData = {}

  for (const key in data) {
    const camelizedKey = key.replace(/-./g, x => x[1].toUpperCase())

    Object.defineProperty(camelizedData, camelizedKey, { value: data[key] })
  }

  return camelizedData as T
}
