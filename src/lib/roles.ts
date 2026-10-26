export const adminRoles = ['owner', 'content-manager', 'moderator'] as const

export type AdminRole = (typeof adminRoles)[number]

export type RoleUser = {
  id?: number | string
  adminRole?: AdminRole | null
} | null

export function isOwner(user: RoleUser) {
  return user?.adminRole === 'owner'
}

export function isContentManager(user: RoleUser) {
  return user?.adminRole === 'content-manager'
}

export function isModerator(user: RoleUser) {
  return user?.adminRole === 'moderator'
}

export function isStaff(user: RoleUser) {
  return isOwner(user) || isContentManager(user) || isModerator(user)
}

export function canEditPages(user: RoleUser) {
  return isOwner(user) || isContentManager(user)
}

export function canEditMarketing(user: RoleUser) {
  return canEditPages(user)
}

export function canModerate(user: RoleUser) {
  return isOwner(user) || isModerator(user)
}

export function canBill(user: RoleUser) {
  return isOwner(user)
}

export function ownRecord(user: { id: number | string }) {
  return {
    id: {
      equals: user.id,
    },
  }
}
