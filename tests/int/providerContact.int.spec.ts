import { describe, expect, it } from 'vitest'

import { coworkingPublicContact } from '@/lib/providerContact'

describe('provider contact', () => {
  it('keeps the provider phone and email off a public coworking listing', () => {
    const contact = coworkingPublicContact({
      kind: 'coworking',
      brokerName: 'Hidden Provider',
      brokerPhone: '555-0100',
      brokerEmail: 'hidden@provider.test',
    })
    expect(contact).toEqual({ phone: '1-888-518-9168', broker: null })
    expect(JSON.stringify(contact)).not.toContain('555-0100')
    expect(JSON.stringify(contact)).not.toContain('hidden@provider.test')
  })
})
