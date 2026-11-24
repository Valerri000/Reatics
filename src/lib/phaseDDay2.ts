import { inBrokerDirectory } from '@/lib/directoryRule'
import { publicCoworkingProvider } from '@/lib/providerVisibility'
import { asksForDre } from '@/lib/dreRequirement'
import { signupPaths } from '@/lib/signupPaths'

export function phaseDDay2Check() {
  return {
    paths: signupPaths.map((path) => path.id),
    seekerAsksDre: asksForDre('space-seeker'),
    brokerAsksDre: asksForDre('broker'),
    ownerAsksDre: asksForDre('owner'),
    bothAsksDre: asksForDre('broker-owner'),
    unvalidatedBrokerListed: inBrokerDirectory({
      role: 'broker-owner',
      dreNumber: '01234567',
      dreValidated: false,
    }),
    validatedBrokerListed: inBrokerDirectory({
      role: 'broker-owner',
      dreNumber: '01234567',
      dreValidated: true,
    }),
    unverifiedProviderPublic: publicCoworkingProvider({ role: 'coworking', verified: false }),
  }
}
