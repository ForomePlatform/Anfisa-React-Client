import { LoaderWrapper } from '@ui/loader/loader-wrapper'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'LoaderWrapper',
  component: LoaderWrapper,
} as ComponentMeta<typeof LoaderWrapper>

const Template: ComponentStory<typeof LoaderWrapper> = args => (
  <div className="w-1/2 h-1/2 bg-blue-dark flex items-center justify-center">
    <div className="border border-blue-light w-fir h-fit p-2">
      <LoaderWrapper
        size={args.size}
        color={args.color}
        isLoading={args.isLoading}
      >
        <span className="text-white">Information that loaded</span>
      </LoaderWrapper>
    </div>
  </div>
)

export const Default = Template.bind({})

Default.args = {
  size: 'xs',
  color: 'white',
  isLoading: true,
}
