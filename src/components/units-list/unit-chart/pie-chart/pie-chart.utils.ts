import styles from './pie-chart.module.css'

import * as d3 from 'd3'
import { PieArcDatum } from 'd3'

import { SvgChartRenderParams } from '@components/svg-chart'
import { TVariant } from '@service-providers/common'
import { defaultColors, selectedColors } from '../unit.chart.data'
import { TPieChartData } from '../unit-chart.interface'
import { getVariantCountsText, reduceVariantsData } from '../utils'
import { getDifferentBarColors } from '../utils/getDifferentColors'
import { getPieChartColor } from '../utils/getPieChartColor'

export const getShortNumber = (value: number): string => {
  if (value < 1000000) {
    return String(value)
  }
  const shortedValue = (value / 1000000).toFixed(1)
  return `${shortedValue} mln`
}

const maxItems = defaultColors.length

export const drawPieChart = ({
  svg,
  data,
  width,
  height,
  tooltip,
  isDashboard,
  selectedVariants,
  onSelectVariantByChart,
}: SvgChartRenderParams<TPieChartData>): void => {
  const radius = Math.min(width, height) / 2

  const slicedData = reduceVariantsData(data, maxItems)

  const chart = d3
    .select(svg)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`)

  const pie = d3.pie<TVariant>().value(variant => variant[1])
  const arcPath = d3
    .arc<PieArcDatum<TVariant>>()
    .innerRadius(radius * 0.6)
    .outerRadius(radius)

  const renderTooltip = ({
    index,
    data: variant,
  }: PieArcDatum<TVariant>): string => {
    return `<span class='${
      styles.tooltipPoint
    }' style='background: ${getDifferentBarColors(
      index,
      defaultColors,
    )}'></span><span class='ml-3'>${
      slicedData[index][0]
    }</span>${getVariantCountsText(variant)}`
  }

  const getFunctionForColorChoice = (index: number, barName: string) => {
    return !isDashboard
      ? getPieChartColor({
          selectedVariants,
          barName,
          index,
          type: 'fill',
        })
      : getDifferentBarColors(index, selectedColors)
  }

  chart
    .selectAll('pieSector')
    .data(pie(slicedData))
    .join('path')
    .attr('d', arcPath)
    .attr('fill', (item, index) =>
      getFunctionForColorChoice(index, item.data[0]),
    )
    .attr(
      'stroke',
      (item, index) =>
        !isDashboard &&
        getPieChartColor({
          selectedVariants,
          barName: item.data[0],
          index,
          type: 'stroke',
        }),
    )
    .on('click', (_, item) => {
      onSelectVariantByChart?.(item.data[0])
    })
    .on('mouseover', (event, item) => {
      tooltip.show(event.target, renderTooltip(item))
    })
    .on('mouseout', () => {
      tooltip.hide()
    })
}
