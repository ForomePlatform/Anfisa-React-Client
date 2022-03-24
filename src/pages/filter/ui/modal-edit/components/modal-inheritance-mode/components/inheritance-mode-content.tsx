import { ChangeEvent, Fragment } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { DisabledVariantsAmount } from '../../../../query-builder/ui/disabled-variants-amount'
import { ModsDivider } from '../../../../query-builder/ui/mods-divider'

interface IProps {
  problemGroups: string[]
  setProblemGroups: (e: boolean, group: string) => void
  selectedProblemGroups: string[]
  handleReset: () => void
}

export const InheritanceModeContent = observer(
  ({
    problemGroups,
    setProblemGroups,
    selectedProblemGroups,
    handleReset,
  }: IProps) => {
    const variants = dtreeStore.statFuncData.variants

    const handleCheckGroupItem = (checked: boolean, name: string) => {
      if (checked) {
        dtreeStore.addSelectedFilter(name)
        return
      }

      dtreeStore.removeSelectedFilter(name)
    }

    const setAll = (checked: boolean) => () => {
      const allVariants = toJS(variants)
      allVariants &&
        allVariants.forEach((variant: any[]) =>
          handleCheckGroupItem(checked, variant[0]),
        )
    }

    const clearAll = setAll(false)
    const selectAll = setAll(true)

    return (
      <Fragment>
        <div className="flex items-center justify-between w-full mt-4 text-14">
          <div>{t('dtree.problemGroup')}</div>

          {problemGroups.map((group: string) => (
            <div key={group}>
              <Checkbox
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setProblemGroups(e.target.checked, group)
                }
                checked={selectedProblemGroups.includes(group)}
                className="mx-1 cursor-pointer"
              />
              <span>{group}</span>
            </div>
          ))}

          <Button
            onClick={handleReset}
            text="Reset"
            variant="secondary"
            className="h-4/5"
          />
        </div>

        <div className="flex justify-between w-full mt-4">
          <div className="text-14 text-grey-blue">
            {dtreeStore.selectedFilters.length} {t('dtree.selected')}
          </div>

          <div className="flex">
            <div
              className="text-14 text-blue-bright cursor-pointer"
              onClick={selectAll}
            >
              {t('general.selectAll')}
            </div>

            <ModsDivider />

            <div
              className="text-14 text-blue-bright cursor-pointer"
              onClick={clearAll}
            >
              {t('general.clearAll')}
            </div>
          </div>
        </div>

        <DisabledVariantsAmount
          variants={variants}
          disabled={false}
          handleCheckGroupItem={handleCheckGroupItem}
        />
      </Fragment>
    )
  },
)
