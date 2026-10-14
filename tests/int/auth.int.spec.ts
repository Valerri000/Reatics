import { describe, expect, it } from 'vitest'

import { Users } from '@/collections/Users'
import {
  IDLE_TIMEOUT_MS,
  LOCK_DURATION_MS,
  MAX_LOGIN_ATTEMPTS,
  MAX_SESSION_MS,
  MIN_PASSWORD_LENGTH,
  TOKEN_EXPIRATION_SECONDS,
} from '@/lib/session'

describe('sign-in rules', () => {
  it('locks an account after five failures and ends sessions on the scope limits', () => {
    expect(Users.auth).toMatchObject({
      maxLoginAttempts: MAX_LOGIN_ATTEMPTS,
      lockTime: LOCK_DURATION_MS,
      tokenExpiration: TOKEN_EXPIRATION_SECONDS,
    })
    expect(MAX_LOGIN_ATTEMPTS).toBe(5)
    expect(LOCK_DURATION_MS).toBe(15 * 60 * 1000)
    expect(TOKEN_EXPIRATION_SECONDS).toBe(8 * 60 * 60)
    expect(MAX_SESSION_MS).toBe(8 * 60 * 60 * 1000)
    expect(IDLE_TIMEOUT_MS).toBe(30 * 60 * 1000)
    expect(MIN_PASSWORD_LENGTH).toBe(8)
  })

  it('does not define a card field on the account', () => {
    const names = Users.fields.flatMap((field) =>
      'name' in field && field.name ? [field.name] : [],
    )
    expect(names).not.toContain('card')
    expect(names).not.toContain('cardNumber')
    expect(names).toContain('role')
  })
})
