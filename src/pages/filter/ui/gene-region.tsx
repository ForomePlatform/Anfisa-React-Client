import { useEffect } from 'react'
import { Form, FormikProps } from 'formik'

import filterStore from '@store/filter'
import { Input } from '@ui//input'
export interface IGeneRegionFormValues {
  locus: string
}

const GENE_REGION = 'GeneRegion'

export const GeneRegion = ({
  values: { locus },
  setFieldValue,
}: FormikProps<IGeneRegionFormValues>) => {
  const cachedValues = filterStore.readFilterCondition<IGeneRegionFormValues>(
    GENE_REGION,
  )

  const locusValue = cachedValues?.locus || locus

  useEffect(() => {
    filterStore.setFilterCondition<IGeneRegionFormValues>(GENE_REGION, {
      locus,
    })
  }, [locus])

  return (
    <Form>
      <div className="mt-4">
        <span className="text-14 leading-16px text-grey-blue font-bold">
          Locus
        </span>

        <Input
          value={locusValue}
          onChange={e => {
            setFieldValue('locus', e.target.value)
          }}
        />
      </div>
    </Form>
  )
}
