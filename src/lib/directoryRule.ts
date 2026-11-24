export function inBrokerDirectory(account: {
  role?: string | null
  dreNumber?: string | null
  dreValidated?: boolean | null
}) {
  if (account.role !== 'broker' && account.role !== 'broker-owner') return false
  return Boolean(account.dreNumber?.trim() && account.dreValidated)
}
