import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { pinColor, pinPulse, pinPulseMs, pinRippleColor } from '@/lib/mapPinMotion'

const stage = readFileSync('src/components/market/MapStage.tsx', 'utf8')

describe('listing pin pulse', () => {
  it('grows a ring and then starts again', () => {
    const start = pinPulse(0)
    const middle = pinPulse(pinPulseMs / 2)
    expect(pinColor).toBe('#2563eb')
    expect(pinRippleColor).toBe('#60a5fa')
    expect(stage).toContain('pinRippleColor')
    expect(pinPulseMs).toBeGreaterThanOrEqual(3200)
    expect(start.opacity).toBeGreaterThanOrEqual(0.8)
    expect(start.opacity).toBeLessThanOrEqual(0.95)
    expect(pinPulse(pinPulseMs / 2).opacity).toBe(start.opacity)
    expect(pinPulse(pinPulseMs - 1).opacity).toBeLessThan(0.02)
    expect(pinPulse(500).radius - start.radius).toBeLessThan(16)
    expect(middle.radius).toBeGreaterThan(start.radius)
    expect(pinPulse(pinPulseMs * 0.85).opacity).toBeLessThan(start.opacity)
    expect(pinPulse(pinPulseMs)).toEqual(start)
    expect(pinPulse(0, pinPulseMs / 2).radius).toBeGreaterThan(start.radius)
    expect(stage).toContain('pins-pulse')
    expect(stage).not.toContain('pins-pulse-late')
    expect(stage).toContain('requestAnimationFrame')
    expect(stage).not.toContain("'#0f172a'")
    expect(stage).not.toContain('"#0f172a"')
  })
})
