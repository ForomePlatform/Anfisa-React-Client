import { RefObject, useCallback, useEffect, useState } from 'react'

export const useFullScreenView = (
  ref: RefObject<HTMLElement>,
  callback?: (v: boolean) => void,
): [boolean, () => void] => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleStoreFullScreen = useCallback(() => {
    const element = ref.current

    if (!element) return

    const fullscreenEnabled = document.fullscreenElement !== null

    setIsExpanded(fullscreenEnabled)
    callback && callback(fullscreenEnabled)
  }, [callback, ref])

  useEffect(() => {
    document.addEventListener('fullscreenchange', toggleStoreFullScreen)

    return () =>
      document.addEventListener('fullscreenchange', toggleStoreFullScreen)
  }, [toggleStoreFullScreen])

  const toggle = () => {
    const element = ref.current

    if (!element) return

    if (document.fullscreenElement === null) {
      element.requestFullscreen()
      return
    }

    document.exitFullscreen()
  }

  return [isExpanded, toggle]
}
