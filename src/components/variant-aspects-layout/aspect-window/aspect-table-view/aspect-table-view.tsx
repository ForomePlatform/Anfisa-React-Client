import style from './aspect-table-view.module.css'

import { MouseEvent, ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { Tooltip } from '@ui/tooltip'
import {
  AspectCellRenderClass,
  ITableAspectDescriptor,
} from '@service-providers/dataset-level/dataset-level.interface'

interface IAspectTableViewProps {
  className?: string
  aspect: ITableAspectDescriptor
  searchValue: string
  shouldAddShadow?: boolean
}

export const AspectTableView = ({
  className,
  aspect,
  searchValue,
  shouldAddShadow,
}: IAspectTableViewProps): ReactElement => {
  const { colhead, rows } = aspect

  const onMouseDownHandler = (event: MouseEvent) => {
    event.stopPropagation()
  }

  const count = colhead?.[0]?.[1]

  return (
    <div className={className}>
      {rows?.length === 0 ? (
        <div className="text-center w-full p-2">
          {t('variant.noDataToShow')}
        </div>
      ) : (
        <table className="min-w-full">
          <tbody>
            {rows?.map((row, index) => {
              if (!row) return <tr key={index} />

              const blueBg = 'p-3 bg-blue-darkHover'

              const shouldShowCount = count && index === 0

              const isSearched = searchValue.trim()
                ? row.title
                    .toLocaleLowerCase()
                    .includes(searchValue.toLocaleLowerCase())
                : false

              return (
                <tr key={row.name}>
                  <td
                    className={cn(
                      'p-3 text-blue-bright whitespace-nowrap sticky left-0',
                      shouldAddShadow && blueBg,
                    )}
                  >
                    <Tooltip
                      maxWidth={600}
                      theme="light"
                      title={row.tooltip}
                      placement="bottom-start"
                    >
                      <span
                        className={cn('cursor-auto', {
                          'border border-blue-bright': isSearched,
                          'aspect-window__content_active': isSearched,
                        })}
                        onMouseDownCapture={onMouseDownHandler}
                      >
                        {shouldShowCount
                          ? `${row.title} [${count}]`
                          : row.title}
                      </span>
                    </Tooltip>
                  </td>

                  {row.cells.map((cell, cIndex) => (
                    <td
                      key={cIndex}
                      className={cn(
                        'py-3 pr-3 font-normal',
                        cell[0]?.includes('</a>')
                          ? 'text-blue-bright'
                          : !cell[1]?.includes(AspectCellRenderClass.NoTrHit) &&
                              'text-grey-blue',
                        style.linkContainer,
                      )}
                    >
                      <span
                        className="cursor-auto"
                        onMouseDownCapture={onMouseDownHandler}
                        dangerouslySetInnerHTML={{ __html: cell[0] }}
                      />
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
