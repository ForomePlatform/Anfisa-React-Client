export const isNullish = (obj: any): boolean => {
  return Object.values(obj).every(value => value === null)
}
