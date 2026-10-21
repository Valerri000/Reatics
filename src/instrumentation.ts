import { captureRequestError } from '@sentry/nextjs'

export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  const Sentry = await import('@sentry/nextjs')
  const { sentryOptions } = await import('@/lib/sentry')
  Sentry.init(sentryOptions())
}

export const onRequestError = captureRequestError
