'use client'

import React, { useState } from 'react'

import { scholarshipErrors, scholarshipMessage, type ScholarshipErrors } from '@/lib/scholarshipMessage'
import { sendContactMessage } from '@/lib/sendContactMessage'

const inputClass = 'w-full rounded-2xl bg-sand px-5 py-4 text-base font-bold text-ink outline-none'

export function ScholarshipForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [school, setSchool] = useState('')
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState<ScholarshipErrors>({})
  const [sent, setSent] = useState(false)
  const [pending, setPending] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = scholarshipErrors({ name, email, message: note, school, note })
    setErrors(next)
    if (next.name || next.email || next.school || next.note) return
    setPending(true)
    try {
      const result = await sendContactMessage({
        name,
        email,
        message: scholarshipMessage({ name, email, message: note, school, note }),
      })
      if (!result.ok) {
        setErrors({
          name: result.errors.name,
          email: result.errors.email,
          note: result.errors.message,
        })
        return
      }
      setSent(true)
    } finally {
      setPending(false)
    }
  }

  if (sent) {
    return <p className="m-0 text-base font-semibold text-ink">Your message has been sent.</p>
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <Field label="Name" name="name" value={name} error={errors.name} onChange={setName} />
      <Field label="Email" name="email" type="email" value={email} error={errors.email} onChange={setEmail} />
      <Field label="School" name="school" value={school} error={errors.school} onChange={setSchool} />
      <label className="block">
        <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray">Note</span>
        <textarea
          name="note"
          value={note}
          rows={6}
          placeholder="A short note about why you are studying the field."
          onChange={(event) => setNote(event.target.value)}
          className={`${inputClass} ${errors.note ? 'border-2 border-brand' : ''}`}
        />
        {errors.note ? <p className="m-0 mt-2 text-sm text-brand">{errors.note}</p> : null}
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-[2rem] bg-ink px-6 py-5 text-lg font-black text-white disabled:bg-line disabled:text-placeholder"
      >
        Send message
      </button>
    </form>
  )
}

function Field({
  label,
  name,
  value,
  error,
  onChange,
  type = 'text',
}: {
  label: string
  name: string
  value: string
  error?: string
  onChange: (value: string) => void
  type?: string
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} ${error ? 'border-2 border-brand' : ''}`}
      />
      {error ? <p className="m-0 mt-2 text-sm text-brand">{error}</p> : null}
    </label>
  )
}
