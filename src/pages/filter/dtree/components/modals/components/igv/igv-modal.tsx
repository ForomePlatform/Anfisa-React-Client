import styles from './igv-modal.module.css'

import { ReactElement, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { IIgvParams } from '@store/variant-aspects.async.store'
import { Icon } from '@ui/icon'
import { Modal } from '@ui/modal'
import modalsVisibilityStore from '@pages/filter/dtree/components/modals/modals-visibility-store'

export const hg38Folder = 'GRCh38'

const igv = require('igv')

export const IgvModal = observer(
  ({
    isOpen,
    igvParams,
  }: {
    isOpen: boolean
    igvParams: IIgvParams | undefined
  }): ReactElement => {
    const [isEachFilesMissing, setIsEachFilesMissing] = useState(false)

    const ref = useRef<HTMLDivElement>(null)

    const locus = igvParams?.locus
    const names = igvParams?.names
    const igvUrls = igvParams?.igvUrls

    const isCorrectParams = locus && names && igvUrls

    useEffect(() => {
      if (isOpen) {
        const nameList = names?.split(',') ?? []

        const tracks = nameList
          .map(name => {
            const path = igvUrls?.find(url => url.includes(name))

            if (!path) return null

            const indexPath = `${path}.bai`

            return {
              name,
              url: path,
              indexURL: indexPath,
              format: 'bam',
            }
          })
          .filter(element => element)

        const isTracksEmpty = tracks.length === 0

        if (isTracksEmpty) {
          setIsEachFilesMissing(true)
        } else {
          const options = {
            genome: 'hg38',
            locus,
            tracks,
          }

          igv.createBrowser(ref.current, options)
        }
      }
    }, [igvUrls, isOpen, locus, names])

    // console.log(isEachFilesMissing)
    // console.log(!isCorrectParams)

    return (
      <Modal
        isOpen={isOpen}
        onClose={() => modalsVisibilityStore.toggleIsIgvModalVisible(false)}
        transitionDuration={300}
        render={({ state }) => (
          <div className={cn(styles.igvModal, styles[`igvModal_${state}`])}>
            <div className={styles.header}>
              <button className={styles.header__close}>
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
              <div ref={ref}></div>
            )}
          </div>
        )}
      />
    )
  },
)
