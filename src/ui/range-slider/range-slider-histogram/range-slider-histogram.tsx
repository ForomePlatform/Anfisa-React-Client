import styles from './range-slider-histogram.module.css'

import { ReactElement, useEffect, useMemo, useRef } from 'react'
import cn, { Argument } from 'classnames'

import { formatNumber } from '@core/format-number'
import { RangeSliderColor, RangeSliderSide } from '../range-slider.interface'
import {
  drawHistogram,
  getYAxis,
  prepareCanvas,
} from './range-slider-histogram.utils'

export interface IRangeSliderHistogramProps {
  className?: Argument
  width: number
  height: number
  data: number[]
  barPositions?: number[]
  selectedArea?: [number, number] | null
  selectedStrict?: RangeSliderSide | null
  color?: RangeSliderColor
}

export const RangeSliderHistogram = ({
  height,
  width,
  data,
  barPositions: barPositionsProp,
  selectedArea,
  selectedStrict,
  color = RangeSliderColor.Primary,
}: IRangeSliderHistogramProps): ReactElement | null => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const yAxis = useMemo(() => getYAxis(data, height), [data, height])

  const barPositions = useMemo(
    () =>
      barPositionsProp || data.map((_, index) => (width / data.length) * index),
    [barPositionsProp, width, data],
  )

  useEffect(() => {
    if (canvasRef.current) {
      prepareCanvas(canvasRef.current, width, height)
    }
  }, [width, height])

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')

    if (!ctx || data.length < 2) {
      return
    }

    const handleId = window.requestAnimationFrame(() =>
      drawHistogram({
        ctx,
        width,
        height,
        data,
        yAxis,
        barPositions,
        selectedArea,
        selectedStrict,
        color,
      }),
    )

    return () => window.cancelAnimationFrame(handleId)
  }, [
    data,
    width,
    height,
    selectedArea,
    selectedStrict,
    yAxis,
    color,
    barPositions,
  ])

  if (data.length < 2) {
    return null
  }

  return (
    <div className={cn(styles.rangeSliderHistogram)}>
      <canvas
        ref={canvasRef}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      />
      {yAxis.ticks.map(value => (
        <span
          key={value}
          className={cn(styles.rangeSliderHistogram__axisLabel)}
          style={{
            top: `${yAxis.scale(value)}px`,
          }}
        >
          {formatNumber(value)}
        </span>
      ))}
    </div>
  )
}
