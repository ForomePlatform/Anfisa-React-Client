import { PaginationList } from '@ui/pagination-list/pagination-list'
import { faker } from '@faker-js/faker'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Pagination List',
  component: PaginationList,
} as ComponentMeta<typeof PaginationList>

const Template: ComponentStory<typeof PaginationList> = args => {
  return (
    <div style={{ height: '500px' }}>
      <PaginationList {...args} />
    </div>
  )
}

export const Default = Template.bind({})

Default.args = {
  render: (input: any) => (
    <label className="h-4 mb-4 last:mb-0" key={input.id}>
      {input.name}
    </label>
  ),
  elements: [...new Array(256)].map(() => ({
    id: faker.database.mongodbObjectId(),
    name: faker.name.firstName(),
  })),
}
