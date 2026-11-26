import { listingLeftPublic } from '@/lib/listingVisibility'

export function compedSkipsCharge(status: string | null | undefined) {
  return status === 'comped'
}

export function billingChargeLabel(status: string | null | undefined) {
  if (status === 'comped') return 'Comped'
  return ''
}

export function compedStaysVisible() {
  return !listingLeftPublic({ kind: 'lease', availability: 'available', subscriptionStatus: 'comped' })
}
