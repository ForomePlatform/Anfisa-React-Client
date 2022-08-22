import { faker } from '@faker-js/faker'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FlatList } from './flat-list'

export default {
  title: 'Flat list',
  component: FlatList,
} as ComponentMeta<typeof FlatList>

const Template: ComponentStory<typeof FlatList> = args => {
  return (
    <div style={{ height: '300px' }}>
      <FlatList {...args} />
    </div>
  )
}

export const Default = Template.bind({})

Default.args = {
  renderRow: (_, index) => (
    <div key={index} className="flex flex-col">
      <span className="my-2">{`Item ${index}`}</span>
    </div>
  ),

  elements: [...new Array(256)].map(() => ({
    id: faker.database.mongodbObjectId(),
  })),

  useWindow: true,
}
