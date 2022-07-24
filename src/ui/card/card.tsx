import styles from './card.module.css'

import {
  CSSProperties,
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Transition } from 'react-transition-group'
import cn, { Argument } from 'classnames'

interface CardProps {
  children?: ReactElement | ReactNode
  className?: Argument
  innerRef?: Ref<HTMLDivElement>
  isNeedToAnimate?: boolean
  style?: CSSProperties
}

const TRANSITION_DURATION = 400

export const Card = forwardRef(
  ({
    innerRef,
    children,
    className,
    isNeedToAnimate,
  }: CardProps): ReactElement => {
    const [isOpen, setIsopen] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      window.setTimeout(() => setIsopen(true), 0)
    }, [])

    const renderCard = (state = '') => {
      return (
        <div
          ref={innerRef ? innerRef : cardRef}
          className={cn(
            'shadow-card p-4 rounded-lg',
            className,
            styles[`card_${state}`],
          )}
          style={{
            transitionDuration: `${TRANSITION_DURATION}ms`,
          }}
        >
          {children}
        </div>
      )
    }

    return isNeedToAnimate ? (
      <Transition
        appear
        in={isOpen}
        timeout={TRANSITION_DURATION}
        nodeRef={cardRef}
      >
        {state => {
          return renderCard(state)
        }}
      </Transition>
    ) : (
      renderCard()
    )
  },
)
