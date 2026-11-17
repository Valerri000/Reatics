export const reviewListingSlugs = [
  '201-n-brand',
  '450-n-brand',
  '260-s-los-robles',
  '1000-e-walnut',
  '700-s-flower',
  '1313-ocean',
] as const

export function isReviewListing(slug: string) {
  return (reviewListingSlugs as readonly string[]).includes(slug)
}
