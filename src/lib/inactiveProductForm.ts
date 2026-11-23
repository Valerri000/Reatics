import type { Addon } from '@/lib/addons'

export function inactiveProductBody(addon: Addon) {
  const body = new URLSearchParams()
  body.set('name', addon.name)
  body.set('active', 'false')
  body.set('metadata[addon]', addon.id)
  body.set('metadata[public_purchase]', 'false')
  return body
}
