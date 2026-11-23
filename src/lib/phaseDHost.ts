import { stagingAdmin, stagingOrigin } from '@/lib/reviewAccounts'

export const phaseDReviewHost = stagingOrigin
export const phaseDAdmin = stagingAdmin

export function phaseDHostCheck() {
  return {
    home: phaseDReviewHost,
    admin: phaseDAdmin,
    homePath: '/',
    adminPath: '/admin',
  }
}
