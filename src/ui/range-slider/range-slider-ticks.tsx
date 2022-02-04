import React from 'react'

import { RangeSliderTick } from './styles'
import { RangeSliderScale } from './types'
import { getScaleTransform } from './utils'

interface RangeSliderTicksProps {
  min: number
  max: number
  step: number
  scale: RangeSliderScale
  width: number
}

const MIN_TICK_SPACE = 30

export const RangeSliderTicks = React.memo(
  ({ min, max, step, scale, width }: RangeSliderTicksProps) => {
    const { getOffset } = getScaleTransform({ min, max, step, scale, width })

    const diff = max - min

    const ticks: number[] = [min]

    if (scale === 'logarithmic') {
      let tickStep = Math.pow(10, Math.ceil(Math.log10(min || step)))
      let nextStep = tickStep * 10
      let tick = min + tickStep

      while (tick < max) {
        ticks.push(tick)
        tick += tickStep

        if (tick >= nextStep - Number.EPSILON) {
          tickStep = nextStep
          nextStep = nextStep * 10
        }
      }
    } else {
      let tickStep = Math.pow(10, Math.ceil(Math.log10(diff)) - 1)
      let divider = 2
      let candidateStep = tickStep / divider

      while (
        candidateStep > step &&
        getOffset(min + candidateStep) > MIN_TICK_SPACE
      ) {
        candidateStep = tickStep / divider
        tickStep = candidateStep
        divider = divider === 2 ? 5 : 2
      }

      let pos = Math.floor((min + tickStep) / tickStep) * tickStep

      while (pos < max) {
        ticks.push(pos)
        pos += tickStep
      }
    }

    ticks.push(max)

    return (
      <React.Fragment>
        {ticks.map(value => (
          <RangeSliderTick
            key={value}
            style={{
              left: `${getOffset(value)}px`,
            }}
          />
        ))}
      </React.Fragment>
    )
  },
)

RangeSliderTicks.displayName = 'RangeSliderTicks'
