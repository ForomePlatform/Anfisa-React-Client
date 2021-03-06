const DEFAULT_HEIGHT_OF_ELEMENT = 20

export const getDefaultCount = () =>
  Math.round(window.innerHeight / DEFAULT_HEIGHT_OF_ELEMENT) + 1

export const getBottomPosition = (element: HTMLElement | undefined): number =>
  !element ? 0 : element.offsetTop + element.offsetHeight

const getMiddle = (left: number, right: number): number =>
  left + Math.round((right - left) / 2)

export const findIndexOfLastElement = (
  container: HTMLElement,
  children: HTMLCollection,
): number => {
  const parent = container.parentElement!
  const footer = parent.children[1]
  const footerHeight = !footer ? 0 : footer.clientHeight + 20
  const bottom = getBottomPosition(parent) - footerHeight

  let left = -1
  let right = children.length
  let middle = getMiddle(left, right)

  while (left < right - 1) {
    const position = getBottomPosition(children[middle] as HTMLElement)

    if (position === bottom) {
      return middle
    } else if (position > bottom) {
      right = middle
    } else {
      left = middle
    }

    middle = getMiddle(left, right)
  }

  return right
}
