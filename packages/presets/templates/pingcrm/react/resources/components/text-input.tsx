// @ts-nocheck
import type { ComponentProps } from 'react'

export interface TextInputProps extends ComponentProps<'input'> {
  label: string
  error?: string
}

export default function TextInput({
  className,
  error,
  label,
  name,
  type,
  value,
  onChange,
}: TextInputProps) {
  return (
    <div className={className}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        className={`form-input ${error ? 'error' : ''}`}
        onChange={onChange}
      />
      {error && <div className="form-error">{error}</div>}
    </div>
  )
}
