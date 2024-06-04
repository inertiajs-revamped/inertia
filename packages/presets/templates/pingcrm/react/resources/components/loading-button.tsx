// @ts-nocheck
import type { ComponentProps } from 'react'

export interface LoadingButtonProps extends ComponentProps<'button'> {
  loading: boolean
}

export default function LoadingButton({
  className,
  children,
  loading,
  type,
}: LoadingButtonProps) {
  return (
    <button
      disabled={loading}
      className={`flex items-center ${className}`}
      type={type}
    >
      {loading && <div className="btn-spinner mr-2" />}
      {children}
    </button>
  )
}
