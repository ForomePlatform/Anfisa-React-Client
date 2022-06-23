export const getNearestScrollContainer = (
  el: HTMLElement,
): HTMLElement | null => {
  let containerEl: HTMLElement | null = el
  while (containerEl && containerEl.clientHeight === containerEl.scrollHeight) {
    containerEl = containerEl.parentElement
  }

  return containerEl
}
