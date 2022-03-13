import { FC, useEffect, useRef } from 'react'

import chartStore from './chart.store'

interface IProps {
  filteredVariants: [string, number][]
  totalCounts: number
}

export const PieChart: FC<IProps> = ({ filteredVariants, totalCounts }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { drawDoughnutChart, getDataForPieChart } = chartStore

  const data = getDataForPieChart(filteredVariants)

  useEffect(() => {
    if (canvasRef.current) {
      drawDoughnutChart(canvasRef.current, data, totalCounts)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <canvas ref={canvasRef}></canvas>
}
