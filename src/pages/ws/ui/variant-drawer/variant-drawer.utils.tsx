import { MutableRefObject } from 'react'

import { TAspectDescriptor } from '@service-providers/dataset-level'

export const getFoundedValuesNumber = (
  value: string,
  aspects: TAspectDescriptor[],
) => {
  let acc = 0

  if (value.trim()) {
    aspects.forEach(aspect => {
      if (aspect.rows) {
        aspect.rows.forEach(row => {
          if (
            row &&
            row.title.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())
          ) {
            acc++
          }
        })
      }
    })
  }

  return acc
}

const ORANGE_BG_CLASSNAME = 'bg-orange-bright'
const WHITE_TEXT_CLASSNAME = 'text-white'
const YELLOW_BG_CLASSNAME = 'bg-yellow-bright'

export const scrollToItem = (
  className: string,
  refIndex: MutableRefObject<number>,
) => {
  const searchedNodesList = document.querySelectorAll(className)

  const currentNode = searchedNodesList[refIndex.current]
  const prevNode = searchedNodesList[refIndex.current - 1]
  const lastNode = searchedNodesList[searchedNodesList.length - 1]

  if (!currentNode) {
    return
  }

  if (refIndex.current === 0) {
    lastNode.classList.remove(ORANGE_BG_CLASSNAME, WHITE_TEXT_CLASSNAME)
  }

  if (currentNode) {
    currentNode.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    })

    if (prevNode) {
      prevNode.classList.remove(ORANGE_BG_CLASSNAME, WHITE_TEXT_CLASSNAME)
    }

    currentNode.classList.add(
      ORANGE_BG_CLASSNAME,
      WHITE_TEXT_CLASSNAME,
      YELLOW_BG_CLASSNAME,
    )

    refIndex.current === searchedNodesList.length - 1
      ? (refIndex.current = 0)
      : refIndex.current++
  }
}
