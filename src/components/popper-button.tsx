import { Fragment, ReactElement, useState } from 'react'
import { usePopper } from 'react-popper'
import cn, { Argument } from 'classnames'

import { useToggle } from '@core/hooks/use-toggle'

interface Props {
  ButtonElement: any
  ModalElement: any
  ButtonElementClassName?: Argument
  title?: string
  data?: any
  type?: string
}

export const PopperButton = ({
  ButtonElement,
  ModalElement,
  ButtonElementClassName,
  title,
  data,
  type,
}: Props): ReactElement => {
  const [isOpen, close, click] = useToggle(false)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState<any>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement)

  return (
    <Fragment>
      {data && data.length === 0 && type && (
        <ButtonElement
          refEl={setReferenceElement}
          isOpen={isOpen}
          className={cn(ButtonElementClassName)}
          onClick={click}
        />
      )}
      {!type && (
        <ButtonElement
          refEl={setReferenceElement}
          isOpen={isOpen}
          className={cn(ButtonElementClassName)}
          onClick={click}
        />
      )}

      {isOpen && (
        <div
          ref={setPopperElement}
          className="z-50 mt-2"
          style={styles.popper}
          {...attributes.popper}
        >
          <ModalElement
            close={close}
            title={title}
            refs={[setReferenceElement]}
          />
        </div>
      )}
    </Fragment>
  )
}
