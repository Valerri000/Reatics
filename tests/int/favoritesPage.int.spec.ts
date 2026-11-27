import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('favorites page', () => {
  it('lists folders on the seeker favorites page', () => {
    const page = readFileSync('src/app/(frontend)/account/[section]/page.tsx', 'utf8')
    const account = readFileSync('src/components/account/FavoritesAccount.tsx', 'utf8')
    expect(page).toContain('FavoritesAccount')
    expect(page).toContain("section === 'favorites'")
    expect(page).toContain('loadFavoriteBoard')
    expect(account).toContain('createFavoriteFolder')
    expect(account).toContain('moveSavedListing')
    expect(account).toContain('removeSavedListing')
  })
})
