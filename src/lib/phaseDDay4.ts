import { compedSkipsCharge, billingChargeLabel, compedStaysVisible } from '@/lib/compedPlan'
import { portalCopy } from '@/lib/portalCopy'
import { canIssueRefund } from '@/lib/refundAccess'
import { stripeCouponId } from '@/lib/stripeCoupon'
import { acceptsTestEvent } from '@/lib/webhookStatus'

export function phaseDDay4Check() {
  return {
    portal: portalCopy.purpose,
    emptyReceipts: portalCopy.emptyReceipts,
    couponIsStripe: stripeCouponId('SAVE10') === 'SAVE10' && stripeCouponId('10%') === '',
    ownerRefund: canIssueRefund({ adminRole: 'owner' }),
    managerRefund: canIssueRefund({ adminRole: 'content-manager' }),
    moderatorRefund: canIssueRefund({ adminRole: 'moderator' }),
    compedSkipsCharge: compedSkipsCharge('comped'),
    compedLabel: billingChargeLabel('comped'),
    compedVisible: compedStaysVisible(),
    liveRefused: acceptsTestEvent({ livemode: true }) === false,
  }
}
