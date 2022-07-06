import { ProgressBar } from '@ui/progress-bar/progress-bar'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Progress Bar',
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>

const Template: ComponentStory<typeof ProgressBar> = args => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[300px]">
        <ProgressBar {...args} />
      </div>
    </div>
  )
}

export const Default = Template.bind({})
