import { addonById } from '@/lib/addons'
import { canCheckout } from '@/lib/plans'

export function publicPurchaseAllowed(id: string) {
  if (addonById(id)) return false
  return canCheckout(id)
}
