import cn from 'classnames'

import { Icon } from '@ui/icon'

interface IZoneTagsProps {
  selectedTagsList: string[]
  title: string
  removeZoneTag: (geneName: string, type: string) => void
}

export const ZoneTags = ({
  selectedTagsList,
  removeZoneTag,
}: IZoneTagsProps) => {
  const deleteTag = (item: string, event: React.MouseEvent) => {
    removeZoneTag(item, 'fast')
    event.stopPropagation()
  }

  const visibleTagsData = selectedTagsList?.slice(0, 1)

  return (
    <>
      <div className="flex flex-wrap items-center w-auto max-w-full">
        {visibleTagsData?.map((item: string) => (
          <div key={item}>
            <div className="inline-flex items-center justify-between px-2 text-12 mx-0.5 text-white bg-blue-secondary rounded-lg w-auto max-w-full">
              <div className="truncate w-auto" style={{ maxWidth: 70 }}>
                {item === '_note' ? item.replace('_note', 'notes') : item}
              </div>

              <Icon
                onClick={e => deleteTag(item, e)}
                name="Close"
                size={8}
                className="ml-1"
              />
            </div>
          </div>
        ))}

        <div>
          <div
            className={cn(
              'items-center justify-between px-2 text-12 mx-0.5 text-white bg-blue-secondary rounded-lg flex-nowrap',
              selectedTagsList && selectedTagsList.length > 1
                ? 'inline-flex'
                : 'hidden',
            )}
          >
            {'+'}
            {selectedTagsList && selectedTagsList.length - 1}
          </div>
        </div>
      </div>
    </>
  )
}
