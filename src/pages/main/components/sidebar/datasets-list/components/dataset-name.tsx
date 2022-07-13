import { FC, useEffect, useRef, useState } from 'react'
import cn, { Argument } from 'classnames'

import { Tooltip } from '@ui/tooltip'
import { FilterDatasetDataCy } from '@data-testid'
import { XLBage } from './dataset-bage'

interface IDsNameProps {
  dsName: any
  kind: string | null
  isActive: boolean
  isActiveParent: boolean
  isChildrenVisible?: boolean
  className?: Argument
}

export const DatasetName: FC<IDsNameProps> = ({
  dsName,
  kind,
  isActive,
  isActiveParent,
  isChildrenVisible,
  className,
}) => {
  const datasetRef = useRef<any>(null)

  const isXL = kind?.toLocaleLowerCase() === 'xl'

  const name = isXL && /^xl_.*/i.test(dsName) ? dsName.substring(3) : dsName

  const [hasTooltip, setHasTooltip] = useState<boolean>(false)

  useEffect(() => {
    const container = datasetRef?.current
    const isTooltipNeeded = container
      ? container.clientWidth < container.scrollWidth
      : false

    setHasTooltip(isTooltipNeeded)
  }, [])

  const fontColor = kind === null ? 'text-grey-blue' : 'text-white'
  const fontWeight = isXL
    ? 'font-bold'
    : isActive || isActiveParent
    ? 'font-medium'
    : ''

  return (
    <>
      {isXL && <XLBage isActive={isActive} />}

      <Tooltip
        title={hasTooltip ? dsName : null}
        placement="right"
        theme="light"
      >
        <div
          ref={datasetRef}
          className={cn(
            'text-sm leading-18px relative ml-2 pr-4',
            fontColor,
            fontWeight,
            {
              truncate: !isChildrenVisible,
              'py-2': !kind,
            },
            className,
          )}
          data-testid={FilterDatasetDataCy.datasetsListElem}
        >
          {name}
        </div>
      </Tooltip>
    </>
  )
}
