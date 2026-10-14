import { clearSessionMarks, markSessionStarted } from '@/lib/session'

export type AccountRole = 'space-seeker' | 'broker' | 'owner' | 'broker-owner' | 'coworking'

export type AccountUser = {
  id: number
  email: string
  firstName?: string | null
  lastName?: string | null
  role?: AccountRole | null
  verified?: boolean | null
}

export type AccountInput = {
  firstName: string
  lastName: string
  email: string
  password: string
  role: AccountRole
  company?: string
  jobTitle?: string
  mobilePhone?: string
  officePhone?: string
  phone?: string
  dreNumber?: string
  listsProperties?: boolean
  referralAccepted?: boolean
}

type FieldError = { path?: string; message?: string }

type ApiBody = {
  message?: string
  errors?: { message?: string; data?: { errors?: FieldError[] } }[]
}

async function readBody(response: Response): Promise<ApiBody> {
  return (await response.json().catch(() => ({}))) as ApiBody
}

export function errorMessage(body: ApiBody) {
  return body.errors?.[0]?.message || body.message || ''
}

export function fieldErrorMap(body: ApiBody) {
  const errors: Record<string, string> = {}
  const list = body.errors?.[0]?.data?.errors || []
  for (const item of list) {
    if (!item.path) continue
    if (/unique/i.test(item.message || '') || /already/i.test(item.message || '')) {
      errors[item.path] = 'An account with this email already exists.'
      continue
    }
    errors[item.path] = item.message || 'Enter your email address.'
  }
  return errors
}

export function isLockedMessage(message: string) {
  return /lock/i.test(message)
}

export async function signIn(email: string, password: string) {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const body = await readBody(response)
  if (!response.ok) {
    return { ok: false as const, locked: isLockedMessage(errorMessage(body)) }
  }
  markSessionStarted()
  return { ok: true as const, locked: false }
}

export async function signOut() {
  await fetch('/api/users/logout', { method: 'POST', credentials: 'include' })
  clearSessionMarks()
}

export async function createAccount(input: AccountInput) {
  const response = await fetch('/api/users', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  const body = await readBody(response)
  if (!response.ok) {
    return { ok: false as const, fields: fieldErrorMap(body), message: errorMessage(body) }
  }
  const signedIn = await signIn(input.email, input.password)
  if (!signedIn.ok) {
    return { ok: false as const, fields: {}, message: 'Email or password is incorrect.' }
  }
  return { ok: true as const }
}

export async function requestPasswordReset(email: string) {
  await fetch('/api/users/forgot-password', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
}

export async function saveNewPassword(token: string, password: string) {
  const response = await fetch('/api/users/reset-password', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  })
  const body = await readBody(response)
  if (!response.ok) {
    const message = errorMessage(body)
    if (/token|code|match|invalid|expired/i.test(message)) {
      return { ok: false as const, message: 'That code does not match.' }
    }
    return { ok: false as const, message: 'That code does not match.' }
  }
  return { ok: true as const }
}
