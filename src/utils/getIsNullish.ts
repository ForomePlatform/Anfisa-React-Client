export const getIsNullish = (obj: any): boolean => {
  return Object.values(obj).every(value => {
    if (value === null) {
      return true
    }

    return false
  })
}
