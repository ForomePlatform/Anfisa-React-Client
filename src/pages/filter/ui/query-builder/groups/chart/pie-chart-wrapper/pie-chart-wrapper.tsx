import { FC, useState } from 'react'
import { ChartData } from 'chart.js'

import { formatNumber } from '@core/format-number'
import { t } from '@i18n'
import { theme } from '@theme'
import {
  CollapseBtn,
  LabelQuantity,
  LabelRow,
  LabelRowLeft,
  LabelRowLeftName,
  LabelRowRight,
  LabelsWrapper,
  MainWrapper,
  PieChartContainer,
  StyledIcon,
  Total,
  TotalValue,
} from './pie-chart-wrapper.styles'
import { getShortNumber } from './pie-chart-wrapper.utils'

interface IPieChartProps {
  chartData: ChartData<'doughnut'>
  children: any
}

const labelsInCollapsedMode = 3

export const PieChartWrapper: FC<IPieChartProps> = ({
  chartData,
  children,
}) => {
  const [isListCollapsed, setIsListCollapsed] = useState(true)
  const variants = (chartData.labels ?? []) as string[]
  const { data, backgroundColor } = chartData.datasets[0]

  const totalCountsOnChart = data.reduce(
    (previousValue, variant) => previousValue + variant,
    0,
  )

  const variantList = isListCollapsed
    ? variants.slice(0, labelsInCollapsedMode)
    : variants
  const shouldShowCollapseBtn = variants.length > labelsInCollapsedMode

  return (
    <MainWrapper>
      <LabelsWrapper>
        {variantList.map((variantName, index) => {
          const optionPercentage = (
            (data[index] / totalCountsOnChart) *
            100
          ).toFixed(2)

          return (
            <LabelRow key={variantName}>
              <LabelRowLeft>
                <LabelRowLeftName>
                  <StyledIcon
                    name="Circle"
                    color={
                      (backgroundColor as string[])[index] ??
                      theme('colors.grey.blue')
                    }
                  />
                  {variantName}
                </LabelRowLeftName>

                <LabelQuantity>
                  {t('filter.chart.variants', {
                    value: formatNumber(data[index]),
                  })}
                </LabelQuantity>
              </LabelRowLeft>
              <LabelRowRight> {optionPercentage}%</LabelRowRight>
            </LabelRow>
          )
        })}

        {shouldShowCollapseBtn && (
          <CollapseBtn onClick={() => setIsListCollapsed(!isListCollapsed)}>
            {isListCollapsed
              ? t('filter.chart.seeAll')
              : t('filter.chart.hide')}
          </CollapseBtn>
        )}
      </LabelsWrapper>

      <PieChartContainer>
        {children}
        <Total>
          <span>{t('filter.chart.total')}</span>
          <TotalValue>{getShortNumber(totalCountsOnChart)}</TotalValue>
        </Total>
      </PieChartContainer>
    </MainWrapper>
  )
}
