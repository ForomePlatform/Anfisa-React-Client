import { Ref, useEffect, useRef } from 'react'

export const useResizeTextAreaHeight = (): Ref<HTMLTextAreaElement> => {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    const resize = () => {
      const value = element.value

      if (value === '') {
        element.style.height = '55px'
        return
      }

      // Reset field height
      element.style.height = 'inherit'

      // Get the computed styles for the element
      const computed = window.getComputedStyle(element)

      // Calculate the height
      const height =
        parseInt(computed.getPropertyValue('border-top-width'), 10) +
        parseInt(computed.getPropertyValue('padding-top'), 10) +
        element.scrollHeight +
        parseInt(computed.getPropertyValue('padding-bottom'), 10) +
        parseInt(computed.getPropertyValue('border-bottom-width'), 10)

      element.style.height = `${height}px`
    }

    element.addEventListener('input', resize)

    return () => {
      element.removeEventListener('input', resize)
    }
  }, [])

  return ref
}
