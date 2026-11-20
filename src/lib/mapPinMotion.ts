export const pinColor = '#2563eb'
export const pinRippleColor = '#60a5fa'
export const pinPulseMs = 3200

export function pinPulse(elapsed: number, offset = 0) {
  const turn = (((elapsed + offset) % pinPulseMs) + pinPulseMs) % pinPulseMs
  const t = turn / pinPulseMs
  const ease = 1 - (1 - t) * (1 - t)
  const fade = t < 0.62 ? 1 : (1 - t) / 0.38
  return {
    radius: 12 + ease * 30,
    opacity: 0.9 * fade,
  }
}
