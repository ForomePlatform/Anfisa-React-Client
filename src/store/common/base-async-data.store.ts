import {
  action,
  comparer,
  computed,
  makeObservable,
  observable,
  onBecomeObserved,
  onBecomeUnobserved,
  reaction,
  runInAction,
  toJS,
} from 'mobx'

export type TBaseDataStoreOptions = {
  keepPreviousData?: boolean
}

export type TBaseDataStoreFetchOptions = {
  abortSignal: AbortSignal
}

// TODO: automatic data and cache invalidation with timeout
// TODO: automatic refetch in background

const defaultOptions: TBaseDataStoreOptions = {
  keepPreviousData: false,
}

export abstract class BaseAsyncDataStore<Data, Request> {
  private _lastUpdate = 0
  private _didInvalidate = false
  private _isFetching = false
  private _error: Error | null = null
  private _request: Request | undefined
  private _data: Data | undefined

  private readonly keepPreviousData: boolean
  private abortController: AbortController | null = null
  private readonly cache: Map<string, { lastUpdate: number; data: Data }> =
    new Map()

  protected constructor(options: TBaseDataStoreOptions = {}) {
    makeObservable<
      BaseAsyncDataStore<Data, Request>,
      | '_lastUpdate'
      | '_didInvalidate'
      | '_isFetching'
      | '_error'
      | '_request'
      | '_data'
    >(this, {
      _lastUpdate: observable,
      _didInvalidate: observable,
      _isFetching: observable,
      _error: observable,
      _request: observable,
      _data: observable,
      isFetching: computed,
      lastUpdate: computed,
      isLoading: computed,
      error: computed,
      request: computed.struct,
      data: computed,
      invalidate: action,
      reset: action,
    })

    const { keepPreviousData } = { ...defaultOptions, ...options }
    this.keepPreviousData = keepPreviousData ?? false

    let disposeObserver: () => void

    onBecomeObserved(this, 'data', () => {
      const disposeInvalidator = reaction(
        () => this.request,
        () => {
          this._didInvalidate = true
        },
      )

      const disposeFetcher = reaction(
        () => this._didInvalidate,
        didInvalidate => {
          if (didInvalidate) {
            this.doFetch()
          }
        },
        {
          fireImmediately: true,
        },
      )

      disposeObserver = () => {
        disposeInvalidator()
        disposeFetcher()
      }
    })

    onBecomeUnobserved(this, 'data', () => {
      disposeObserver()
    })
  }

  public get isFetching(): boolean {
    return this._isFetching
  }

  public get lastUpdate(): number {
    return this._lastUpdate
  }

  public get isLoading(): boolean {
    return this._isFetching && !this._lastUpdate
  }

  public get error(): Error | null {
    return this._error
  }

  public get request(): Readonly<Request> | undefined {
    return toJS(this._request)
  }

  public set request(request) {
    this._request = request
  }

  public invalidate(): void {
    if (this.request) {
      const cacheKey = this.getCacheKey(this.request)

      if (cacheKey) {
        this.cache.delete(cacheKey)
      }
    }

    this._didInvalidate = true
  }

  public reset(): void {
    this._lastUpdate = 0
    this._didInvalidate = false
    this._isFetching = false
    this._error = null
    this._request = undefined
    this._data = undefined

    this.cache.clear()
  }

  public get data(): Data | undefined {
    return this._data
  }

  // usually you don't want to set data manually
  // but, it can be useful when you have partial response
  protected set data(data: Data | undefined) {
    runInAction(() => {
      this._data = data
      this._lastUpdate = Date.now()
    })
  }

  protected clearCache(): void {
    this.cache.clear()
  }

  protected abstract fetch(
    request: Request,
    options: TBaseDataStoreFetchOptions,
  ): Promise<Data>

  // by default cache is disabled with `undefined` key
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getCacheKey(request: Request): string | undefined {
    return undefined
  }

  private fetchFromCache(request: Request): boolean {
    const cacheKey = this.getCacheKey(request)

    if (cacheKey) {
      const cached = this.cache.get(cacheKey)

      if (cached) {
        runInAction(() => {
          this._didInvalidate = false
          this._isFetching = false
          this._error = null
          this._data = cached.data
          this._lastUpdate = cached.lastUpdate
        })

        return true
      }
    }

    return false
  }

  private doFetch(): void {
    if (this._isFetching && this.abortController) {
      this.abortController.abort()
    }
    const request = this.request

    if (request !== undefined) {
      if (this.fetchFromCache(request)) {
        return
      }

      this.abortController = new AbortController()

      runInAction(() => {
        this._didInvalidate = false
        this._isFetching = true
        this._error = null

        if (!this.keepPreviousData) {
          this._data = undefined
        }
      })

      this.fetch(request, { abortSignal: this.abortController.signal }).then(
        data => {
          const lastUpdate = Date.now()

          if (comparer.structural(request, this.request)) {
            runInAction(() => {
              this._data = data
              this._lastUpdate = lastUpdate
              this._isFetching = false
            })
          }

          const cacheKey = this.getCacheKey(request)

          if (cacheKey) {
            this.cache.set(cacheKey, { lastUpdate, data })
          }
        },
        error => {
          if (!(error instanceof DOMException) || error.name !== 'AbortError') {
            runInAction(() => {
              this._isFetching = false
              this._error = error
            })
          }
        },
      )
    }
  }
}
