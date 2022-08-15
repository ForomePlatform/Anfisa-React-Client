import styles from './range-slider.module.css'

import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import cn, { Argument } from 'classnames'

import { formatNumber } from '@core/format-number'
import {
  RangeSliderColor,
  RangeSliderMode,
  RangeSliderOrientation,
  RangeSliderScale,
  RangeSliderSide,
  RangeSliderValue,
} from './range-slider.interface'
import {
  adjustLabels,
  normalizeValue,
  RangeSliderLinearAxis,
  RangeSliderLogAxis,
} from './range-slider.utils'
import { RangeSliderHistogram } from './range-slider-histogram'

export interface IRangeSliderProps {
  className?: Argument
  min: number
  max: number
  mode?: RangeSliderMode
  step?: number
  scale?: RangeSliderScale
  value: RangeSliderValue | null
  onChange: (value: RangeSliderValue) => void
  disabled?: RangeSliderSide
  strict?: RangeSliderSide
  color?: RangeSliderColor
  histogram?: number[]
  histogramHeight?: number
  orientation?: RangeSliderOrientation
}

type DragState = {
  onMouseMove: (event: MouseEvent) => void
  isRightHandle: boolean
}

const DEFAULT_RANGE_SLIDER_HISTOGRAM = 80

// TODO: vertical histogram

