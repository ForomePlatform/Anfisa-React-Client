import React from 'react'
import cn, { Argument } from 'classnames'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { MainTableDataCy } from '@data-testid'

export interface IPopupCardProps {
  title: string | JSX.Element
  cancelText?: string
  applyText?: string
  className?: Argument
  onClose?: () => void
  onApply?: () => void
  isApplyDisabled?: boolean
  isLoading?: boolean
  isBlueBg?: boolean
  additionalBottomButton?: JSX.Element
}

export const PopupCard = ({
  title,
  cancelText,
  applyText,
  children,
  className,
  onClose,
  onApply,
  isLoading,
  isApplyDisabled = false,
  isBlueBg = false,
  additionalBottomButton,
}: React.PropsWithChildren<IPopupCardProps>) => (
  <div
    className={cn(
      'shadow-card rounded',
      `${isBlueBg ? 'bg-blue-light' : 'bg-white'}`,
      className,
    )}
  >
    <div className="px-4 pt-4">
      <div className="flex justify-between mb-4 items-center">
        <span className="text-blue-dark font-medium">{title}</span>
        <Icon
          name="Close"
          onClick={onClose}
          size={16}
          className="cursor-pointer"
        />
      </div>
    </div>
    <div className="w-full px-4">{children}</div>

    <div className="flex justify-between pb-4 px-4 mt-4">
      <div>{additionalBottomButton && additionalBottomButton}</div>

      <div className="flex justify-between">
        <Button
          size="sm"
          text={cancelText || t('general.cancel')}
          onClick={onClose}
          variant="secondary"
        />

        <Button
          disabled={isApplyDisabled || isLoading}
          size="sm"
          text={applyText || t('general.apply')}
          isLoading={isLoading}
          className="ml-3"
          onClick={onApply}
          dataTestId={MainTableDataCy.applyButton}
        />
      </div>
    </div>
  </div>
)
