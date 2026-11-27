export type FavoriteFolder = {
  id: string
  name: string
  createdAt: string
}

export function orderFolders(folders: FavoriteFolder[]) {
  return [...folders].sort((left, right) => (left.createdAt < right.createdAt ? 1 : left.createdAt > right.createdAt ? -1 : 0))
}

export function createFolder(folders: FavoriteFolder[], name: string, createdAt: string) {
  const clean = name.trim().slice(0, 80)
  if (!clean) return orderFolders(folders)
  return orderFolders([
    {
      id: `folder-${createdAt}`,
      name: clean,
      createdAt,
    },
    ...folders,
  ])
}
