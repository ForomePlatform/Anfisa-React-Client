export const checkMaxMin = (
  value: number,
  maximal: number,
  minimal: number,
): number => {
  if (value <= minimal) {
    return minimal
  }
  if (value >= maximal) {
    return maximal
  }
  return value
}
