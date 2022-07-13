import styles from './filter-conditions.module.css'

import { RefObject, useRef } from 'react'

type TDragStartCallback = (element: HTMLElement, event: MouseEvent) => void
type TDragStopCallback = (fromIndex: number, toIndex: number) => void

type TUseDraggableCardsResult = [
  rootRef: RefObject<HTMLDivElement>,
  onDragStart: TDragStartCallback,
]

const createDragStartCallBack = (
  rootRef: RefObject<HTMLDivElement>,
  dragStopCallbackRef: RefObject<TDragStopCallback>,
): TDragStartCallback => {
  return (el: HTMLElement, event: MouseEvent) => {
    const rootEl = rootRef.current
    if (!rootEl) {
      return
    }

    const rootRect = rootEl.getBoundingClientRect()
    let rootScrollTop = rootEl.scrollTop
    const cards = Array.from(rootEl.children)
    const fromIndex = cards.findIndex(card => card.contains(el))
    if (fromIndex === -1) {
      return
    }

    cards[fromIndex].classList.add(styles.root__card_dragging)

    const cardsBounds = cards.slice(0, cards.length - 1).map(card => {
      const rect = card.getBoundingClientRect()
      return [rect.y + rootScrollTop, rect.bottom + rootScrollTop]
    })
    const { x: originX, y: originY, width, height } = el.getBoundingClientRect()

    const keepOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const draggableEl = el.cloneNode(true) as HTMLElement
    draggableEl.classList.add(styles.draggableCondition)
    draggableEl.style.width = `${width}px`
    draggableEl.style.height = `${height}px`

    const originDX = originX - event.clientX
    const originDY = originY - event.clientY

    let x = originDX
    let y = originDY
    let toIndex = fromIndex
    let scrollDirection = 0
    let scrollTimer = -1

    const moveDraggable = () => {
      draggableEl.style.transform = `translate(${x}px, ${y}px)`
    }
    moveDraggable()

    document.body.appendChild(draggableEl)

    const checkDragPosition = () => {
      let newCandidateIndex = fromIndex

      for (let i = 0; i < cardsBounds.length; ++i) {
        const bounds = cardsBounds[i]
        const cardTop = bounds[0] - rootScrollTop
        const cardBottom = bounds[1] - rootScrollTop
        if (y < cardBottom) {
          if (y > (cardTop + cardBottom) / 2) {
            newCandidateIndex = i + 1
            break
          } else if (y + height > cardTop) {
            newCandidateIndex = i
            break
          }
        }
      }

      if (newCandidateIndex !== toIndex) {
        cards[toIndex].classList.remove(styles.root__card_placeholder)
        toIndex = newCandidateIndex
        if (toIndex !== fromIndex && toIndex !== fromIndex + 1) {
          cards[toIndex].classList.add(styles.root__card_placeholder)
        }
      }
    }

    const moveHandler = (event: MouseEvent) => {
      event.preventDefault()
      x = originDX + event.clientX
      y = originDY + event.clientY

      let newScrollDirection = 0

      if (
        x < rootRect.right &&
        x + width > rootRect.x &&
        y < rootRect.bottom &&
        y + height > rootRect.y
      ) {
        if (y < rootRect.y) {
          newScrollDirection = -1
        } else if (y + height > rootRect.bottom) {
          newScrollDirection = 1
        }

        checkDragPosition()
      }

      if (scrollDirection !== newScrollDirection) {
        scrollDirection = newScrollDirection
        window.clearInterval(scrollTimer)
        if (scrollDirection) {
          scrollTimer = window.setInterval(() => {
            rootEl.scrollBy({ top: scrollDirection * 3 })
            rootScrollTop = rootEl.scrollTop
            checkDragPosition()
          }, 5)
        }
      }

      moveDraggable()
    }

    document.addEventListener('mousemove', moveHandler)

    document.addEventListener(
      'mouseup',
      () => {
        window.clearInterval(scrollTimer)
        document.removeEventListener('mousemove', moveHandler)
        document.body.style.overflow = keepOverflow
        draggableEl.remove()
        cards.forEach(card =>
          card.classList.remove(
            styles.root__card_placeholder,
            styles.root__card_dragging,
          ),
        )
        if (fromIndex !== toIndex) {
          dragStopCallbackRef.current?.(fromIndex, toIndex)
        }
      },
      {
        once: true,
      },
    )
  }
}

export const useDraggableCards = (
  onDragStop: TDragStopCallback,
): TUseDraggableCardsResult => {
  const rootRef = useRef<HTMLDivElement>(null)
  const dragStartCallbackRef = useRef<TDragStartCallback>()
  const dragStopCallbackRef = useRef<TDragStopCallback>(onDragStop)

  dragStopCallbackRef.current = onDragStop

  if (!dragStartCallbackRef.current) {
    dragStartCallbackRef.current = createDragStartCallBack(
      rootRef,
      dragStopCallbackRef,
    )
  }

  return [rootRef, dragStartCallbackRef.current]
}
