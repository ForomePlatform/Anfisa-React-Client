import { RangeSliderScale } from './types'

type GetScaleTransformsParams = {
  min: number
  max: number
  scale: RangeSliderScale
  step: number
  width: number
}

type ScaleTransform = {
  getOffset: (value: number) => number
  getValue: (offset: number) => number
  alignValue: (value: number) => number
}

export const getScaleTransform = ({
  min,
  max,
  width,
  step,
  scale,
}: GetScaleTransformsParams): ScaleTransform => {
  if (width <= 0) {
    return {
      getValue: () => 0,
      getOffset: () => 0,
      alignValue: () => 0,
    }
  }

  const fractionDigits = step < 1 ? Math.ceil(-Math.log10(step)) : 0

  const alignValue = (value: number) => {
    let rounded = Math.round(value / step) * step

    if (step < 1) {
      rounded = +rounded.toFixed(fractionDigits)
    }

    return Math.max(Math.min(rounded, max), min)
  }

  if (scale === 'logarithmic') {
    let pad = 0
    let calcWidth = width
    let logMin = min

    if (min <= 0) {
      logMin = step
      const stepK = Math.log10(max / step) / width
      pad = Math.log10(2) / stepK
      calcWidth = width - pad
    }

    const k = Math.log10(max / logMin) / calcWidth

    return {
      getOffset: value =>
        value === 0 ? 0 : pad + Math.log10(value / logMin) / k,
      getValue: offset =>
        offset < pad / 2
          ? 0
          : logMin * Math.pow(10, Math.max(offset - pad, 0) * k),
      alignValue,
    }
  }

  const k = (max - min) / width

  return {
    getOffset: value => (value - min) / k,
    getValue: offset => min + offset * k,
    alignValue,
  }
}

type AdjustLabelsParams = {
  leftLabel: HTMLDivElement | null
  rightLabel: HTMLDivElement | null
  dividerLabel: HTMLDivElement | null
  leftOffset: number | null
  rightOffset: number | null
  width: number
}

const VALUE_LABELS_SPACING = 20

export const adjustLabels = ({
  leftLabel,
  rightLabel,
  dividerLabel,
  leftOffset,
  rightOffset,
  width,
}: AdjustLabelsParams): void => {
  let leftWidth = 0
  let rightWidth = 0
  let leftX = 0
  let rightX = 0

  if (leftLabel && leftOffset !== null) {
    leftWidth = leftLabel.offsetWidth
    leftX = Math.min(Math.max(0, leftOffset - leftWidth / 2), width - leftWidth)
  }

  if (rightLabel && rightOffset !== null) {
    rightWidth = rightLabel.offsetWidth
    rightX = Math.min(rightOffset - rightWidth / 2, width - rightWidth)
  }

  if (
    leftOffset !== null &&
    rightOffset !== null &&
    leftX + leftWidth + VALUE_LABELS_SPACING > rightX
  ) {
    const totalWidth = leftWidth + rightWidth + VALUE_LABELS_SPACING
    const center = (leftOffset + rightOffset) / 2

    leftX = Math.max(Math.min(center - totalWidth / 2, width - totalWidth), 0)
    rightX = leftX + leftWidth + VALUE_LABELS_SPACING

    if (dividerLabel) {
      dividerLabel.style.visibility = 'visible'
      dividerLabel.style.left = `${leftX + leftWidth}px`
      dividerLabel.style.width = `${VALUE_LABELS_SPACING}px`
    }
  } else {
    if (dividerLabel) {
      dividerLabel.style.visibility = 'hidden'
    }
  }

  if (leftLabel) {
    leftLabel.style.left = `${leftX}px`
  }

  if (rightLabel) {
    rightLabel.style.left = `${rightX}px`
  }
}
