export function refundChargeId(value: string | null | undefined) {
  const clean = (value || '').trim()
  if (!/^((ch)|(pi))_[A-Za-z0-9]+$/.test(clean)) return ''
  return clean
}

export function refundForm(input: { chargeId: string; amountCents: number }) {
  const id = refundChargeId(input.chargeId)
  if (!id) return { ok: false as const, body: '' }
  if (!Number.isInteger(input.amountCents) || input.amountCents <= 0) return { ok: false as const, body: '' }
  const body = new URLSearchParams()
  if (id.startsWith('pi_')) body.set('payment_intent', id)
  else body.set('charge', id)
  body.set('amount', String(input.amountCents))
  return { ok: true as const, body: body.toString() }
}
