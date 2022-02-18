import React, { ReactElement, useEffect, useMemo, useRef } from 'react'

import {
  drawHistogram,
  getYAxis,
  prepareCanvas,
} from '@ui/range-slider/range-slider-histogram/utils'
import {
  RangeSliderHistogramAxisLabel,
  RangeSliderHistogramRoot,
} from './styles'

export interface IRangeSliderHistogramProps {
  className?: string
  width: number
  height?: number
  data: number[]
  selectedArea?: [number, number] | null
}

export const RangeSliderHistogram = ({
  height = 80,
  width,
  data,
  selectedArea,
}: IRangeSliderHistogramProps): ReactElement | null => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const yAxis = useMemo(
    () => getYAxis(Math.max(...data), height),
    [data, height],
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
        selectedArea,
      }),
    )

    return () => window.cancelAnimationFrame(handleId)
  }, [data, width, height, selectedArea, yAxis])

  if (data.length < 2) {
    return null
  }

  return (
    <RangeSliderHistogramRoot>
      <canvas
        ref={canvasRef}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      />
      {yAxis.map(([value, offset]) => (
        <RangeSliderHistogramAxisLabel
          key={value}
          style={{
            top: offset,
          }}
        >
          {value}
        </RangeSliderHistogramAxisLabel>
      ))}
    </RangeSliderHistogramRoot>
  )
}
