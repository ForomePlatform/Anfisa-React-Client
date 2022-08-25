import { ReactElement, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'
import { CompoundHetCondition } from '@components/conditions/compound-het-condition'
import { refinerFunctionsStore } from '@pages/filter/refiner/components/attributes/refiner-functions.store'
import { refinerStatFuncStore } from '@pages/filter/refiner/components/attributes/refiner-stat-func.store'
import { AttributeKinds } from '@service-providers/common'
import { renderPanelControls } from '../../../components/renderPanelControls'
import { savePanelAttribute } from '../../../utils/save-pannel-attribute'

export const CompundHet = observer((): ReactElement => {
  const {
    attributeName,
    initialApprox,
    initialMode,
    initialCondition,
    attributeSubKind,
  } = refinerFunctionsStore

  const saveAttribute = useCallback(
    (mode, param) => {
      savePanelAttribute({
        attributeKind: AttributeKinds.FUNC,
        attributeName,
        selectedVariants: ['Proband'],
        mode,
        param,
      })
    },
    [attributeName],
  )

  return (
    <div className="px-4">
      <CompoundHetCondition
        initialMode={initialMode}
        initialApprox={initialApprox}
        attributeSubKind={attributeSubKind}
        statFuncStore={refinerStatFuncStore}
        onTouch={() => filterStore.setTouched(true)}
        controls={({ mode, hasErrors, param, clearValue }) =>
          renderPanelControls({
            initialCondition,
            disabled: hasErrors,
            saveAttribute: () => saveAttribute(mode, param),
            clearValue,
          })
        }
      />
    </div>
  )
})
