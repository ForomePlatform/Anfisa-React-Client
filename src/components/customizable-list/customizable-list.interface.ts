import { ReactNode } from 'react'

export type TCustomizableListItem = {
  name: string
  title: ReactNode
  isHidden?: boolean
}
