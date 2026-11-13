export const pinRadius = 7

export const activePinRadius = 14

export function cardIsActive(slug: string | null | undefined, active: string | null) {
  return Boolean(slug) && slug === active
}

export function pinRadiusFor(slug: string | null | undefined, active: string | null) {
  return cardIsActive(slug, active) ? activePinRadius : pinRadius
}

export function favoriteNeedsSignIn(user: unknown) {
  return !user
}
