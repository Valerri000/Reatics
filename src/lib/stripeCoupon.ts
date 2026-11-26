export function stripeCouponId(value: string | null | undefined) {
  const clean = (value || '').trim()
  if (!/^[A-Za-z0-9_-]{1,40}$/.test(clean)) return ''
  return clean
}
