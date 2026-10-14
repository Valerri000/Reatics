export const IDLE_TIMEOUT_MS = 30 * 60 * 1000
export const MAX_SESSION_MS = 8 * 60 * 60 * 1000
export const LOCK_DURATION_MS = 15 * 60 * 1000
export const MAX_LOGIN_ATTEMPTS = 5
export const MIN_PASSWORD_LENGTH = 8
export const TOKEN_EXPIRATION_SECONDS = 8 * 60 * 60

const startedKey = 'reatics.sessionStarted'
const activityKey = 'reatics.lastActivity'

export function markSessionStarted() {
  const now = String(Date.now())
  localStorage.setItem(startedKey, now)
  localStorage.setItem(activityKey, now)
}

export function clearSessionMarks() {
  localStorage.removeItem(startedKey)
  localStorage.removeItem(activityKey)
}

export function touchActivity() {
  if (!localStorage.getItem(startedKey)) return
  localStorage.setItem(activityKey, String(Date.now()))
}

export function sessionExpired(now = Date.now()) {
  const started = Number(localStorage.getItem(startedKey) || 0)
  const activity = Number(localStorage.getItem(activityKey) || 0)
  if (!started || !activity) return false
  if (now - activity >= IDLE_TIMEOUT_MS) return true
  if (now - started >= MAX_SESSION_MS) return true
  return false
}
