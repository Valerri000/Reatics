import type { Plan } from '@/lib/plans'

export function priceLabel(plan: Pick<Plan, 'cents' | 'paid' | 'interval'>) {
  if (!plan.paid || plan.cents === 0) return 'Free'
  const dollars = plan.cents / 100
  const amount = Number.isInteger(dollars) ? `$${dollars}` : `$${dollars.toFixed(2)}`
  return plan.interval === 'month' ? `${amount}/month` : amount
}
