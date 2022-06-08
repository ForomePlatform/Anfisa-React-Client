const DEFAULT_HEIGHT_OF_ELEMENT = 20

export const getDefaultCount = () =>
  Math.round(window.innerHeight / DEFAULT_HEIGHT_OF_ELEMENT) + 1

export const getBottomPosition = (element: HTMLElement): number =>
  element.offsetTop + element.offsetHeight

const getMiddle = (left: number, right: number): number =>
  left + Math.round((right - left) / 2)

export const findIndexOfLastElement = (
  container: HTMLElement,
  children: HTMLCollection,
  haveOffset: boolean,
): number => {
  const offset = haveOffset ? container.children[1].clientHeight + 20 : 0
  const bottom = getBottomPosition(container) - offset

  let left = 0
  let right = children.length
  let middle = getMiddle(left, right)
  let stop = false

  while (!stop) {
    if (left === right - 1) {
      stop = true
      continue
    }

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

  return left
}
