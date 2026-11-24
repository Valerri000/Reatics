import type { AccountRole } from '@/lib/account'

const dreRoles: AccountRole[] = ['broker', 'owner', 'broker-owner']

export function asksForDre(role: string | null | undefined) {
  return dreRoles.includes(role as AccountRole)
}
