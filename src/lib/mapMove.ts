export function geocodesOnMove(action: 'pan' | 'zoom') {
  if (action === 'pan') return false
  if (action === 'zoom') return false
  return false
}

export function pinsAfterMove<T>(pins: T[]) {
  return pins
}
