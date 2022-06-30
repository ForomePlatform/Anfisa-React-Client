import { MutableRefObject, useEffect } from 'react'

const highlighted = 'bg-blue-tertiary'

export const useScrollToItem = (
  className: string,
  refIndex: MutableRefObject<number>,
) => {
  const scrollToItem = () => {
    const searchedNodesList = document.querySelectorAll(className)
    const currentNode = searchedNodesList[refIndex.current]
    const prevNode = searchedNodesList[refIndex.current - 1]
    const lastNode = searchedNodesList[searchedNodesList.length - 1]

    if (!currentNode) {
      return
    }

    if (refIndex.current === 0) {
      lastNode.classList.remove(highlighted)
    }

    if (currentNode) {
      currentNode.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      })

      if (prevNode) {
        prevNode.classList.remove(highlighted)
      }

      currentNode.classList.add(highlighted)

      refIndex.current === searchedNodesList.length - 1
        ? (refIndex.current = 0)
        : refIndex.current++
    }
  }

  const detectKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      scrollToItem()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', detectKey)

    return () => window.removeEventListener('keydown', detectKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
