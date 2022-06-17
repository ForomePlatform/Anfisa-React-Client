import React, { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'
import { CompoundRequestCondition } from '@components/conditions/compound-request/compound-request-condition'
import { refinerFunctionsStore } from '@pages/filter/refiner/components/attributes/refiner-functions.store'
import { refinerStatFuncStore } from '@pages/filter/refiner/components/attributes/refiner-stat-func.store'
import { AttributeKinds } from '@service-providers/common'
import { renderPanelControls } from '../../../components/renderPanelControls'
import { savePanelAttribute } from '../../../utils/save-pannel-attribute'

export const CompoundRequest = observer((): ReactElement => {
  const {
    attributeName,
    problemGroups,
    initialApprox,
    initialRequestCondition,
    initialMode,
    initialCondition,
    attributeSubKind,
  } = refinerFunctionsStore

  const { isFilterTouched } = filterStore

  const saveAttribute = useCallback(
    (mode, param) => {
      savePanelAttribute({
        filterKind: AttributeKinds.FUNC,
        attributeName,
        mode,
        param,
      })
    },
    [attributeName],
  )

  return (
    <>
      <CompoundRequestCondition
        problemGroups={problemGroups}
        initialApprox={initialApprox}
        initialRequestCondition={initialRequestCondition}
        initialMode={initialMode}
        attributeSubKind={attributeSubKind}
        statFuncStore={refinerStatFuncStore}
        onTouch={() => filterStore.setTouched(true)}
        controls={({ mode, hasErrors, param, clearValue }) =>
          renderPanelControls({
            initialCondition,
            disabled: hasErrors || !isFilterTouched,
            saveAttribute: () => saveAttribute(mode, param),
            clearValue,
          })
        }
      />
    </>
  )
})
