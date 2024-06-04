// @ts-nocheck
import type { ComponentProps } from 'react'

export interface SelectInputProps extends ComponentProps<'select'> {
  error?: string
  label: string
}

export default function SelectInput({
  children,
  className,
  error,
  label,
  name,
  ...props
}: SelectInputProps) {
  return (
    <div className={className}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      <select
        id={name}
        name={name}
        {...props}
        className={`form-select ${error ? 'error' : ''}`}
      >
        {children}
      </select>
      {error && <div className="form-error">{error}</div>}
    </div>
  )
}
