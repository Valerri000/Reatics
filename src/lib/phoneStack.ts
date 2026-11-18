export const phoneWidth = 320
export const tabletWidth = 768
export const desktopWidth = 1920

export function stacksOnPhone(width: number) {
  return width <= phoneWidth
}

export function stacksOnTablet(width: number) {
  return width > phoneWidth && width <= tabletWidth
}
