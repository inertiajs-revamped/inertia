import type { LayoutProps } from '@inertiajs-revamped/react'

export default function ({ children }: LayoutProps) {
  const createdAt = Date.now()

  return (
    <>
      <span>Site Layout</span>
      <span>{createdAt}</span>
      <div>{children}</div>
    </>
  )
}
