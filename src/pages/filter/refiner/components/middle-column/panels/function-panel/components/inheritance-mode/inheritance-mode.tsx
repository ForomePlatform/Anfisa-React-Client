import { useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'
import { InheritanceModeCondition } from '@components/conditions/inheritance-mode'
import { refinerFunctionsStore } from '@pages/filter/refiner/components/attributes/refiner-functions.store'
import { refinerStatFuncStore } from '@pages/filter/refiner/components/attributes/refiner-stat-func.store'
import { AttributeKinds } from '@service-providers/common'
import { renderPanelControls } from '../../../components/renderPanelControls'
import { savePanelAttribute } from '../../../utils/save-pannel-attribute'

export const InheritanceMode = observer(() => {
  const {
    attributeName,
    problemGroups,
    initialVariants,
    initialProblemGroups,
    initialMode,
    initialCondition,
    attributeSubKind,
  } = refinerFunctionsStore

  const { isFilterTouched } = filterStore

  const saveAttribute = useCallback(
    (mode, values, param) => {
      savePanelAttribute({
        attributeKind: AttributeKinds.FUNC,
        attributeName,
        mode,
        selectedVariants: values,
        param,
      })
    },
    [attributeName],
  )

  return (
    <InheritanceModeCondition
      problemGroups={problemGroups}
      initialVariants={initialVariants}
      initialProblemGroups={initialProblemGroups}
      initialMode={initialMode}
      attributeSubKind={attributeSubKind}
      statFuncStore={refinerStatFuncStore}
      onTouch={() => filterStore.setTouched(true)}
      className="px-4"
      controls={({ values, mode, hasErrors, param, clearValue }) =>
        renderPanelControls({
          initialCondition,
          disabled: hasErrors || !isFilterTouched,
          saveAttribute: () => saveAttribute(mode, values, param),
          clearValue,
        })
      }
    />
  )
})
