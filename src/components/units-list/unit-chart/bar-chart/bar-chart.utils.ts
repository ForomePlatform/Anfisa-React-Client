import * as d3 from 'd3'

import { getBounds, getYScaleAndAxis } from '@core/charts'
import { theme } from '@theme'
import { SvgChartRenderParams } from '@components/svg-chart/svg-chart'
import { TVariant } from '@service-providers/common'
import { colors } from '../pie-chart/pie-chart.utils'
import { TBarChartData } from '../unit-chart.interface'
import { getVariantCountsText } from '../utils'

const tickColor = theme('colors.grey.blue')

const margin = {
  top: 10,
  right: 0,
  bottom: 10,
  left: 48,
}

const renderTooltip = (variant: TVariant): string => {
  return `${variant[0]}${getVariantCountsText(variant)}`
}

export const drawBarChart = ({
  svg,
  data,
  width,
  height,
  tooltip,
}: SvgChartRenderParams<TBarChartData>): void => {
  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  const chart = d3
    .select(svg)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const categories = data.map(item => item[0])
  const [min, max] = getBounds(data, item => item[1])

  const xScale = d3
    .scaleBand()
    .range([0, chartWidth])
    .domain(categories)
    .padding(0.1)
    .align(0)

  const [yScale, yAxis, isLogScale] = getYScaleAndAxis({
    min,
    max,
    height: chartHeight,
  })

  chart
    .append('g')
    .call(yAxis.tickSizeInner(-chartWidth).tickSizeOuter(0).tickPadding(8))

  chart
    .append('line')
    .attr('x1', 0)
    .attr('x2', chartWidth)
    .attr('y1', chartHeight)
    .attr('y2', chartHeight)
    .attr('stroke', tickColor)

  const barWidth = xScale.bandwidth()

  // in logarithmic scale 1 will be scaled to 0 height
  // lets make it half the height of 2
  // log10(2) ~= 0.3, and 10^0.15 = 1.413
  const getY = isLogScale
    ? (item: TVariant) => yScale(Math.max(item[1], 1.413))
    : (item: TVariant) => yScale(item[1])

  const getDifferentBarColors = (index: number) => {
    return colors[index % colors.length]
  }

  chart
    .selectAll('bar')
    .data(data)
    .join('rect')
    .attr('x', item => xScale(item[0]) as number)
    .attr('y', item => getY(item))
    .attr('width', barWidth)
    .attr('height', item => chartHeight - getY(item))
    .attr('fill', (_, index) => getDifferentBarColors(index))
    .on('mouseover', (event, item) => {
      tooltip.show(event.target, renderTooltip(item))
    })
    .on('mouseout', () => {
      tooltip.hide()
    })
}
