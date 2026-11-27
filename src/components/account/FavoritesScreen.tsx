'use client'

import React, { useState } from 'react'

import { favoriteCopy } from '@/lib/favoriteCopy'
import { orderFolders, type FavoriteFolder } from '@/lib/favoriteFolders'
import { favoriteLayout } from '@/lib/favoriteLayout'
import type { SavedListing } from '@/lib/favoriteItems'
import { favoriteView } from '@/lib/favoriteView'

export function FavoritesScreen({
  folders,
  saved,
  signedIn,
  notice,
  onCreate,
  onMove,
  onRemove,
}: {
  folders: FavoriteFolder[]
  saved: SavedListing[]
  signedIn: boolean
  notice: string
  onCreate: (name: string) => void
  onMove: (id: string, folderId: string) => void
  onRemove: (id: string) => void
}) {
  const [name, setName] = useState('')
  const ordered = orderFolders(folders)
  const view = favoriteView({ folders: ordered.length, saved: saved.length })

  return (
    <section className={favoriteLayout.frame}>
      <div className={`mx-auto max-w-5xl ${favoriteLayout.phone} ${favoriteLayout.desktop}`}>
        <div className="rounded-xl border border-line bg-white p-6">
          <h2 className="m-0 text-xl font-bold text-ink">{favoriteCopy.folders}</h2>
          <form
            className="mt-4 flex flex-col gap-3"
            onSubmit={(event) => {
              event.preventDefault()
              const clean = name.trim()
              if (!clean) return
              onCreate(clean)
              setName('')
            }}
          >
            <label className="text-sm font-semibold text-ink">
              {favoriteCopy.newFolder}
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 block w-full rounded-lg border border-line px-3 py-2 text-base text-ink"
              />
            </label>
            <button type="submit" className="rounded-lg bg-brand px-4 py-3 text-sm font-bold">
              <span className="text-white">{favoriteCopy.newFolder}</span>
            </button>
          </form>
          {ordered.length === 0 ? (
            <p className="m-0 mt-4 text-base text-ink">No folders yet.</p>
          ) : (
            <ul className="m-0 mt-4 list-none p-0">
              {ordered.map((folder) => (
                <li key={folder.id} className="border-t border-line py-3 text-base font-semibold text-ink">
                  {folder.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-xl border border-line bg-white p-6">
          <h2 className="m-0 text-xl font-bold text-ink">{favoriteCopy.saved}</h2>
          {signedIn ? null : <p className="m-0 mt-4 text-base text-ink">{favoriteCopy.signIn}</p>}
          {view === 'empty' || saved.length === 0 ? <p className="m-0 mt-4 text-base text-ink">{favoriteCopy.empty}</p> : null}
          {notice ? <p className="m-0 mt-4 text-base font-semibold text-ink">{notice}</p> : null}
          <div className="mt-4 flex flex-col gap-4">
            {saved.map((item) => (
              <article key={item.id} className="rounded-lg border border-line p-4">
                <p className="m-0 text-base font-bold text-ink">{item.title}</p>
                <label className="mt-3 block text-sm font-semibold text-ink">
                  {favoriteCopy.move}
                  <select
                    value={item.folderId || ''}
                    onChange={(event) => onMove(item.id, event.target.value)}
                    className="mt-2 block w-full rounded-lg border border-line px-3 py-2 text-base text-ink"
                  >
                    <option value="">No folder</option>
                    {ordered.map((folder) => (
                      <option key={folder.id} value={folder.id}>
                        {folder.name}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="mt-3 rounded-lg border border-line px-4 py-2 text-sm font-bold text-ink"
                >
                  {favoriteCopy.remove}
                </button>
              </article>
            ))}
          </div>
          <p className="m-0 mt-6 text-sm font-bold text-ink">{favoriteCopy.print}</p>
          <p className="m-0 mt-1 text-sm text-ink">{favoriteCopy.estimated}</p>
        </div>
      </div>
    </section>
  )
}
