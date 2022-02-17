import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import get from 'lodash/get'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import variantStore from '@store/variant'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'

//TODO: Delete interface when merge service providers
interface IAttributeDescriptors {
  name: string
  title: string
  cells: [content: string, cellClassName: string][]
  tooltip: string | undefined
  render: string | undefined
}

export const IgvButton = observer((): ReactElement => {
  const variant = toJS(variantStore.variant)

  const sampleList: [string, string][] = get(variant, '[2].rows[0].cells', [])

  sampleList.shift()

  const fixedSampleList = sampleList.map(element => {
    const sample = element[0]
    const splittedSample = sample.split(': ')
    const sampleName = splittedSample[1]

    return sampleName
  })

  const rows: IAttributeDescriptors[] = get(variant, '[0].rows', [])
  const hg38Row = rows.find(element => element.name === 'hg38')
  const locus = hg38Row?.cells[0][0] ?? ''

  const fixedLocus = locus.split(' ')[0]

  return (
    <Link
      target="_blank"
      to={`${Routes.IGV}?locus=${fixedLocus}&names=${fixedSampleList}`}
    >
      <Button
        className="mx-2 whitespace-nowrap"
        text={t('igv.openIgv')}
        size="sm"
      />
    </Link>
  )
})
