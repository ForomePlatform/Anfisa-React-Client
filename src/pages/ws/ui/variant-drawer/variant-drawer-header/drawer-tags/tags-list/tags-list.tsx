import { ReactElement } from 'react'
import cn from 'classnames'

import { useToggle } from '@core/hooks/use-toggle'
import { t } from '@i18n'
import { Tag } from '@ui/tag'

interface ITagsListProps {
  tags: string[]
  count?: number
}

export const TagsList = ({ tags, count = 2 }: ITagsListProps): ReactElement => {
  const [isExpandTags, expand, roll] = useToggle(false)

  return (
    <div className="w-auto" style={{ maxWidth: 288 }}>
      {tags.length > 0 && (
        <div
          className={cn('text-white flex max-w-xs', {
            'flex-wrap': isExpandTags,
          })}
        >
          {tags.slice(0, isExpandTags ? tags.length : count).map(tag => (
            <Tag text={tag} key={tag} isActive hideCloseIcon />
          ))}

          {tags.length > count && (
            <>
              {isExpandTags ? (
                <span
                  className="text-12 leading-14px font-bold text-blue-bright p-1 cursor-pointer"
                  onClick={roll}
                >
                  {t('general.showLess')}
                </span>
              ) : (
                <Tag
                  text={`+${tags.length - count}`}
                  isActive
                  onClick={expand}
                  hideCloseIcon
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
