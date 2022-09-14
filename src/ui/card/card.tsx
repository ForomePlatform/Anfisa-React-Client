import styles from './card.module.css'

import {
  CSSProperties,
  ReactElement,
  ReactNode,
  Ref,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Transition } from 'react-transition-group'
import cn, { Argument } from 'classnames'

import { TCardPosition } from '@pages/main/components/selected-dataset/build-flow/components/wizard/wizard.interface'

interface ICardProps {
  children?: ReactElement | ReactNode
  className?: Argument
  innerRef?: Ref<HTMLDivElement>
  isNeedToAnimate?: boolean
  style?: CSSProperties
  position?: TCardPosition
}

const TRANSITION_DURATION = 400

export const Card = ({
  innerRef,
  children,
  className,
  isNeedToAnimate,
  position,
  style = {},
}: ICardProps): ReactElement => {
  const [isMounted, setIsMounted] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.setTimeout(() => setIsMounted(true), 0)
  }, [])

  const stylesCSS: CSSProperties = {
    ...style,
    transitionDuration: `${TRANSITION_DURATION}ms`,
  }

  const renderCard = (state = '') => (
    <div
      ref={isNeedToAnimate ? cardRef : innerRef}
      className={cn(
        styles.card,
        styles[`card_${state}`],
        styles[`card_position-${position}`],
        className,
      )}
      style={stylesCSS}
    >
      {children}
    </div>
  )

  return isNeedToAnimate ? (
    <Transition
      appear
      in={isMounted}
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
}