export const RangeSlider = ({
  className,
  value,
  onChange,
  max,
  min,
  mode = RangeSliderMode.Range,
  step = 1,
  scale = RangeSliderScale.Linear,
  color = RangeSliderColor.Primary,
  disabled,
  strict,
  histogram,
  histogramHeight = DEFAULT_RANGE_SLIDER_HISTOGRAM,
  orientation = RangeSliderOrientation.Horizontal,
}: IRangeSliderProps): ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null)
  const leftLabelRef = useRef<HTMLDivElement>(null)
  const rightLabelRef = useRef<HTMLDivElement>(null)
  const dividerLabelRef = useRef<HTMLDivElement>(null)

  const [size, setSize] = useState(0)
  const [dragState, setDragState] = useState<DragState | null>(null)

  const isLogarithmic = scale === RangeSliderScale.Logarithmic
  const isRangeMode = mode === RangeSliderMode.Range
  const hasHistogram = !!histogram
  const isLogarithmicHistogram = hasHistogram && isLogarithmic
  const fakeZero = isLogarithmic && min === 0 ? 0.1 : undefined

  const isHistogramPoints = hasHistogram
    ? scale === RangeSliderScale.Linear && max - min + 1 === histogram.length
    : false
  const isVertical = orientation === RangeSliderOrientation.Vertical

  const axis = useMemo(
    () =>
      isLogarithmic
        ? new RangeSliderLogAxis({ min, max, size, fakeZero })
        : new RangeSliderLinearAxis({
            min,
            max,
            size,
            step,
            isHistogramPoints,
          }),
    [min, max, size, step, isLogarithmic, isHistogramPoints, fakeZero],
  )

  const histogramBarPositions = useMemo(
    // in logarithmic scale we have first fake interval from 0 (-∞),
    // so take it and every 9th tick
    () =>
      isLogarithmicHistogram
        ? axis.ticks
            .map(tick => axis.getOffset(tick))
            .filter((_, i) =>
              min > 0 ? i % 9 === 0 : i === 0 || (i - 1) % 9 === 0,
            )
        : undefined,
    [isLogarithmicHistogram, axis, min],
  )

  let leftValue = normalizeValue(value?.[0], min, max)
  // in single mode second part of the value is used for a histogram fill radius
  let rightValue = normalizeValue(value?.[1], isRangeMode ? min : 0, max)

  if (
    isRangeMode &&
    leftValue != null &&
    rightValue != null &&
    rightValue < leftValue
  ) {
    leftValue = null
    rightValue = null
  }

  let histogramSelectedArea: [number, number] | null = null

  if (hasHistogram) {
    if (isRangeMode) {
      histogramSelectedArea =
        leftValue !== null || rightValue !== null
          ? [
              leftValue !== null ? axis.getOffset(leftValue) : 0,
              rightValue !== null ? axis.getOffset(rightValue) : size,
            ]
          : null
    } else if (leftValue !== null && rightValue !== null) {
      histogramSelectedArea = [
        axis.getOffset(leftValue - rightValue),
        axis.getOffset(leftValue + rightValue),
      ]
    }
  }

  useEffect(() => {
    if (rootRef.current) {
      setSize(rootRef.current.clientWidth)

      if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(entries => {
          setSize(
            isVertical
              ? entries[0].target.clientHeight
              : entries[0].target.clientWidth,
          )
        })

        observer.observe(rootRef.current)

        return () => {
          observer.disconnect()
        }
      }
    }
  }, [isVertical])

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
  }, [dragState])

  const leftOffset = leftValue !== null ? axis.getOffset(leftValue) : null
  const rightOffset =
    isRangeMode && rightValue !== null ? axis.getOffset(rightValue) : null

  useLayoutEffect(
    () =>
      adjustLabels({
        leftLabel: leftLabelRef.current,
        rightLabel: rightLabelRef.current,
        dividerLabel: dividerLabelRef.current,
        leftOffset,
        rightOffset,
        size,
        isVertical,
      }),
    [leftOffset, rightOffset, size, isVertical],
  )

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (rootRef.current && !dragState) {
      const handle = (event.target as HTMLElement).dataset?.handle
      const rootRect = rootRef.current.getBoundingClientRect()
      const origin = isVertical ? rootRect.bottom : rootRect.x

      const getValueFromEvent = (
        event: MouseEvent | React.MouseEvent,
      ): number => {
        return axis.getValue(
          isVertical ? origin - event.clientY : event.clientX - origin,
        )
      }

      const newValue = getValueFromEvent(event)

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
        const handleValue = getValueFromEvent(moveEvent)

        if (isRightHandle) {
          if (leftValue == null || handleValue > leftValue) {
            onChange([leftValue, handleValue])
          }
        } else {
          if (!isRangeMode || rightValue == null || handleValue < rightValue) {
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
      <div
        ref={rootRef}
        className={cn(
          styles.rangeSlider,
          hasHistogram && styles.rangeSlider_hasHistogram,
          isDisabled && styles.rangeSlider_disabled,
          isVertical && styles.rangeSlider_vertical,
          !!dragState && styles.rangeSlider_active,
        )}
        onMouseDown={!isDisabled ? handleMouseDown : undefined}
      >
        {histogram && (
          <RangeSliderHistogram
            width={size}
            height={histogramHeight}
            data={histogram}
            selectedArea={histogramSelectedArea}
            selectedStrict={isHistogramPoints ? strict : null}
            color={color}
            barPositions={histogramBarPositions}
          />
        )}
        <div
          className={cn(
            styles.rangeSlider__ruler,
            isVertical && styles.rangeSlider__ruler_vertical,
          )}
        >
          {axis.ticks.map(value => {
            const offset = axis.getOffset(value)

            return (
              <div
                key={value}
                className={cn(
                  styles.rangeSlider__rulerTick,
                  isVertical
                    ? styles.rangeSlider__rulerTick_vertical
                    : styles.rangeSlider__rulerTick_horizontal,
                )}
                style={
                  isVertical
                    ? { bottom: `${offset}px` }
                    : { left: `${offset}px` }
                }
              />
            )
          })}
          {leftValue !== null && (
            <div
              ref={leftLabelRef}
              className={cn(
                styles.rangeSlider__label,
                isVertical
                  ? styles.rangeSlider__label_vertical
                  : styles.rangeSlider__label_horizontal,
              )}
            >
              {formatNumber(leftValue)}
            </div>
          )}
          {isRangeMode && rightValue !== null && (
            <div
              ref={rightLabelRef}
              className={cn(
                styles.rangeSlider__label,
                isVertical
                  ? styles.rangeSlider__label_vertical
                  : styles.rangeSlider__label_horizontal,
              )}
            >
              {formatNumber(rightValue)}
            </div>
          )}
          {isRangeMode && (
            <div
              ref={dividerLabelRef}
              className={cn(
                styles.rangeSlider__label,
                isVertical
                  ? styles.rangeSlider__label_vertical
                  : styles.rangeSlider__label_horizontal,
              )}
              style={{
                textAlign: 'center',
                visibility: 'hidden',
              }}
            >
              –
            </div>
          )}
          {isRangeMode && (leftValue != null || rightValue != null) && (
            <div
              className={cn(
                styles.rangeSlider__range,
                isDisabled && styles.rangeSlider__range_disabled,
                color === RangeSliderColor.Primary &&
                  styles.rangeSlider__range_primary,
                leftOffset != null && styles.rangeSlider__range_leftHandle,
                rightOffset != null && styles.rangeSlider__range_rightHandle,
              )}
              style={
                isVertical
                  ? {
                      top: `${rightOffset != null ? rightOffset : 0}px`,
                      bottom: `${leftOffset != null ? leftOffset : 0}px`,
                    }
                  : {
                      left: `${leftOffset != null ? leftOffset : 0}px`,
                      right: `${
                        rightOffset != null ? size - rightOffset : 0
                      }px`,
                    }
              }
            />
          )}
          {leftOffset !== null && (
            <div
              data-handle="left"
              className={cn(
                styles.rangeSlider__handle,
                !!(dragState && !dragState.isRightHandle) &&
                  styles.rangeSlider__handle_active,
                color === RangeSliderColor.Primary &&
                  styles.rangeSlider__handle_primary,
                (isDisabled || disabled === RangeSliderSide.Left) &&
                  styles.rangeSlider__handle_disabled,
                strict &&
                  [RangeSliderSide.Left, RangeSliderSide.Both].includes(
                    strict,
                  ) &&
                  styles.rangeSlider__handle_strict,
              )}
              style={{
                transform: isVertical
                  ? `translateY(${size - leftOffset}px)`
                  : `translateX(${leftOffset}px)`,
              }}
            />
          )}
          {isRangeMode && rightOffset !== null && (
            <div
              data-handle="right"
              className={cn(
                styles.rangeSlider__handle,
                !!(dragState && !dragState.isRightHandle) &&
                  styles.rangeSlider__handle_active,
                color === RangeSliderColor.Primary &&
                  styles.rangeSlider__handle_primary,
                (isDisabled || disabled === RangeSliderSide.Right) &&
                  styles.rangeSlider__handle_disabled,
                strict &&
                  [RangeSliderSide.Right, RangeSliderSide.Both].includes(
                    strict,
                  ) &&
                  styles.rangeSlider__handle_strict,
              )}
              style={{
                transform: isVertical
                  ? `translateY(${size - rightOffset}px)`
                  : `translateX(${rightOffset}px)`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
