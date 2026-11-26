import { canBill, type RoleUser } from '@/lib/roles'

export function canIssueRefund(user: RoleUser) {
  return canBill(user)
}
