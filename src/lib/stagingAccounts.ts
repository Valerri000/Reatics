import type { AccountRole } from '@/lib/account'
import { canBill, canEditPages, canModerate, isOwner, isStaff, type AdminRole } from '@/lib/roles'

export type StagingAccount = {
  email: string
  password: string
  firstName: string
  lastName: string
  role: AccountRole
  adminRole: AdminRole | null
}

export const stagingPassword = 'Review-day9-shell'

export const stagingAccounts: StagingAccount[] = [
  {
    email: 'staging-owner@example.com',
    password: stagingPassword,
    firstName: 'Owner',
    lastName: 'Review',
    role: 'space-seeker',
    adminRole: 'owner',
  },
  {
    email: 'staging-content@example.com',
    password: stagingPassword,
    firstName: 'Content',
    lastName: 'Review',
    role: 'space-seeker',
    adminRole: 'content-manager',
  },
  {
    email: 'staging-moderator@example.com',
    password: stagingPassword,
    firstName: 'Moderator',
    lastName: 'Review',
    role: 'space-seeker',
    adminRole: 'moderator',
  },
  {
    email: 'staging-member@example.com',
    password: stagingPassword,
    firstName: 'Member',
    lastName: 'Review',
    role: 'space-seeker',
    adminRole: null,
  },
]

export function accessFor(account: StagingAccount) {
  const user = { adminRole: account.adminRole }
  return {
    admin: isStaff(user),
    pages: canEditPages(user),
    listings: canModerate(user),
    billing: canBill(user),
    audit: isOwner(user),
  }
}
