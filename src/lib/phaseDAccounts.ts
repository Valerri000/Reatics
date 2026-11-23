import { reviewAccounts, reviewPassword } from '@/lib/reviewAccounts'
import { stagingAccounts, stagingPassword } from '@/lib/stagingAccounts'

export function phaseDAccountCheck() {
  const emails = stagingAccounts.map((account) => account.email)
  return {
    password: stagingPassword,
    matchesReview: stagingPassword === reviewPassword && stagingPassword === 'Review-day9-shell',
    emails,
    owner: emails.includes('staging-owner@example.com'),
    content: emails.includes('staging-content@example.com'),
    moderator: emails.includes('staging-moderator@example.com'),
    member: emails.includes('staging-member@example.com'),
    reviewEmails: reviewAccounts.map((account) => account.email),
    samePassword: stagingAccounts.every((account) => account.password === stagingPassword),
  }
}
