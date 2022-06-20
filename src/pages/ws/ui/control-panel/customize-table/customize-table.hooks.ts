import { Dispatch, useEffect, useReducer } from 'react'

import { ViewTypeTableEnum } from '@core/enum/view-type-table-enum'
import { TCustomizableListItem } from '@components/customizable-list'
import { TCustomizeTableValues } from './customize-table.interface'

type TCustomizeTableAction =
  | {
      type: 'setValues'
      values: TCustomizeTableValues
    }
  | {
      type: 'setViewType'
      viewType: ViewTypeTableEnum
    }
  | {
      type: 'setColumns'
      columns: TCustomizableListItem[]
    }
  | { type: 'toggleAllColumns'; isHidden: boolean }

const customizeTableReducer = (
  state: TCustomizeTableValues,
  action: TCustomizeTableAction,
): TCustomizeTableValues => {
  switch (action.type) {
    case 'setValues':
      return action.values
    case 'setColumns':
      return {
        ...state,
        columns: action.columns,
      }
    case 'setViewType':
      return {
        ...state,
        viewType: action.viewType,
      }
    case 'toggleAllColumns':
      return {
        ...state,
        columns: state.columns.map(column => ({
          ...column,
          isHidden: action.isHidden,
        })),
      }
  }
}

export const useCustomizeTableValues = (
  initialValues: TCustomizeTableValues,
  reinitialize?: boolean,
): [TCustomizeTableValues, Dispatch<TCustomizeTableAction>] => {
  const [values, dispatch] = useReducer(customizeTableReducer, initialValues)

  useEffect(() => {
    if (reinitialize) {
      dispatch({
        type: 'setValues',
        values: initialValues,
      })
    }
  }, [initialValues, reinitialize])

  return [values, dispatch]
}
