import {
  AttributeKinds,
  EnumPropertyStatusSubKinds,
} from '@service-providers/common'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { WidgetTab } from './index'

export default {
  title: 'Widget tab',
  component: WidgetTab,
} as ComponentMeta<typeof WidgetTab>

const Template: ComponentStory<typeof WidgetTab> = args => {
  return (
    <div className="w-1/3 cursor-pointer">
      <WidgetTab {...args} />
    </div>
  )
}

export const Default = Template.bind({})

Default.args = {
  group: {
    name: 'Inheritance',
    power: 0.22298721274582547,
    isOpen: false,
    isFavorite: false,
    units: [
      {
        name: 'Callers',
        kind: AttributeKinds.ENUM,
        'sub-kind': EnumPropertyStatusSubKinds.MULTI,
        vgroup: 'Inheritance',
        power: { value: 0.1, comment: 'no' },
        isOpen: false,
        variants: [
          ['Variant_1', 78392],
          ['Variant_2', 88392],
          ['Variant_3', 98392],
          ['Variant_4', 108392],
        ],
      },
      {
        name: 'Proband_Zygosity',
        kind: AttributeKinds.ENUM,
        'sub-kind': EnumPropertyStatusSubKinds.MULTI,
        vgroup: 'Inheritance',
        power: { value: 0.2, comment: 'no' },
        isOpen: false,
        variants: [
          ['Variant_5', 18392],
          ['Variant_6', 28392],
          ['Variant_7', 38392],
          ['Variant_8', 408392],
        ],
      },
      {
        name: 'Has_Variant',
        kind: AttributeKinds.ENUM,
        'sub-kind': EnumPropertyStatusSubKinds.MULTI,
        vgroup: 'Inheritance',
        power: { value: 0.3, comment: 'no' },
        isOpen: false,
        variants: [
          ['Variant_9', 8392],
          ['Variant_10', 98392],
          ['Variant_11', 7392],
          ['Variant_12', 58392],
        ],
      },
    ],
  },
}
