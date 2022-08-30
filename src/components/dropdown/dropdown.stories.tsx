import { useState } from 'react'

import { Dropdown } from '@components/dropdown/dropdown'
import { IDropdownValue } from '@components/dropdown/dropdown.interfaces'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>

const Template: ComponentStory<typeof Dropdown> = args => {
  const options: IDropdownValue<string>[] = [
    { label: 'Dima', value: 'Dima' },
    { label: 'Vlad', value: 'Vlad' },
    { label: 'Andrey', value: 'Andrey' },
    { label: 'Da', value: 'Da' },
    { label: 'Vd', value: 'Vd' },
    { label: 'Ay', value: 'Ay' },
  ]
  const [chosen, setChosen] = useState<IDropdownValue<string>[]>([])

  const onChange = (it: IDropdownValue<string>) =>
    setChosen(items =>
      items.some(i => i.value === it.value)
        ? items.filter(i => i.value !== it.value)
        : [...items, it],
    )

  return (
    <div className="w-full h-full flex items-center justify-center bg-grey-light">
      <div className="w-[200px] h-fit">
        <Dropdown
          options={options}
          values={chosen}
          onChange={onChange}
          clearAll={() => setChosen([])}
          placeholder={args.placeholder}
          hasError={args.hasError}
          offset={args.offset}
          variant={args.variant}
          showCheckboxes={args.showCheckboxes}
          isLoading={args.isLoading}
        />
      </div>
    </div>
  )
}

export const Default = Template.bind({})

Default.args = {}
