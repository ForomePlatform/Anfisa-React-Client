import { useState } from 'react'
import cn from 'classnames'

import { InputSearch } from '@ui/input-text/input-search'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'InputSearch',
  component: InputSearch,
} as ComponentMeta<typeof InputSearch>

const Template: ComponentStory<typeof InputSearch> = args => {
  const [state, setState] = useState<string>(args.value || '')
  return (
    <div
      className={cn(
        'w-full h-[400px] flex items-center justify-around bg-blue-dark',
        args.variant === 'primary-dark' ? 'bg-blue-dark' : 'bg-white',
      )}
    >
      <div className="w-[300px]">
        <InputSearch
          {...args}
          value={state}
          onChange={e => setState(e.target.value)}
        />
      </div>
    </div>
  )
}

export const Default = Template.bind({})

Default.args = {
  disabled: false,
  type: 'text',
  variant: 'primary',
  shape: 'round',
  size: 's',
}
