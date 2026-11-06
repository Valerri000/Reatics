'use client'

import React, { useState } from 'react'

import type { AccountRole } from '@/lib/account'

const choices: { id: AccountRole; title: string; text: string; detail: string }[] = [
  {
    id: 'space-seeker',
    title: 'Space seeker',
    text: 'I am looking for commercial or coworking space.',
    detail: 'Free.',
  },
  {
    id: 'broker',
    title: 'Broker',
    text: 'I am a professional broker representing clients or properties.',
    detail: '$129 a month. A DRE number is required.',
  },
  {
    id: 'owner',
    title: 'Property owner',
    text: 'I own commercial assets and want to list them directly.',
    detail: '$129 a month.',
  },
  {
    id: 'coworking',
    title: 'Coworking provider',
    text: 'I manage flexible workspaces and shared office hubs.',
    detail: 'Free.',
  },
]

type RoleViewProps = {
  onContinue: (role: AccountRole) => void
  onSignIn: () => void
}

export function RoleView({ onContinue, onSignIn }: RoleViewProps) {
  const [asking, setAsking] = useState(false)

  return (
    <div>
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black leading-none tracking-tighter text-ink">
          {asking ? 'Will you be listing properties?' : 'Join the network.'}
        </h2>
        <p className="mt-4 text-lg font-bold text-slate">
          {asking
            ? 'Choose a broker profile, or a broker profile that also lists properties.'
            : 'Choose how you will use Reatics.'}
        </p>
      </div>
      {asking ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <RoleCard
            title="Yes, I will list properties"
            text="Broker profile with listings."
            detail="$129 a month. A DRE number is required."
            onSelect={() => onContinue('broker-owner')}
          />
          <RoleCard
            title="No, broker profile only"
            text="Broker profile without listings."
            detail="$129 a month. A DRE number is required."
            onSelect={() => onContinue('broker')}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {choices.map((item) => (
            <RoleCard
              key={item.id}
              title={item.title}
              text={item.text}
              detail={item.detail}
              onSelect={() => {
                if (item.id === 'broker') {
                  setAsking(true)
                  return
                }
                onContinue(item.id)
              }}
            />
          ))}
        </div>
      )}
      {asking ? (
        <button className="mt-8 block text-base text-brand" type="button" onClick={() => setAsking(false)}>
          Go back
        </button>
      ) : null}
      <button className="mt-4 block text-base text-brand" type="button" onClick={onSignIn}>
        Already have an account? Sign in
      </button>
    </div>
  )
}

function RoleCard({
  title,
  text,
  detail,
  onSelect,
}: {
  title: string
  text: string
  detail: string
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="rounded-[2.5rem] border-2 border-transparent bg-sand p-8 text-left hover:border-brand hover:bg-blue-50"
    >
      <span className="block text-xl font-black text-ink">{title}</span>
      <span className="mt-2 block text-sm font-medium leading-relaxed text-slate">{text}</span>
      <span className="mt-6 inline-flex rounded-lg bg-blue-100/50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand">
        {detail}
      </span>
    </button>
  )
}
