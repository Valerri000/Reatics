'use client'

import Link from 'next/link'
import React, { useState } from 'react'

import { ChevronIcon } from '@/components/icons'
import { accountLinks } from '@/lib/access'
import type { AccountUser } from '@/lib/account'

type AccountMenuProps = {
  user: AccountUser
  onSignOut: () => void
}

export function AccountMenu({ user, onSignOut }: AccountMenuProps) {
  const [open, setOpen] = useState(false)
  const links = accountLinks(user)

  return (
    <div className="relative">
      <button
        className="inline-flex items-center gap-1 text-base font-bold text-ink"
        onClick={() => setOpen((value) => !value)}
      >
        {user.firstName || 'Account'}
        <ChevronIcon />
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-30 mt-2 w-60 border border-line bg-white">
          {links.map((item) => (
            <Link
              className="flex h-11 items-center px-4 text-base text-ink"
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button
            className="flex h-11 w-full items-center border-t border-line px-4 text-left text-base text-slate"
            onClick={onSignOut}
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  )
}
