export const getBottomPosition = (element: HTMLElement): number => {
  return element.offsetTop + element.clientHeight
}

export const findIndexOfLastElement = (
  container: HTMLElement,
  children: HTMLCollection,
  haveOffset: boolean,
): number => {
  const offset = haveOffset ? 56 : 0
  const bottom = getBottomPosition(container) - offset
  const height = container.clientHeight - offset

  const firstChildHeight = children[0].clientHeight
  const possibleCount = Math.round(height / firstChildHeight) + 1
  const right = Math.min(children.length - 1, possibleCount)

  return 1
}
