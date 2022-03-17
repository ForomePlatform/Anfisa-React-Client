export const formatNumber = (value: unknown): string => {
  if (typeof value !== 'number') return '...'

  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
