import { Radio } from '@ui/radio'
import { disabledOptionIsObject } from './card-radio.utils'
import { ICardRadioItem, TDisabledOptions } from './card-radio-list.interface'

interface ICardRadioListProps<T extends string> {
  data: ICardRadioItem<T>[]
  selectedOption: string
  onChange: (option: T) => void
  isOptionsDisabled?: boolean
  disabledOptions?: TDisabledOptions<T>
}

export const CardRadioList = function <T extends string>({
  data,
  selectedOption,
  onChange,
  isOptionsDisabled,
  disabledOptions,
}: ICardRadioListProps<T>) {
  return (
    <>
      {data.map(({ label, value }) => {
        const disabledOption = disabledOptions?.[value]
        if (
          disabledOptionIsObject(disabledOption) &&
          disabledOption.isDisabled
        ) {
          return (
            <div className="flex mb-2" key={value}>
              {disabledOption.placeholder()}
            </div>
          )
        } else {
          return (
            <div className="flex mb-2" key={value}>
              <Radio
                className="flex items-center"
                checked={value === selectedOption}
                onChange={() => onChange(value)}
                disabled={
                  !!isOptionsDisabled ||
                  (disabledOptionIsObject(disabledOption)
                    ? disabledOption.isDisabled
                    : disabledOption)
                }
              >
                <div className="ml-1.5">{label}</div>
              </Radio>
            </div>
          )
        }
      })}
    </>
  )
}
