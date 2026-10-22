'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

import { ChevronIcon } from '@/components/icons'
import { accountLinks } from '@/lib/access'
import type { AccountUser } from '@/lib/account'

type AccountMenuProps = {
  user: AccountUser
  onSignOut: () => void
}

export function AccountMenu({ user, onSignOut }: AccountMenuProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const links = accountLinks(user)

  useEffect(() => {
    if (!open) return
    function onPointer(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener('mousedown', onPointer)
    return () => window.removeEventListener('mousedown', onPointer)
  }, [open])

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="inline-flex items-center gap-1 text-[16px] font-bold text-ink"
        onClick={() => setOpen((value) => !value)}
      >
        {user.firstName || 'Account'}
        <ChevronIcon />
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-30 mt-2 w-60 border border-line bg-white">
          {links.map((item) => (
            <Link
              className="flex h-[44px] items-center px-4 text-[16px] text-ink"
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button
            className="flex h-[44px] w-full items-center border-t border-line px-4 text-left text-[16px] text-slate"
            onClick={onSignOut}
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  )
}
