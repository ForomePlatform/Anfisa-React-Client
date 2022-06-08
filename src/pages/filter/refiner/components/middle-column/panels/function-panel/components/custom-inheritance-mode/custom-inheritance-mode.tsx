import { useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { CustomInheritanceModeCondition } from '@components/conditions/custom-inheritance-mode-condition/custom-inheritance-mode-condition'
import { refinerFunctionsStore } from '@pages/filter/refiner/components/attributes/refiner-functions.store'
import { refinerStatFuncStore } from '@pages/filter/refiner/components/attributes/refiner-stat-func.store'
import { AttributeKinds } from '@service-providers/common'
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

  const handleSaveChanges = useCallback(
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
      <CustomInheritanceModeCondition
        problemGroups={problemGroups}
        initialScenario={initialScenario}
        initialMode={initialMode}
        attributeSubKind={attributeSubKind}
        statFuncStore={refinerStatFuncStore}
        onTouch={() => filterStore.setTouched(true)}
        controls={({ mode, hasErrors, param, clearValue }) => {
          return (
            <div className="flex-1 flex items-end justify-end mt-1 pb-[40px]">
              <Button
                variant={'secondary'}
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
                onClick={() => handleSaveChanges(mode, param)}
                disabled={hasErrors || !isFilterTouched}
              />
            </div>
          )
        }}
      />
    </>
  )
})
