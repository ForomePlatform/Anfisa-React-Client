import { useEffect } from 'react'

const initBeforeUnLoad = (isEnabled: boolean) => {
  window.onbeforeunload = event => {
    if (isEnabled) {
      const e = event || window.event
      e.preventDefault()
      if (e) {
        e.returnValue = ''
      }
      return ''
    }
  }
}

export const useExitPrompt = (isEnabled = true) => {
  window.onload = () => {
    initBeforeUnLoad(isEnabled)
  }

  useEffect(() => {
    initBeforeUnLoad(isEnabled)
    return () => {
      window.onbeforeunload = () => {}
      window.onload = () => {}
    }
  }, [isEnabled])
}
