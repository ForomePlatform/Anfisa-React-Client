import styles from '../macro-tagging.module.css'

import { FC } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { MainTableDataCy } from '@data-testid'

interface IMacroTaggingButtonProps {
  onClick: (target: HTMLElement) => void
  isOpen: boolean
}

export const MacroTaggingButton: FC<IMacroTaggingButtonProps> = ({
  onClick,
  isOpen,
}) => (
  <Button
    dataTestId={MainTableDataCy.macroTagging}
    prepend={
      <Icon name="Tag" size={16} className={styles.macroTagging__buttonIcon} />
    }
    text={t('ds.macroTagging')}
    append={
      <Icon
        name="Arrow"
        size={14}
        className={cn(
          styles.macroTagging__buttonIcon_arrow,
          isOpen && styles.macroTagging__buttonIcon_arrow_opened,
        )}
      />
    }
    onClick={e => onClick(e.currentTarget)}
    variant="secondary-dark"
    size="sm"
  />
)
