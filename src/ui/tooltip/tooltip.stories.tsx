import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Tooltip } from './tooltip'

export default {
  title: 'Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = args => {
  return (
    <div className="flex">
      <div className="p-6">
        <Tooltip {...args} title="Some tooltip title">
          <span>Hover me</span>
        </Tooltip>
      </div>
      <div className="p-6">
        <Tooltip
          {...args}
          title={
            <div>
              Some <i>title</i> <u>with</u> <b>markup</b>
            </div>
          }
        >
          <span>Hover me</span>
        </Tooltip>
      </div>
    </div>
  )
}

const loremIpsum =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

const WrapTemplate: ComponentStory<typeof Tooltip> = args => {
  return (
    <div className="flex">
      <div className="p-6">
        <Tooltip {...args}>
          <span>Hover me (default)</span>
        </Tooltip>
      </div>
      <div className="p-6">
        <Tooltip {...args} maxWidth={600}>
          <span>Hover me (maxWidth: 600)</span>
        </Tooltip>
      </div>
      <div className="p-6">
        <Tooltip {...args} maxWidth="auto">
          <span>Hover me (maxWidth: auto)</span>
        </Tooltip>
      </div>
    </div>
  )
}

const ClickTemplate: ComponentStory<typeof Tooltip> = args => {
  return (
    <div className="flex">
      <div className="p-6">
        <Tooltip {...args}>
          <span>Click me</span>
        </Tooltip>
      </div>
    </div>
  )
}

export const Light = Template.bind({})
Light.args = {
  theme: 'light',
}

export const Dark = Template.bind({})
Dark.args = {
  theme: 'dark',
}

export const TextWrap = WrapTemplate.bind({})
TextWrap.args = {
  title: loremIpsum,
}

export const ClickEvent = ClickTemplate.bind({})
ClickEvent.args = {
  trigger: 'click',
  title: 'Some tooltip title',
}
