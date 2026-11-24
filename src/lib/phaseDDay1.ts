import { addons } from '@/lib/addons'
import { phaseDAccountCheck } from '@/lib/phaseDAccounts'
import { phaseDHostCheck } from '@/lib/phaseDHost'
import { planChoiceChargeOnReturn } from '@/lib/planChoiceLock'
import { plans } from '@/lib/plans'

export function phaseDDay1Check() {
  const host = phaseDHostCheck()
  const accounts = phaseDAccountCheck()
  return {
    home: host.home,
    admin: host.admin,
    passwordKept: accounts.matchesReview && accounts.samePassword,
    paid: plans.filter((plan) => plan.paid).map((plan) => `${plan.id}:${plan.cents}`),
    free: plans.filter((plan) => !plan.paid).map((plan) => plan.id),
    addonsInactive: addons.every((addon) => addon.active === false && addon.publicPurchase === false),
    chargeOnReturn: planChoiceChargeOnReturn,
  }
}
