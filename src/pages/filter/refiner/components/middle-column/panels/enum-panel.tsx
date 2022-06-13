import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import {
  DEFAULT_COUNT,
  EnumCondition,
} from '@components/conditions/enum-condition/enum-condition'
import { AttributeKinds } from '@service-providers/common'
import { refinerAttributeStore } from '../../attributes/refiner-attributes.store'
import { AttributeHeader } from '../attribute-header'
import { DividerHorizontal } from '../components/divider-horizontal'
import { savePanelAttribute } from './utils/save-pannel-attribute'

export const EnumPanel = observer((): ReactElement => {
  const {
    attributeName,
    enumVariants,
    attributeSubKind,
    initialEnumVariants,
    initialEnumMode,
  } = refinerAttributeStore

  const { isFilterTouched, selectedAttributeStatus } = filterStore

  return (
    <>
      <AttributeHeader attrStatus={selectedAttributeStatus!} />

      <DividerHorizontal />

      <EnumCondition
        attributeName={attributeName}
        enumVariants={enumVariants}
        attributeSubKind={attributeSubKind}
        initialEnumVariants={initialEnumVariants}
        initialEnumMode={initialEnumMode}
        isShowZeroes={refinerAttributeStore.isShowZeroVariants}
        toggleShowZeroes={refinerAttributeStore.setIsShowZeroVariants}
        onTouch={() => filterStore.setTouched(true)}
        paginationHeight={`calc(100% - ${
          enumVariants.length > DEFAULT_COUNT ? 249 : 203
        }px)`}
        controls={({ value, mode, clearValue }) => {
          return (
            <div className="flex-1 flex items-end justify-end mt-1 pb-6">
              <Button
                variant={'secondary'}
                text={t('general.clear')}
                onClick={clearValue}
                className="px-5 mr-2"
              />
              <Button
                text={
                  initialEnumVariants
                    ? t('dtree.saveChanges')
                    : t('dtree.addAttribute')
                }
                onClick={() =>
                  savePanelAttribute({
                    filterKind: AttributeKinds.ENUM,
                    attributeName,
                    selectedVariants: value,
                    mode,
                  })
                }
                disabled={!value.length || !isFilterTouched}
              />
            </div>
          )
        }}
      />
    </>
  )
})
