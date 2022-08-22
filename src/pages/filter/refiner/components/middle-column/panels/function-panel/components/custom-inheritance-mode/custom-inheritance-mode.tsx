import { useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'
import { CustomInheritanceModeCondition } from '@components/conditions/custom-inheritance-mode'
import { refinerFunctionsStore } from '@pages/filter/refiner/components/attributes/refiner-functions.store'
import { refinerStatFuncStore } from '@pages/filter/refiner/components/attributes/refiner-stat-func.store'
import { AttributeKinds } from '@service-providers/common'
import { renderPanelControls } from '../../../components/renderPanelControls'
import { savePanelAttribute } from '../../../utils/save-pannel-attribute'

export const CustomInheritanceMode = observer(() => {
  const {
    attributeName,
    problemGroups,
    initialScenario,
    initialMode,
    initialCondition,
    attributeSubKind,
  } = refinerFunctionsStore

  const { isFilterTouched } = filterStore

  const saveAttribute = useCallback(
    (mode, param) => {
      savePanelAttribute({
        attributeKind: AttributeKinds.FUNC,
        attributeName,
        selectedVariants: ['True'],
        mode,
        param,
      })
    },
    [attributeName],
  )

  return (
    <div className="px-4">
      <CustomInheritanceModeCondition
        problemGroups={problemGroups}
        initialScenario={initialScenario}
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
    </div>
  )
})
