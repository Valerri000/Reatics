import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return sourceFiles(path)
    return path.endsWith('.ts') || path.endsWith('.tsx') ? [path] : []
  })
}

describe('stripe keys', () => {
  it('keeps Stripe keys out of the repository', () => {
    const example = readFileSync('.env.example', 'utf8')
    expect(example).toContain('STRIPE_SECRET_KEY=\n')
    expect(example).toContain('STRIPE_WEBHOOK_SECRET=\n')
    expect(example).toContain('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=\n')
    expect(example).not.toMatch(/sk_(test|live)_[A-Za-z0-9]|rk_(test|live)_[A-Za-z0-9]|pk_(test|live)_[A-Za-z0-9]|whsec_/)
    const leaked = sourceFiles('src').filter((path) =>
      /sk_(test|live)_[A-Za-z0-9]{8,}|rk_(test|live)_[A-Za-z0-9]{8,}|whsec_[A-Za-z0-9]/.test(readFileSync(path, 'utf8')),
    )
    expect(leaked).toEqual([])
  })
})
