import { useEffect } from 'react'
import { $mobx, comparer, computed, runInAction } from 'mobx'

import { getQueryParams, pushQueryParams } from '@core/history'

export type THistoryObserverEntry = {
  get: () => string | null
  apply: (value: string | null) => void
}

export type THistoryObserverParams<T extends string> = Record<
  T,
  THistoryObserverEntry
>

export type THistoryObserver = {
  (): () => void
  useHook: () => void
}

export const createHistoryObserver = <T extends string>(
  params: THistoryObserverParams<T>,
): THistoryObserver => {
  const names = Object.keys(params) as T[]

  const storeState = computed(() => {
    const state = {} as Record<T, string | null>

    for (const key of names) {
      state[key] = params[key].get() || null
    }

    return state
  })

  const getStateFromHistory = (): Record<T, string | null> =>
    getQueryParams(names)

  const observer = () => {
    let handlePopState = true

    const handler = () => {
      if (!handlePopState) {
        return
      }

      const historyState = getStateFromHistory()
      const state = storeState.get()

      runInAction(() => {
        for (const key of names) {
          if (historyState[key] !== state[key]) {
            params[key].apply(historyState[key])
          }
        }
      })
    }

    handler()

    window.addEventListener('popstate', handler)

    const disposeStateReaction = storeState.observe_(({ newValue }) => {
      const historyState = getStateFromHistory()

      if (!comparer.shallow(historyState, newValue)) {
        handlePopState = false
        pushQueryParams(newValue)
        handlePopState = true
      }
    })

    return () => {
      disposeStateReaction()
      window.removeEventListener('popstate', handler)
    }
  }

  observer.useHook = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => observer(), [])
  }

  // prevent mobx to use as observable
  Object.assign(observer, {
    [$mobx]: true,
  })

  return observer
}
