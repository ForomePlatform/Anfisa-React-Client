import { Loader } from '@ui/loader/loader'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>

const Template: ComponentStory<typeof Loader> = args => (
  <div className="w-1/2 h-1/2 bg-blue-dark flex items-center">
    <Loader size={args.size} color={args.color} />
  </div>
)

export const Default = Template.bind({})

Default.args = {
  size: 'xs',
  color: 'white',
}
