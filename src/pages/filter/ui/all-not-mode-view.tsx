import { ReactElement, useMemo } from 'react'
import { observer } from 'mobx-react-lite'

interface AllNotModeViewProps {
  filters: Record<string, number>
}

export const AllNotModeView = observer(
  ({ filters }: AllNotModeViewProps): ReactElement => {
    const filtersWithAllMode = useMemo(() => {
      return Object.keys(filters).includes('All')
    }, [filters])

    const filtersWithNotMode = useMemo(() => {
      return Object.keys(filters).includes('Not')
    }, [filters])

    return (
      <>
        {filtersWithAllMode && (
          <span className="ml-1 px-1 text-10 bg-green-medium  text-green-secondary rounded-sm">
            all
          </span>
        )}

        {filtersWithNotMode && (
          <span className="ml-1 px-1 text-10 bg-red-lighter  text-red-secondary rounded-sm ">
            not
          </span>
        )}
      </>
    )
  },
)
