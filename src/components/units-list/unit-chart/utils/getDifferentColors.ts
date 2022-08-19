export const getDifferentBarColors = (index: number, colors: string[]) => {
  return colors[index % colors.length]
}
