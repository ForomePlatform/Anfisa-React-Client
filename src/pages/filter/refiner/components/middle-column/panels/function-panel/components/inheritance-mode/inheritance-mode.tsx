import { useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { InheritanceModeCondition } from '@components/conditions/inheritance-mode-condition/inheritance-mode-condition'
import { refinerFunctionsStore } from '@pages/filter/refiner/components/attributes/refiner-functions.store'
import { refinerStatFuncStore } from '@pages/filter/refiner/components/attributes/refiner-stat-func.store'
import { AttributeKinds } from '@service-providers/common'
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

  const handleSaveChanges = useCallback(
    (mode, values, param) => {
      savePanelAttribute({
        filterKind: AttributeKinds.FUNC,
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
      controls={({ values, mode, hasErrors, param, clearValue }) => {
        return (
          <div className="flex-1 flex items-end justify-end mt-1 pb-[40px]">
            <Button
              variant="secondary"
              text={t('general.clear')}
              onClick={clearValue}
              className="px-5 mr-2"
            />
            <Button
              text={
                initialCondition
                  ? t('dtree.saveChanges')
                  : t('dtree.addAttribute')
              }
              onClick={() => handleSaveChanges(mode, values, param)}
              disabled={hasErrors || !isFilterTouched}
            />
          </div>
        )
      }}
    />
  )
})
