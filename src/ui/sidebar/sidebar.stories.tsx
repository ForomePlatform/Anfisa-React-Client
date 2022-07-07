import { useState } from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Sidebar } from './sidebar'

export default {
  title: 'Sidebar',
  component: Sidebar,
  argTypes: {
    width: {
      table: {
        disable: true,
      },
    },
    onChangeWidth: {
      table: {
        disable: true,
      },
    },
    canCollapse: {
      table: {
        disable: true,
      },
    },
    onToggle: {
      table: {
        disable: true,
      },
    },
    isCollapsed: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Sidebar>

const Template: ComponentStory<typeof Sidebar> = args => {
  const [width, setWidth] = useState(300)
  return (
    <Sidebar {...args} width={width} onChangeWidth={setWidth}>
      Content
    </Sidebar>
  )
}

export const Default = Template.bind({})
Default.args = {
  className: 'h-full',
  wrapperClassName: 'bg-blue-dark',
  contentClassName: 'text-white',
  minWidth: 100,
  maxWidth: 400,
}

const WithCollapseTemplate: ComponentStory<typeof Sidebar> = args => {
  const [width, setWidth] = useState(300)
  const [isCollapsed, setCollapsed] = useState(false)

  return (
    <Sidebar
      {...args}
      width={width}
      onChangeWidth={setWidth}
      canCollapse
      isCollapsed={isCollapsed}
      onToggle={setCollapsed}
    >
      Content
    </Sidebar>
  )
}

export const WithCollapse = WithCollapseTemplate.bind({})
WithCollapse.args = {
  className: 'h-full',
  wrapperClassName: 'bg-blue-dark',
  contentClassName: 'text-white',
  minWidth: 100,
  maxWidth: 400,
}
