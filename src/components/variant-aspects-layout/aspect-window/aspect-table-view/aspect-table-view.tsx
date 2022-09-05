import style from './aspect-table-view.module.css'

import { MouseEvent, ReactElement, Ref } from 'react'
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
  columnRef?: Ref<HTMLTableDataCellElement>
}

const titleRowWithLinks = 'IGV' // Contains outdated links

export const AspectTableView = ({
  className,
  aspect,
  searchValue,
  columnRef,
  shouldAddShadow,
}: IAspectTableViewProps): ReactElement => {
  const { rows } = aspect

  const notApplicableCounter =
    rows.length &&
    rows[0].cells.filter(cell =>
      cell[1].includes(AspectCellRenderClass.NoTrHit),
    )?.length

  const onMouseDownHandler = (event: MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <div className={className}>
      {rows?.length === 0 ? (
        <div className="text-center w-full p-2">
          {t('variant.noDataToShow')}
        </div>
      ) : (
        <>
          <table className="min-w-full">
            <tbody>
              {notApplicableCounter > 0 && (
                <tr key="notApplicableMessage">
                  <td
                    className={cn(
                      style.firstColumn,
                      shouldAddShadow && 'bg-blue-darkHover opacity-100',
                    )}
                  >
                    {t('mainTable.transcriptsNotApplicable', {
                      counter: notApplicableCounter,
                    })}
                  </td>
                </tr>
              )}
              {rows?.map((row, index) => {
                if (!row || row.title === titleRowWithLinks) {
                  return <tr key={index} />
                }

                const isSearched = searchValue.trim()
                  ? row.title
                      .toLocaleLowerCase()
                      .startsWith(searchValue.toLocaleLowerCase())
                  : false

                return (
                  <tr key={row.name}>
                    <td
                      className={cn(
                        style.firstColumn,
                        shouldAddShadow && 'bg-blue-darkHover opacity-100',
                      )}
                      ref={!index ? columnRef : undefined}
                    >
                      <Tooltip
                        maxWidth={600}
                        theme="light"
                        title={row.tooltip}
                        placement="bottom-start"
                      >
                        <span
                          className={cn('cursor-auto', {
                            'aspect-window__content_active bg-yellow-bright p-1':
                              isSearched,
                          })}
                          onMouseDownCapture={onMouseDownHandler}
                        >
                          {row.title}
                        </span>
                      </Tooltip>
                    </td>

                    {row.cells.map((cell, cIndex) => (
                      <td
                        key={cIndex}
                        className={cn(
                          'py-3 pr-3 font-normal w-auto',
                          cell[0]?.includes('</a>')
                            ? 'text-blue-bright'
                            : !cell[1]?.includes(
                                AspectCellRenderClass.NoTrHit,
                              ) && 'text-white',
                          style.linkContainer,
                        )}
                      >
                        <span
                          className={cn('cursor-auto', style.geneTranscripts)}
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
        </>
      )}
    </div>
  )
}
