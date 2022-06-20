export const getNumeric = (
  value: number | string,
  minimal: number,
  maximal: number,
): number => {
  const num = typeof value === 'string' ? +value.replace(/\s/g, '') : value
  if (isNaN(num)) {
    return minimal
  }
  if (num <= minimal) {
    return minimal
  }
  if (num >= maximal) {
    return maximal
  }
  return num
}
