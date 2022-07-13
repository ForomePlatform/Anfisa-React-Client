import { ReactElement, useMemo, useState } from 'react'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Input } from '@ui/input'
import { VariantDrawerDataCy } from '@data-testid'
import { validateTag } from '@utils/validation/validateTag'

interface ICustomTagFormProps {
  className?: string
  tags: string[]
  onSubmit: (value: string) => void
}

export const CustomTagForm = ({
  className,
  tags,
  onSubmit,
}: ICustomTagFormProps): ReactElement => {
  const [value, setValue] = useState('')

  const errorMessage = useMemo(() => validateTag(value, tags), [value, tags])

  const handleSubmit = () => {
    onSubmit(value)
    setValue('')
  }

  return (
    <div className={className}>
      <Input
        isModal
        value={value}
        onChange={event => setValue(event.target.value.trim())}
      />

      <div className="flex justify-end items-center pt-2">
        {errorMessage && (
          <div className="text-xs text-red-secondary mr-2 flex-1">
            {errorMessage}
          </div>
        )}
        <Button
          text={t('variant.addCustomTag')}
          disabled={!value || !!errorMessage}
          className="justify-self-end"
          onClick={handleSubmit}
          dataTestId={VariantDrawerDataCy.addCustomTag}
        />
      </div>
    </div>
  )
}
