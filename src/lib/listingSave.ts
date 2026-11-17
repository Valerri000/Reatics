import { canModerate, type RoleUser } from '@/lib/roles'

export function canSaveListing(user: RoleUser) {
  return canModerate(user)
}
