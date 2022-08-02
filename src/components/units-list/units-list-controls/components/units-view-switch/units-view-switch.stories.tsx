import { useState } from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'
import { UnitsViewSwitch } from './units-view-switch'

export default {
  title: 'Units view switch',
  component: UnitsViewSwitch,
} as ComponentMeta<typeof UnitsViewSwitch>

const Template: ComponentStory<typeof UnitsViewSwitch> = args => {
  const [isListView, setIsListView] = useState(false)

  return (
    <div className="flex items-center w-fit bg-blue-secondary">
      <UnitsViewSwitch
        {...args}
        isListView={isListView}
        onToggleViewType={() => setIsListView(prev => !prev)}
      />
    </div>
  )
}

export const Default = Template.bind({})
