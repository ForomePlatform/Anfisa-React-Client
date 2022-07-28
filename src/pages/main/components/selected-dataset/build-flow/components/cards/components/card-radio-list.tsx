import { Radio } from '@ui/radio'
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
      {data.map(({ label, value }) => (
        <div className="flex mb-2" key={value}>
          <Radio
            className="flex items-center"
            checked={value === selectedOption}
            onChange={() => onChange(value)}
            disabled={isOptionsDisabled || disabledOptions?.[value]}
          >
            <div className="ml-1.5">{label}</div>
          </Radio>
        </div>
      ))}
    </>
  )
}
