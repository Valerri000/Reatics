import type { ErrorEvent } from '@sentry/nextjs'

export function scrubEvent(event: ErrorEvent): ErrorEvent | null {
  if (event.request) {
    delete event.request.cookies
    delete event.request.headers
    delete event.request.data
  }
  return event
}

export function sentryOptions(dsn = process.env.SENTRY_DSN) {
  return {
    dsn,
    enabled: Boolean(dsn),
    sendDefaultPii: false,
    tracesSampleRate: 0,
    beforeSend: scrubEvent,
  }
}
