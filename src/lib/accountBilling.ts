export const accountBillingStatuses = ['active', 'past_due', 'canceled', 'comped'] as const

export type AccountBillingStatus = (typeof accountBillingStatuses)[number]

export function accountBillingStatus(value: string | null | undefined): AccountBillingStatus | null {
  if (!value) return null
  return (accountBillingStatuses as readonly string[]).includes(value) ? (value as AccountBillingStatus) : null
}

export function statusFromSubscription(status: string | null | undefined): AccountBillingStatus | null {
  if (status === 'active' || status === 'past_due' || status === 'canceled') return status
  return null
}
