export function coworkingCanSignIn(account: { role?: string | null; verified?: boolean | null }) {
  return account.role === 'coworking'
}

export function publicCoworkingProvider(account: { role?: string | null; verified?: boolean | null }) {
  return account.role === 'coworking' && account.verified === true
}
