import { useState } from 'react'
import cn from 'classnames'

import { Icon } from '@ui/icon'
import { Input } from '@ui/input/input'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = args => {
  const [state, setState] = useState<string>(args.value || '')
  return (
    <div
      className={cn(
        'w-full h-[400px] flex items-center justify-around bg-blue-dark',
        args.variant === 'primary-dark' ? 'bg-blue-dark' : 'bg-white',
      )}
    >
      <div className="w-[300px]">
        <Input
          {...args}
          value={state}
          onChange={(e: any) => setState(e.target.value)}
        />
      </div>
    </div>
  )
}

export const Default = Template.bind({})

Default.args = {
  append: <Icon name="Loupe" size={16} />,
  prepend: <Icon name="Tag" size={16} className="text-blue-bright" />,
  disabled: false,
  type: 'text',
  variant: 'primary',
  shape: 'round',
  size: 's',
  placeholder: 'Placeholder',
  foundItems: 0,
}
