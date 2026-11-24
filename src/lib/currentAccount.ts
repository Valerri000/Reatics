import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'

import type { AccountUser } from '@/lib/account'
import config from '@/payload.config'

export async function currentAccount(): Promise<AccountUser | null> {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })
  if (!user) return null
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    verified: user.verified,
    dreValidated: user.dreValidated,
  }
}
