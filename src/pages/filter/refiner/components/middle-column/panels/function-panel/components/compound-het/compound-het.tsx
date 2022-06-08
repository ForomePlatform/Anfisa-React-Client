import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { CompoundHetCondition } from '@components/conditions/compound-het-condition/compound-het-condition'
import { refinerFunctionsStore } from '@pages/filter/refiner/components/attributes/refiner-functions.store'
import { refinerStatFuncStore } from '@pages/filter/refiner/components/attributes/refiner-stat-func.store'
import { AttributeKinds } from '@service-providers/common'
import { savePanelAttribute } from '../../../utils/save-pannel-attribute'

export const CompundHet = observer((): ReactElement => {
  const {
    attributeName,
    initialApprox,
    initialMode,
    initialCondition,
    attributeSubKind,
  } = refinerFunctionsStore

  return (
    <CompoundHetCondition
      initialMode={initialMode}
      initialApprox={initialApprox}
      attributeSubKind={attributeSubKind}
      statFuncStore={refinerStatFuncStore}
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
              onClick={() =>
                savePanelAttribute({
                  filterKind: AttributeKinds.FUNC,
                  attributeName,
                  mode,
                  selectedVariants: ['Proband'],
                  param,
                })
              }
              disabled={hasErrors}
            />
          </div>
        )
      }}
    />
  )
})
