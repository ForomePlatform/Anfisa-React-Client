import { useEffect } from 'react'
import { createPortal } from 'react-dom'

const mount = document.getElementById('portal-root')!
const el = document.createElement('div')

export const Portal = ({ children }: React.PropsWithChildren<{}>) => {
  useEffect(() => {
    mount.appendChild(el)

    return () => {
      mount.removeChild(el)
    }
  }, [])

  return createPortal(children, el)
}
