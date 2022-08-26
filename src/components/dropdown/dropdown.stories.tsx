import { Dropdown } from '@components/dropdown/dropdown'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>

const Template: ComponentStory<typeof Dropdown> = args => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-grey-light">
      <div className="w-fit h-fit">
        <Dropdown {...args} />
      </div>
    </div>
  )
}

export const Default = Template.bind({})

Default.args = {}
