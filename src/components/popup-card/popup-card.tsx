import styles from './popup-card.module.css'

import React, { ReactNode } from 'react'
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
  additionalBottomButton?: Element
  applyAppend?: ReactNode
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
  additionalBottomButton,
  applyAppend,
}: React.PropsWithChildren<IPopupCardProps>) => (
  <section className={cn(styles.popupCard, className)}>
    <header className={cn(styles.popupCard__header)}>
      <span className={styles.popupCard__header_title}>{title}</span>
      <Icon
        name="Close"
        onClick={onClose}
        size={16}
        className={styles.popupCard__header_icon}
      />
    </header>

    <div className={styles.popupCard__content}>{children}</div>

    <footer className={styles.popupCard__footer}>
      {additionalBottomButton && additionalBottomButton}

      <div className={styles.popupCard__footer_buttonContainer}>
        <Button
          size="sm"
          text={cancelText || t('general.cancel')}
          onClick={onClose}
          variant="secondary"
        />

        <Button
          disabled={isApplyDisabled || isLoading}
          size="sm"
          variant="primary"
          text={applyText || t('general.apply')}
          isLoading={isLoading}
          className={styles.popupCard__footer_buttonContainer_button}
          onClick={onApply}
          dataTestId={MainTableDataCy.applyButton}
          append={applyAppend}
        />
      </div>
    </footer>
  </section>
)
