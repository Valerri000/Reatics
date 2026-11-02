import { canEditMarketing, type RoleUser } from '@/lib/roles'

export function canAddRedirect(user: RoleUser) {
  return canEditMarketing(user)
}
