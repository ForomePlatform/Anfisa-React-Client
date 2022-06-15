import { TTagsOverrides } from './tags-popover.interface'

export const combineTagsAndOverrides = (
  tags: string[],
  overrides: TTagsOverrides,
): string[] => {
  return Object.keys(overrides)
    .filter(tag => overrides[tag])
    .concat(tags.filter(tag => overrides[tag] !== false))
}
