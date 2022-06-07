import { useEffect, useState } from 'react'

import { Checkbox } from '@ui/checkbox/checkbox'
import { PaginationList } from '@components/pagination-list/pagination-list'
import { faker } from '@faker-js/faker'

interface TestEntity {
  id: string
  name: string
}

export const TestPage = () => {
  const INITIAL_LENGTH = 256

  const [chosen, setChosen] = useState<string[]>([])

  const [elements, setElements] = useState<TestEntity[]>(
    [...new Array(INITIAL_LENGTH)].map(i => ({
      id: faker.database.mongodbObjectId(),
      name: faker.name.firstName(),
    })),
  )

  const render = (input: TestEntity) => {
    const onChange = () => {
      setChosen(it => {
        if (it.find(e => e === input.id)) {
          return it.filter(e => e !== input.id)
        }

        return [...it, input.id]
      })
    }

    return (
      <Checkbox
        checked={!!chosen.find(it => it === input.id)}
        onChange={onChange}
        key={input.id}
        className="mb-4 last:mb:0"
      >
        {input.name}
      </Checkbox>
    )
  }

  return (
    <div className="min-h-full h-full flex flex-col min-w-full flex items-center justify-center">
      <div className="h-3/4">
        <PaginationList elements={elements} render={render} />
      </div>
    </div>
  )
}
