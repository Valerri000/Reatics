import { applyWebhookStatus } from '@/lib/applyWebhookStatus'
import { verifyStripeSignature } from '@/lib/stripeSignature'
import { acceptsTestEvent, webhookAccountStatus } from '@/lib/webhookStatus'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const payload = await request.text()
  const header = request.headers.get('stripe-signature') || ''
  const checked = verifyStripeSignature(payload, header, process.env.STRIPE_WEBHOOK_SECRET || '')
  if (!checked.ok || !checked.event) return Response.json({ received: false }, { status: 400 })
  if (!acceptsTestEvent(checked.event)) return Response.json({ received: false }, { status: 400 })
  const update = webhookAccountStatus(checked.event)
  if (update) await applyWebhookStatus(update)
  return Response.json({ received: true })
}
