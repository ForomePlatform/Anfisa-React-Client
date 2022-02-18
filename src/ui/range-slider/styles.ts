import styled from 'styled-components'

import { theme } from '@theme'
import { RangeSliderHistogramRoot } from '@ui/range-slider/range-slider-histogram/styles'

export const RangeSliderRoot = styled.div<{
  readonly isActive?: boolean
  readonly isDisabled?: boolean
}>`
  margin-left: 40px;
  cursor: ${props =>
    props.isDisabled ? 'default' : props.isActive ? 'grabbing' : 'pointer'};
`

export const RangeSliderRuler = styled.div`
  position: relative;
  height: 32px;

  ::before {
    content: '';
    position: absolute;
    left: -2px;
    right: -2px;
    top: 6px;
    height: 4px;
    background: ${theme('colors.grey.disabled')};
    border-radius: 2px;
  }

  ${RangeSliderHistogramRoot} + & {
    margin-top: -6px;
  }
`

interface RangeSliderHandleProps {
  isActive?: boolean
  isDisabled?: boolean
  isStrong?: boolean
}

const getHandleColor = ({
  isActive,
  isDisabled,
}: RangeSliderHandleProps): string =>
  theme(
    isDisabled
      ? 'colors.grey.blue'
      : isActive
      ? 'colors.blue.active'
      : 'colors.blue.hover',
  )

export const RangeSliderHandle = styled.div<RangeSliderHandleProps>`
  position: absolute;
  left: 0;
  top: 0;
  width: 16px;
  height: 16px;
  margin-left: -8px;
  border: 1px solid ${props => getHandleColor(props)};
  border-radius: 8px;
  cursor: ${props => (props.isActive ? 'grabbing' : 'grab')};

  ::before {
    content: '';
    position: absolute;
    left: 2px;
    top: 2px;
    right: 2px;
    bottom: 2px;
    ${props => props.isStrong && `border: 1px solid ${getHandleColor(props)};`}
    background: ${props =>
      props.isStrong ? 'rgba(255,255,255,0.5)' : getHandleColor(props)};
    border-radius: 50%;
  }

  ${props =>
    !props.isDisabled &&
    `:hover {
      border-color: ${theme('colors.blue.active')};
  
      ::before {
        background: ${theme('colors.blue.active')};
      }
    }
  `}
`

export const RangeSliderTick = styled.div`
  position: absolute;
  height: 6px;
  top: 8px;
  width: 0;
  border-left: 1px solid ${theme('colors.grey.disabled')};
`

interface RangeSliderRangeProps {
  isDisabled?: boolean
  isLeftHandle?: boolean
  isRightHandle?: boolean
}

export const RangeSliderRange = styled.div<RangeSliderRangeProps>`
  position: absolute;
  top: 6px;
  height: 4px;

  ::before {
    content: '';
    position: absolute;
    left: ${props => (props.isLeftHandle ? '8px' : '-2px')};
    right: ${props => (props.isRightHandle ? '7px' : '-2px')};
    ${props =>
      !props.isLeftHandle &&
      'border-top-left-radius: 2px; border-bottom-left-radius: 2px;'}
    ${props =>
      !props.isRightHandle &&
      'border-top-right-radius: 2px; border-bottom-right-radius: 2px;'}
    top: 0;
    bottom: 0;
    background: ${props =>
      props.isDisabled
        ? theme('colors.grey.blue')
        : theme('colors.blue.hover')};
  }
`

export const RangeSliderLabel = styled.div`
  position: absolute;
  top: 16px;
`
