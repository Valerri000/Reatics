'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { FavoritesScreen } from '@/components/account/FavoritesScreen'
import { createFavoriteFolder, moveSavedListing, removeSavedListing } from '@/lib/favoriteActions'
import type { FavoriteFolder } from '@/lib/favoriteFolders'
import type { SavedListing } from '@/lib/favoriteItems'

export function FavoritesAccount({
  folders,
  saved,
  signedIn,
}: {
  folders: FavoriteFolder[]
  saved: SavedListing[]
  signedIn: boolean
}) {
  const router = useRouter()
  const [notice, setNotice] = useState('')

  return (
    <FavoritesScreen
      folders={folders}
      saved={saved}
      signedIn={signedIn}
      notice={notice}
      onCreate={(name) => {
        void createFavoriteFolder(name).then((result) => {
          setNotice(result.message)
          if (result.ok) router.refresh()
        })
      }}
      onMove={(id, folderId) => {
        void moveSavedListing(id, folderId).then((result) => {
          setNotice(result.message)
          if (result.ok) router.refresh()
        })
      }}
      onRemove={(id) => {
        void removeSavedListing(id).then((result) => {
          setNotice(result.message)
          if (result.ok) router.refresh()
        })
      }}
    />
  )
}
