import styles from './igv-modal.module.css'

import { ReactElement, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Icon } from '@ui/icon'
import { Modal } from '@ui/modal'
import modalsVisibilityStore from '@pages/filter/dtree/components/modals/modals-visibility-store'
import { IgvContent } from '@pages/igv/ui/igv-content'
import { IIgvParams } from '@service-providers/dataset-level'

interface IIgvModalProps {
  isOpen: boolean
  igvParams: IIgvParams | undefined
}

export const IgvModal = observer(
  ({ isOpen, igvParams }: IIgvModalProps): ReactElement => {
    const [isEachFilesMissing, setIsEachFilesMissing] = useState(false)

    const locus = igvParams?.locus
    const names = igvParams?.names
    const igvUrls = igvParams?.igvUrls

    const isCorrectParams = locus && names && igvUrls

    return (
      <Modal
        isOpen={isOpen}
        onClose={() => modalsVisibilityStore.toggleIsIgvModalVisible(false)}
        transitionDuration={300}
        render={({ state }) => (
          <div className={cn(styles.igvModal, styles[`igvModal_${state}`])}>
            <div className={styles.igvModal__header}>
              <button className={styles.igvModal__header__close}>
                <Icon
                  name="Close"
                  onClick={() =>
                    modalsVisibilityStore.toggleIsIgvModalVisible(false)
                  }
                  size={16}
                />
              </button>
            </div>

            {!isCorrectParams || isEachFilesMissing ? (
              <span className="flex justify-center leading-24 text-20 h-full">
                {t('igv.filesNotFound')}
              </span>
            ) : (
              <div className={styles.igvModal__content}>
                <IgvContent
                  locus={locus}
                  names={names}
                  igvUrls={igvUrls}
                  isOpen={isOpen}
                  setIsEachFilesMissing={setIsEachFilesMissing}
                />
              </div>
            )}
          </div>
        )}
      />
    )
  },
)
