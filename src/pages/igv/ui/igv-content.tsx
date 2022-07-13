import { ReactElement, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'

export const hg38Folder = 'GRCh38'

const igv = require('igv')

interface IIgvModalProps {
  locus: string | undefined
  names: string | undefined
  igvUrls: string[] | undefined
  isOpen: boolean
  setIsEachFilesMissing: (value: boolean) => void
}

export const IgvContent = observer(
  ({
    locus,
    names,
    igvUrls,
    isOpen,
    setIsEachFilesMissing,
  }: IIgvModalProps): ReactElement => {
    const ref = useRef<HTMLDivElement>(null)

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
    }, [igvUrls, isOpen, locus, names, setIsEachFilesMissing])

    return <div ref={ref}></div>
  },
)
