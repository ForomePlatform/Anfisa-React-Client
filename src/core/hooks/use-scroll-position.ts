import { SessionStoreManager } from '@core/storage-management/session-store-manager'

export type TScrollPositionParams = {
  elem: string | HTMLElement
  storageId: string
}

export type TReadScrollPosition = () => void
export type TWriteScrollPosition = (options?: TScrollOptions) => void

type TScrollOptions = {
  top?: number
  left?: number
}

export const useScrollPosition = ({
  elem,
  storageId,
}: TScrollPositionParams): [TReadScrollPosition, TWriteScrollPosition] => {
  const readScrollPosition: TReadScrollPosition = (): void => {
    const scrollOptions =
      SessionStoreManager.read<ScrollToOptions>(storageId) || {}

    const HTMLElement =
      typeof elem === 'string' ? document.querySelectorAll(elem)[0] : elem

    HTMLElement?.scrollTo(scrollOptions)
  }

  const writeScrollPosition: TWriteScrollPosition = (
    options: TScrollOptions = {},
  ): void => {
    const element =
      typeof elem === 'string' ? document.querySelectorAll(elem)[0] : elem

    SessionStoreManager.write(storageId, {
      top: element?.scrollTop,
      left: element?.scrollLeft,
      ...options,
    })
  }

  return [readScrollPosition, writeScrollPosition]
}
