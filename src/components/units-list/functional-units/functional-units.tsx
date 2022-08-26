import styles from './functional-units.module.css'

import { ReactElement, useMemo, useRef, useState } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { TFunctionalUnit } from '@store/stat-units'
import { MenuList, MenuListItem } from '@ui/menu-list'
import { Popover } from '@ui/popover'
import { FnLabel } from '@components/fn-label'
import { TFunctionalCondition } from '@components/units-list'
import { popoverOffset } from '@pages/ws/ws.constants'
import { TPropertyStatus } from '@service-providers/common'

interface IFunctionalUnitsProps {
  className?: string
  units: TFunctionalUnit[]
  onSelect: (unit: TPropertyStatus) => void
  conditions?: TFunctionalCondition[]
  onConditionSelect?: (condition: TFunctionalCondition) => void
}

export const FunctionalUnits = ({
  className,
  units,
  onSelect,
  conditions,
  onConditionSelect,
}: IFunctionalUnitsProps): ReactElement => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const titleRef = useRef<HTMLDivElement>(null)
  const closeMenu = () => setMenuOpen(false)

  const attributeNameToAdd = filterStore.attributeNameToAdd
  const selectedAttribute = filterStore.selectedAttributeStatus?.name

  const isFuncUnitToAdd = useMemo(() => {
    return units.some(unit => unit.name === attributeNameToAdd)
  }, [units, attributeNameToAdd])

  return (
    <>
      <div className={className}>
        <div ref={titleRef} className={cn(styles.title, 'mb-3')}>
          <FnLabel className="mr-2" />
          <span className={styles.title}>{t('unitsList.functionalUnits')}</span>
          <button
            className={styles.title__button}
            onClick={() => setMenuOpen(true)}
          >
            +
          </button>
        </div>

        {conditions?.map(condition => {
          const isSelected = condition.name === selectedAttribute
          return (
            <div key={condition.key} className={cn(styles.condition)}>
              <div
                className={cn(
                  styles.condition__label,
                  isSelected && styles.condition__label_selected,
                )}
                onClick={() => onConditionSelect?.(condition)}
              >
                {condition.name}
              </div>
            </div>
          )
        })}

        {isFuncUnitToAdd && (
          <div className={styles.condition}>
            <div className={styles.condition__label}>{attributeNameToAdd}</div>
          </div>
        )}
      </div>
      <Popover
        isOpen={isMenuOpen}
        anchorEl={titleRef.current}
        onClose={closeMenu}
        offset={popoverOffset}
      >
        <MenuList className={styles.menu}>
          {units.map(unit => (
            <MenuListItem
              key={unit.name}
              label={unit.name}
              onClick={() => {
                onSelect(unit)
                closeMenu()
              }}
            />
          ))}
        </MenuList>
      </Popover>
    </>
  )
}
