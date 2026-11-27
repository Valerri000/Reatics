export type FavoriteView = 'empty' | 'folders' | 'saved'

export function favoriteView(input: { folders: number; saved: number }): FavoriteView {
  if (input.saved > 0) return 'saved'
  if (input.folders > 0) return 'folders'
  return 'empty'
}
