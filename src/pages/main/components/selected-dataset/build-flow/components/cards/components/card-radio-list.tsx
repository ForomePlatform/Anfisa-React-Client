import { Radio } from '@ui/radio'

interface ICardRadioListProps {
  optionsList: string[]
  selectedOption: string
  onChange: (option: string) => void
  isOptionsDisabled: boolean
}

export const CardRadioList = ({
  optionsList,
  selectedOption,
  onChange,
  isOptionsDisabled,
}: ICardRadioListProps) => (
  <>
    {optionsList.map(option => (
      <div className="flex mb-2" key={option}>
        <Radio
          className="flex items-center"
          checked={option === selectedOption}
          onChange={() => onChange(option)}
          disabled={isOptionsDisabled}
        >
          <div className="ml-1.5">{option}</div>
        </Radio>
      </div>
    ))}
  </>
)
