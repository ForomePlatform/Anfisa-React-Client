export enum Placement {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
}

export enum DisplayValue {
  initial = 'initial',
  none = 'none',
  block = 'block',
}

export const getBackground = (placement: Placement) => {
  return `linear-gradient(to ${placement}, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.25))`
}

export const createShadow = (
  container: HTMLDivElement,
  placement: Placement,
) => {
  const size = '20px'
  const shadow = document.createElement('div')

  Object.assign(shadow.style, {
    position: 'absolute',
    display: DisplayValue.initial,
    zIndex: 2,
    top: placement === Placement.bottom ? undefined : 0,
    right: placement === Placement.left ? undefined : 0,
    bottom: placement === Placement.top ? undefined : 0,
    left: placement === Placement.right ? undefined : 0,
    width:
      placement === Placement.left || placement === Placement.right
        ? size
        : undefined,
    height:
      placement === Placement.top || placement === Placement.bottom
        ? size
        : undefined,
    background: getBackground(placement),
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
