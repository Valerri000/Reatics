import React from 'react'

type TextFieldProps = {
  label: string
  name: string
  value: string
  placeholder: string
  error?: string
  invalid?: boolean
  type?: string
  autoComplete?: string
  onChange: (value: string) => void
}

export function TextField({
  label,
  name,
  value,
  placeholder,
  error,
  invalid = false,
  type = 'text',
  autoComplete,
  onChange,
}: TextFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-base font-semibold leading-6 text-ink">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className={`h-12 w-full bg-white px-3 text-base text-ink outline-none placeholder:text-placeholder ${
          error || invalid ? 'border-2 border-brand' : 'border border-hairline'
        }`}
      />
      {error ? <p className="mt-2 text-sm text-brand">{error}</p> : null}
    </label>
  )
}
