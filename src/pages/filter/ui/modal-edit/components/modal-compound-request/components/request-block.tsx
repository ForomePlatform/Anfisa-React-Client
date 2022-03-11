import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { InputNumber } from '@ui/input-number'
import { Select } from '@ui/select'
import modalEditStore, { selectOptions } from '../../../modal-edit.store'
import modalCompoundRequestStore from '../modal-compound-request.store'

interface IRequestBlockProps {
  index: number
  activeRequestIndex: number
  item: string[]
}

export const RequestBlock = observer(
  ({ index, activeRequestIndex, item }: IRequestBlockProps): ReactElement => {
    const { problemGroups } = modalEditStore
    return (
      <div
        className={cn(
          'flex justify-between w-full shadow-dark py-2 my-2 px-2 cursor-pointer step-content-area',
          index === activeRequestIndex ? 'bg-blue-medium' : 'bg-white',
        )}
        key={Math.random()}
        onClick={(e: any) =>
          modalCompoundRequestStore.setActiveRequest(index, e)
        }
      >
        <div className="flex cursor-pointer step-content-area">
          <InputNumber
            value={item[0]}
            onChange={(e: any) =>
              modalCompoundRequestStore.changeRequestConditionNumber(
                index,
                e.target.value,
              )
            }
            className="shadow-dark w-1/3 h-5"
          />
        </div>

        <div className="flex flex-1 justify-between step-content-area">
          {problemGroups.map((group: string, currNo: number) => (
            <div
              className="step-content-area"
              onClick={(e: any) =>
                modalCompoundRequestStore.setActiveRequest(index, e)
              }
              key={group}
            >
              <span className="cursor-pointer step-content-area">{group}</span>

              <Select
                onChange={(e: any) =>
                  modalCompoundRequestStore.setSingleScenario(
                    index,
                    currNo,
                    e.target,
                  )
                }
                className="w-auto ml-1"
                options={selectOptions}
                value={modalCompoundRequestStore.getSelectedValue(group, index)}
              />
            </div>
          ))}
        </div>
      </div>
    )
  },
)
