import { useCallback, useEffect, useState } from 'react'

export const useFullScreenView = (
  id: string,
  callback?: (v: boolean) => void,
): [boolean, () => void] => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleStoreFullScreen = useCallback(() => {
    const element = document.querySelector(`#${id}`)

    if (!element) return

    const fullscreenEnabled = document.fullscreenElement !== null

    setIsExpanded(fullscreenEnabled)
    callback && callback(fullscreenEnabled)
  }, [callback, id])

  useEffect(() => {
    document.addEventListener('fullscreenchange', toggleStoreFullScreen)

    return () =>
      document.addEventListener('fullscreenchange', toggleStoreFullScreen)
  }, [toggleStoreFullScreen])

  const toggle = () => {
    const element = document.querySelector(`#${id}`)

    if (!element) return

    if (document.fullscreenElement === null) {
      element.requestFullscreen()
      return
    }

    document.exitFullscreen()
  }

  return [isExpanded, toggle]
}
