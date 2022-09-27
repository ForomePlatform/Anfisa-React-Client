import { ReactElement, useMemo, useState } from 'react'

import { t } from '@i18n'
import stepStore from '@store/dtree/step.store'
import { Radio } from '@ui/radio'
import {
  AspectCellRenderClass,
  ITableAspectDescriptor,
} from '@service-providers/dataset-level/dataset-level.interface'
import { AspectWindowBase, IAspectWindowBaseProps } from './aspect-window-base'

export const AspectWindowTranscripts = ({
  aspect: aspectProp,
  isOpen,
  ...restProps
}: IAspectWindowBaseProps): ReactElement => {
  const aspect = aspectProp as ITableAspectDescriptor
  const [isFiltered, setIsFiltered] = useState(false)
  const [isIncludedOnly, setIsIncludedOnly] = useState(false)

  const { shouldNegateDetails } = stepStore

  const preparedAspect = useMemo(() => {
    return isFiltered
      ? {
          ...aspect,
          rows: aspect.rows.map(row => ({
            ...row,
            cells: row.cells.filter(cell => {
              const hasIncluded = cell[1]
                ?.split(' ')
                .includes(AspectCellRenderClass.Hit)

              return isIncludedOnly ? !!hasIncluded : !hasIncluded
            }),
          })),
        }
      : aspect
  }, [aspect, isFiltered, isIncludedOnly])

  return (
    <AspectWindowBase
      titleAdornment={
        isOpen && (
          <div className="flex">
            <label className="mx-4 whitespace-nowrap flex items-center cursor-pointer">
              <Radio
                className="mr-3"
                checked={!isFiltered}
                onChange={() => {
                  setIsFiltered(false)
                }}
              >
                <span className="text-xs">{t('variant.showAll')}</span>
              </Radio>
              <Radio
                className="mr-3"
                checked={isFiltered && isIncludedOnly}
                onChange={() => {
                  setIsFiltered(true)
                  setIsIncludedOnly(true)
                }}
              >
                <span className="text-xs">{t('variant.showIncludedOnly')}</span>
              </Radio>
              <Radio
                checked={isFiltered && !isIncludedOnly}
                onChange={() => {
                  setIsFiltered(true)
                  setIsIncludedOnly(false)
                }}
              >
                <span className="text-xs">{t('variant.showExcludedOnly')}</span>
              </Radio>
            </label>
            {shouldNegateDetails && (
              <span className="text-xs mr-3 text-grey-blue">
                (selection marks trancripts to keep)
              </span>
            )}
          </div>
        )
      }
      aspect={preparedAspect}
      isOpen={isOpen}
      {...restProps}
    />
  )
}
