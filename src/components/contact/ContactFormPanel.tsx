import React from 'react'

import type { ContactErrors, ContactInput } from '@/lib/contactMessage'

const inputClass =
  'w-full border border-hairline bg-white px-3 text-base text-ink outline-none placeholder:text-placeholder'

export function ContactFormPanel({
  sent,
  pending,
  values,
  errors,
  onChange,
  onSubmit,
}: {
  sent: boolean
  pending: boolean
  values: ContactInput
  errors: ContactErrors
  onChange: (field: keyof ContactInput, value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  if (sent) {
    return <p className="m-0 mt-8 text-base font-semibold text-ink">Your message has been sent.</p>
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid max-w-3xl gap-4">
      <Field
        label="Name"
        name="name"
        value={values.name}
        error={errors.name}
        onChange={(value) => onChange('name', value)}
      />
      <Field
        label="Email"
        name="email"
        type="email"
        value={values.email}
        error={errors.email}
        onChange={(value) => onChange('email', value)}
      />
      <label className="block">
        <span className="mb-2 block text-base font-semibold text-ink">Message</span>
        <textarea
          name="message"
          value={values.message}
          rows={6}
          onChange={(event) => onChange('message', event.target.value)}
          className={`${inputClass} py-3 ${errors.message ? 'border-2 border-brand' : ''}`}
        />
        {errors.message ? <p className="m-0 mt-2 text-sm text-brand">{errors.message}</p> : null}
      </label>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 w-fit items-center justify-center bg-brand px-6 text-base font-bold text-white disabled:bg-line disabled:text-placeholder"
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
      <span className="mb-2 block text-base font-semibold text-ink">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} h-12 ${error ? 'border-2 border-brand' : ''}`}
      />
      {error ? <p className="m-0 mt-2 text-sm text-brand">{error}</p> : null}
    </label>
  )
}
