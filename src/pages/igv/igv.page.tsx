import { ReactElement, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import { IgvContent } from '@pages/igv/ui/igv-content'
import { NotFoundPage } from '@pages/not-found'
import { FileMissing } from './ui/file-missing'

export const IgvPage = observer((): ReactElement => {
  const [isEachFilesMissing, setIsEachFilesMissing] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  const params = useParams()

  const locus = params.get('locus')
  const names = params.get('names')
  const stringifiedIgvUrls = params.get('igvUrls')
  const igvUrls: string[] = stringifiedIgvUrls && JSON.parse(stringifiedIgvUrls)

  const isCorrectParams = locus && names && stringifiedIgvUrls

  if (!isCorrectParams) {
    return <NotFoundPage />
  }

  return isEachFilesMissing ? (
    <FileMissing />
  ) : (
    <div ref={ref}>
      <IgvContent
        locus={locus}
        names={names}
        igvUrls={igvUrls}
        isOpen={true}
        setIsEachFilesMissing={setIsEachFilesMissing}
      />
    </div>
  )
})
