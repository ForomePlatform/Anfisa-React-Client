import React from 'react'
import cn, { Argument } from 'classnames'
import styled, { css } from 'styled-components'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'

export interface IPopperModalProps {
  title: string
  cancelText?: string
  applyText?: string
  className?: Argument
  onClose?: () => void
  onApply?: () => void
  position?: 'default' | 'absolute'
  isApplyDisabled?: boolean
}

const Wrapper = styled.div<{ isAbsolute: boolean }>`
  ${props => {
    return props.isAbsolute
      ? css`
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        `
      : ''
  }}
`

export const PopperModal = ({
  title,
  cancelText,
  applyText,
  children,
  className,
  onClose,
  onApply,
  position = 'default',
  isApplyDisabled = false,
}: React.PropsWithChildren<IPopperModalProps>) => {
  return (
    <Wrapper isAbsolute={position === 'absolute'}>
      <div
        className={cn(
          'bg-white shadow-card rounded',
          className,
          position === 'absolute' && 'absolute',
        )}
      >
        <div className="px-4 pt-4">
          <div className="flex justify-between mb-5 items-center">
            <p className="text-blue-dark  font-medium ">{title}</p>
            <Icon
              name="Close"
              onClick={onClose}
              size={16}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full px-4">{children}</div>
        <div className="flex justify-end pb-4 px-4 mt-4">
          <Button
            text={cancelText || t('general.cancel')}
            variant="secondary"
            onClick={onClose}
          />

          <Button
            disabled={isApplyDisabled}
            text={applyText || t('general.apply')}
            className="ml-3"
            onClick={onApply}
            dataTestId={MainTableDataCy.applyButton}
          />
        </div>
      </div>
    </Wrapper>
  )
}
