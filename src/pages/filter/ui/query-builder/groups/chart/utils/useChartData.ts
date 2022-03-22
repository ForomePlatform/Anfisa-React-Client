import { useRef } from 'react'
import { ChartData } from 'chart.js'
import isEqual from 'lodash/isEqual'

import { theme } from '@theme'
import {
  AttributeKinds,
  HistogramTypes,
  NumericPropertyStatusSubKinds,
  TNumericPropertyHistogram,
  TPropertyStatus,
  TVariant,
} from '@service-providers/common'
import { ChartRenderModes } from '../chart.interface'
import { getLogLabel } from './logLabels'

const colorListForPieChart: string[] = [
  theme('colors.blue.bright'),
  theme('colors.purple.bright'),
  theme('colors.yellow.secondary'),
  theme('colors.orange.bright'),
  theme('colors.grey.blue'),
]

const linHistogramColor = theme('colors.blue.bright')
const logHistogramColor = theme('colors.purple.bright')

const HISTOGRAM_FLOAT_LOG_ZERO = -16
const HISTOGRAM_INT_LOG_ZERO = -1

const getIntervalString = (
  from: string | number,
  to: string | number,
  isLast?: boolean,
): string => {
  return `[${from}, ${to}${isLast ? ']' : ')'}`
}

const FLOAT_ROUND_PRECISION = 100

const floatRound = (num: number): number =>
  Math.round(num * FLOAT_ROUND_PRECISION) / FLOAT_ROUND_PRECISION

const getHistogramChartData = (
  histogram: TNumericPropertyHistogram | undefined,
  subKind: NumericPropertyStatusSubKinds | undefined,
): ChartData<'bar'> | undefined => {
  if (!histogram || histogram[3].length === 0 || !subKind) {
    return undefined
  }

  const [mode, min, max, values] = histogram

  let data: number[]
  let labels: string[]

  const isFloat = subKind === NumericPropertyStatusSubKinds.FLOAT

  if (mode === HistogramTypes.LIN) {
    data = values.map(value => Math.round(value))

    if (!isFloat && max - min + 1 === values.length) {
      labels = values.map((_, index) => `${min + index}`)
    } else {
      const interval = (max - min) / values.length

      const round = isFloat ? floatRound : Math.round

      labels = values.map((_, index) => {
        const isLast = index === values.length - 1

        return getIntervalString(
          round(min + interval * index),
          round(isLast ? max : min + interval * (index + 1)),
          isLast,
        )
      })
    }
  } else {
    let count = values.length
    while (values[count - 1] === 0) {
      count--
    }

    data = []
    labels = []

    const isFirstZero =
      (isFloat && min === HISTOGRAM_FLOAT_LOG_ZERO) ||
      min === HISTOGRAM_INT_LOG_ZERO
    let skipZero = isFloat && isFirstZero

    for (let i = 0; i < count; ++i) {
      if (skipZero && i > 0) {
        if (values[i] !== 0) {
          skipZero = false
        } else {
          continue
        }
      }

      data.push(Math.round(values[i]))
      labels.push(
        i === 0
          ? '0'
          : getIntervalString(
              getLogLabel(min + i),
              getLogLabel(min + i + 1),
              i === count - 1,
            ),
      )
    }
  }

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          mode === HistogramTypes.LIN ? linHistogramColor : logHistogramColor,
        ],
        barPercentage: 0.95,
        categoryPercentage: 1,
      },
    ],
  }
}

const getVariantsChartData = (
  variants: TVariant[] | undefined,
  renderMode: string | undefined,
): ChartData<'bar' | 'doughnut'> | undefined => {
  if (!variants || !renderMode) {
    return undefined
  }

  const sortedVariants = variants
    .slice()
    .sort((firstVariant, secondVariant) => secondVariant[1] - firstVariant[1])

  const titleList = sortedVariants.map(variant => variant[0])

  const quantityList = sortedVariants.map(element => +element[1])

  const defaultColorList = [theme('colors.blue.bright')]

  const colors =
    renderMode === ChartRenderModes.Pie
      ? colorListForPieChart
      : defaultColorList

  return {
    labels: titleList,
    datasets: [
      {
        data: quantityList,
        backgroundColor: colors,
      },
    ],
  }
}

export const useChartData = (
  status: TPropertyStatus,
): ChartData<'bar' | 'doughnut'> | undefined => {
  const prevSourceRef = useRef<
    TNumericPropertyHistogram | TVariant[] | undefined
  >()

  const dataRef = useRef<ChartData<'bar' | 'doughnut'>>()
  const isNumeric = status.kind === AttributeKinds.NUMERIC

  if (
    !prevSourceRef.current ||
    (isNumeric && !isEqual(prevSourceRef.current, status.histogram)) ||
    (!isNumeric && !isEqual(prevSourceRef.current, status.variants))
  ) {
    if (isNumeric) {
      dataRef.current = getHistogramChartData(
        status.histogram,
        status['sub-kind'],
      )
    } else {
      dataRef.current = getVariantsChartData(
        status.variants,
        status['render-mode'],
      )
    }
  }

  prevSourceRef.current = isNumeric ? status.histogram : status.variants

  return dataRef.current
}
