export function graceNotice(status: string | null | undefined) {
  if (status !== 'past_due') return null
  return {
    kind: 'grace' as const,
    subject: 'Your Reatics subscription is past due',
    body: 'Your subscription is past due. Listings stay visible while payment retries continue. This notice is stored and is not sent until mail is connected.',
    status: 'stored' as const,
    sent: false as const,
  }
}
