import { ComponentMeta, ComponentStory } from '@storybook/react'
import { InputNumeric } from './input-numeric'

export default {
  title: 'InputNumeric',
  component: InputNumeric,
  argTypes: {
    component: {
      table: {
        disable: true,
      },
    },
    render: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof InputNumeric>

const Template: ComponentStory<typeof InputNumeric> = args => {
  return (
    <>
      <InputNumeric {...args} />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  value: 10,
}
