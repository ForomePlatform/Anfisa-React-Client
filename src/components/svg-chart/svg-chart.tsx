import {
  ComponentType,
  ReactElement,
  SVGProps,
  useEffect,
  useRef,
  useState,
} from 'react'

import { GlbPagesNames } from '@glb/glb-names'
import { ChartTooltip, globalTooltip } from './svg-chart.utils'

export type SvgChartRenderParams<Data> = {
  svg: SVGSVGElement
  width: number
  height: number
  data: Data
  tooltip: ChartTooltip
  selectedVariants?: string[]
  page?: GlbPagesNames
  onSelectVariantByChart?: ((variant: string) => void) | undefined
}

interface ISvgChartProps<Data> extends SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  component?: 'svg' | ComponentType<SVGProps<SVGSVGElement>>
  data: Data
  selectedVariants?: string[] | undefined
  page?: GlbPagesNames
  render: (params: SvgChartRenderParams<Data>) => void
  onSelectVariantByChart?: (variant: string) => void
}

export const SvgChart = <Data,>({
  width: widthProp,
  height: heightProp,
  data,
  selectedVariants,
  component: Component = 'svg',
  page,
  render,
  onSelectVariantByChart,
  ...svgProps
}: ISvgChartProps<Data>): ReactElement => {
  const renderRef = useRef(render)
  renderRef.current = render

  const svgRef = useRef<SVGSVGElement>(null)

  const [[width, height], setSize] = useState([widthProp ?? 0, heightProp ?? 0])

  useEffect(() => {
    setSize([widthProp ?? 0, heightProp ?? 0])
    const svg = svgRef.current
    const parent = svg?.parentElement
    if (svg && parent && (!widthProp || !heightProp)) {
      const observer = new ResizeObserver(entries => {
        setSize([
          widthProp ?? entries[0].contentRect.width,
          heightProp ?? entries[0].contentRect.height,
        ])
      })
      observer.observe(parent)

      return () => observer.disconnect()
    }
  }, [widthProp, heightProp])

  useEffect(() => {
    const svg = svgRef.current

    if (svg && width > 0 && height > 0) {
      svg.replaceChildren()
      renderRef.current({
        svg,
        data,
        width,
        height,
        tooltip: globalTooltip,
        selectedVariants,
        page,
        onSelectVariantByChart,
      })
    }
  }, [data, width, height, onSelectVariantByChart, selectedVariants, page])

  return (
    <Component
      ref={svgRef}
      {...svgProps}
      width={width}
      height={height}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        ...svgProps.style,
      }}
    />
  )
}
