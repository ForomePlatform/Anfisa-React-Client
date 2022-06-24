export enum Placement {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}

export const getBackground = (
  placement: Placement,
  from: string,
  to: string,
) => {
  return `linear-gradient(to ${placement}, ${from}, ${to})`
}

export const createShadow = (
  container: HTMLDivElement,
  placement: Placement,
  size: number,
  fromColor: string,
  toColor: string,
) => {
  const sizePx = `${size}px`
  const shadow = document.createElement('div')

  Object.assign(shadow.style, {
    position: 'absolute',
    display: 'none',
    zIndex: 2,
    top: placement === Placement.bottom ? undefined : 0,
    right: placement === Placement.left ? undefined : 0,
    bottom: placement === Placement.top ? undefined : 0,
    left: placement === Placement.right ? undefined : 0,
    width:
      placement === Placement.left || placement === Placement.right
        ? sizePx
        : undefined,
    height:
      placement === Placement.top || placement === Placement.bottom
        ? sizePx
        : undefined,
    background: getBackground(placement, fromColor, toColor),
  })

  container.appendChild(shadow)

  return shadow
}

export const createTrigger = (
  container: HTMLDivElement,
  placement: Placement,
): HTMLElement => {
  const trigger = document.createElement('div')

  Object.assign(trigger.style, {
    position: 'absolute',
    zIndex: 10,
    left: placement === Placement.right ? '100%' : 0,
    right: placement === Placement.left ? '100%' : 0,
    top: placement === Placement.bottom ? '100%' : 0,
    bottom: placement === Placement.top ? '100%' : 0,
  })

  trigger.style.position = 'absolute'
  trigger.style.zIndex

  container.appendChild(trigger)

  return trigger
}
