import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import cn, { Argument } from 'classnames'

import { RangeSliderHistogram } from './range-slider-histogram'
import { RangeSliderTicks } from './range-slider-ticks'
import {
  RangeSliderHandle,
  RangeSliderLabel,
  RangeSliderRange,
  RangeSliderRoot,
  RangeSliderRuler,
} from './styles'
import {
  RangeSliderMode,
  RangeSliderScale,
  RangeSliderSide,
  RangeSliderValue,
} from './types'
import { adjustLabels, getScaleTransform } from './utils'

interface IRangeSliderProps {
  className?: Argument
  min: number
  max: number
  mode?: RangeSliderMode
  step?: number
  scale?: RangeSliderScale
  value: RangeSliderValue | null
  onChange: (value: RangeSliderValue) => void
  disabled?: RangeSliderSide
  strong?: RangeSliderSide
  histogram?:
    | [type: 'LIN' | 'LOG', min: number, max: number, values: number[]]
    | null
}

type DragState = {
  onMouseMove: (event: MouseEvent) => void
  isRightHandle: boolean
}

export const RangeSlider = ({
  className,
  value,
  max,
  min,
  mode = RangeSliderMode.Range,
  step = 1,
  scale = RangeSliderScale.Linear,
  onChange,
  disabled,
  strong,
  histogram,
}: IRangeSliderProps): ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null)
  const leftLabelRef = useRef<HTMLDivElement>(null)
  const rightLabelRef = useRef<HTMLDivElement>(null)
  const dividerLabelRef = useRef<HTMLDivElement>(null)

  const [rootWidth, setRootWidth] = useState(0)
  const [dragState, setDragState] = useState<DragState | null>(null)

  const isRangeMode = mode === 'range'

  const leftValue = value ? value[0] : null
  const rightValue = isRangeMode && value ? value[1] : null

  const { getOffset, getValue, alignValue } = useMemo(
    () =>
      getScaleTransform({
        min,
        max,
        width: rootWidth,
        scale,
        step,
      }),
    [min, max, rootWidth, step, scale],
  )

  const leftOffset =
    leftValue != null &&
    !Number.isNaN(leftValue) &&
    leftValue >= min &&
    leftValue <= max
      ? getOffset(leftValue)
      : null

  const rightOffset =
    rightValue != null &&
    !Number.isNaN(rightValue) &&
    rightValue >= min &&
    rightValue <= max
      ? getOffset(rightValue)
      : null

  const histogramSelectedArea = useMemo<[number, number] | null>(
    () =>
      leftOffset != null || rightOffset != null
        ? [leftOffset ?? 0, rightOffset ?? rootWidth]
        : null,
    [leftOffset, rightOffset, rootWidth],
  )

  useEffect(() => {
    if (rootRef.current) {
      setRootWidth(rootRef.current.clientWidth)

      if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(entries => {
          setRootWidth(entries[0].target.clientWidth)
        })

        observer.observe(rootRef.current)

        return () => {
          observer.disconnect()
        }
      }
    }
  }, [])

  useEffect(() => {
    if (dragState) {
      const { onMouseMove } = dragState

      const stopDrag = () => {
        setDragState(null)
      }

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', stopDrag)
      document.addEventListener('mouseleave', stopDrag)

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', stopDrag)
        document.removeEventListener('mouseleave', stopDrag)
      }
    }
  }, [dragState, getValue, alignValue])

  useLayoutEffect(
    () =>
      adjustLabels({
        leftLabel: leftLabelRef.current,
        rightLabel: rightLabelRef.current,
        dividerLabel: dividerLabelRef.current,
        leftOffset,
        rightOffset,
        width: rootWidth,
      }),
    [leftOffset, rightOffset, rootWidth],
  )

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (rootRef.current && !dragState) {
      const handle = (event.target as HTMLElement).dataset?.handle
      const { x: rootX } = rootRef.current.getBoundingClientRect()

      const newValue = getValue(event.clientX - rootX)

      const isRightHandle =
        isRangeMode &&
        disabled !== RangeSliderSide.Right &&
        handle !== 'left' &&
        (disabled === RangeSliderSide.Left ||
          handle === 'right' ||
          (leftValue != null && rightValue == null && newValue > leftValue) ||
          (leftValue != null &&
            rightValue != null &&
            Math.abs(rightValue - newValue) < Math.abs(leftValue - newValue)))

      const onMouseMove = (moveEvent: MouseEvent) => {
        const handleValue = alignValue(getValue(moveEvent.clientX - rootX))

        if (isRightHandle) {
          if (leftValue == null || handleValue > leftValue) {
            onChange([leftValue, handleValue])
          }
        } else {
          if (rightValue == null || handleValue < rightValue) {
            onChange([handleValue, rightValue])
          }
        }
      }

      setDragState({
        onMouseMove,
        isRightHandle,
      })

      if (!handle) {
        onMouseMove(event.nativeEvent)
      }
    }
  }

  const isDisabled = disabled === RangeSliderSide.Both

  return (
    <div className={cn('text-xs text-blue-dark', className)}>
      <RangeSliderRoot
        ref={rootRef}
        onMouseDown={!isDisabled ? handleMouseDown : undefined}
        isActive={!!dragState}
        isDisabled={isDisabled}
      >
        {histogram && (
          <RangeSliderHistogram
            width={rootWidth}
            data={histogram[3]}
            selectedArea={histogramSelectedArea}
          />
        )}
        <RangeSliderRuler>
          <RangeSliderTicks
            min={min}
            max={max}
            step={step}
            scale={scale}
            width={rootWidth}
          />
          {leftOffset !== null && (
            <RangeSliderLabel ref={leftLabelRef}>{leftValue}</RangeSliderLabel>
          )}
          {rightOffset !== null && (
            <RangeSliderLabel ref={rightLabelRef}>
              {rightValue}
            </RangeSliderLabel>
          )}
          <RangeSliderLabel
            ref={dividerLabelRef}
            style={{
              textAlign: 'center',
              visibility: 'hidden',
            }}
          >
            –
          </RangeSliderLabel>
          {isRangeMode && (leftValue != null || rightValue != null) && (
            <RangeSliderRange
              isDisabled={isDisabled}
              isLeftHandle={leftOffset != null}
              isRightHandle={rightOffset != null}
              style={{
                left: `${leftOffset != null ? leftOffset : 0}px`,
                right: `${rightOffset != null ? rootWidth - rightOffset : 0}px`,
              }}
            />
          )}
          {leftOffset !== null && (
            <RangeSliderHandle
              data-handle="left"
              isActive={!!(dragState && !dragState.isRightHandle)}
              isDisabled={isDisabled || disabled === RangeSliderSide.Left}
              isStrong={strong === RangeSliderSide.Left}
              style={{
                transform: `translateX(${leftOffset}px)`,
              }}
            />
          )}
          {rightOffset !== null && (
            <RangeSliderHandle
              data-handle="right"
              isActive={!!(dragState && dragState.isRightHandle)}
              isDisabled={isDisabled || disabled === RangeSliderSide.Right}
              isStrong={strong === RangeSliderSide.Right}
              style={{
                transform: `translateX(${rightOffset}px)`,
              }}
            />
          )}
        </RangeSliderRuler>
      </RangeSliderRoot>
    </div>
  )
}
