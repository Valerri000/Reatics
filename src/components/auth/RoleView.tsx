'use client'

import React from 'react'

import type { AccountRole } from '@/lib/account'
import { signupLayout } from '@/lib/signupLayout'
import { signupPaths } from '@/lib/signupPaths'

type RoleViewProps = {
  onContinue: (role: AccountRole) => void
  onSignIn: () => void
}

export function RoleView({ onContinue, onSignIn }: RoleViewProps) {
  return (
    <div>
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black leading-none tracking-tighter text-ink">Join the network.</h2>
        <p className="mt-4 text-lg font-bold text-slate">Choose how you will use Reatics.</p>
      </div>
      <div className={`${signupLayout.phone} ${signupLayout.desktop}`}>
        {signupPaths.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onContinue(item.id)}
            className="rounded-[2.5rem] border-2 border-transparent bg-sand p-8 text-left hover:border-brand hover:bg-blue-50"
          >
            <span className="block text-xl font-black text-ink">{item.title}</span>
            <span className="mt-2 block text-sm font-medium leading-relaxed text-slate">{item.text}</span>
            <span className="mt-6 inline-flex rounded-lg bg-blue-100/50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand">
              {item.detail}
            </span>
          </button>
        ))}
      </div>
      <button className="mt-8 block text-base text-brand" type="button" onClick={onSignIn}>
        Already have an account? Sign in
      </button>
    </div>
  )
}
