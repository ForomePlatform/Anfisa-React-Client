import styles from './samples-cell.module.css'

import React from 'react'

export const handleSampleMouseEnter = (
  event: React.MouseEvent<HTMLDivElement>,
): void => {
  const containerEl = event.currentTarget
  const contentEl = event.currentTarget.firstElementChild

  if (contentEl && contentEl.scrollWidth > contentEl.clientWidth) {
    const tooltip = document.createElement('div')
    tooltip.className = styles.samples__tooltip
    tooltip.innerHTML = contentEl.innerHTML

    containerEl.appendChild(tooltip)
    containerEl.addEventListener(
      'mouseleave',
      () => {
        tooltip.remove()
      },
      {
        once: true,
      },
    )
  }
}
