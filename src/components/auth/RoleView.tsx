'use client'

import React, { useState } from 'react'

import { Button } from '@/components/Button'
import type { AccountRole } from '@/lib/account'

const choices: { id: AccountRole; title: string; detail: string }[] = [
  { id: 'space-seeker', title: 'I am looking for space', detail: 'Space seeker. Free.' },
  {
    id: 'broker',
    title: 'I am a broker',
    detail: 'Broker. $129 a month. A DRE number is required.',
  },
  { id: 'owner', title: 'I will list properties', detail: 'Owner with listings. $129 a month.' },
  { id: 'coworking', title: 'I provide coworking space', detail: 'Coworking provider. Free.' },
]

type RoleViewProps = {
  onContinue: (role: AccountRole) => void
  onSignIn: () => void
}

export function RoleView({ onContinue, onSignIn }: RoleViewProps) {
  const [choice, setChoice] = useState<AccountRole | null>(null)
  const [asking, setAsking] = useState(false)
  const [lists, setLists] = useState<boolean | null>(null)

  function continueFromChoice() {
    if (!choice) return
    if (choice === 'broker') {
      setAsking(true)
      return
    }
    onContinue(choice)
  }

  return (
    <div>
      <h2 className="pr-10 text-[28px] font-extrabold leading-none text-ink md:text-[32px]">
        {asking ? 'Will you be listing properties?' : 'Create an account'}
      </h2>
      {asking ? null : <p className="mt-4 text-base text-slate">How will you use Reatics?</p>}
      <div className="mt-6 space-y-4">
        {asking ? (
          <>
            <ChoiceRow
              title="Yes, I will list properties"
              selected={lists === true}
              onSelect={() => setLists(true)}
            />
            <ChoiceRow
              title="No, broker profile only"
              selected={lists === false}
              onSelect={() => setLists(false)}
            />
          </>
        ) : (
          choices.map((item) => (
            <ChoiceRow
              key={item.id}
              title={item.title}
              detail={item.detail}
              selected={choice === item.id}
              onSelect={() => setChoice(item.id)}
            />
          ))
        )}
      </div>
      <Button
        className="mt-6 w-full"
        type="button"
        disabled={asking ? lists === null : !choice}
        onClick={() => {
          if (asking) {
            if (lists === null) return
            onContinue(lists ? 'broker-owner' : 'broker')
            return
          }
          continueFromChoice()
        }}
      >
        Continue
      </Button>
      <button className="mt-4 block text-base text-brand" type="button" onClick={onSignIn}>
        Already have an account? Sign in
      </button>
    </div>
  )
}

function ChoiceRow({
  title,
  detail,
  selected,
  onSelect,
}: {
  title: string
  detail?: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`block w-full px-4 py-4 text-left ${selected ? 'border-2 border-brand' : 'border border-line'}`}
    >
      <span className="block text-base font-bold text-ink">{title}</span>
      {detail ? <span className="mt-1 block text-sm text-gray">{detail}</span> : null}
    </button>
  )
}
