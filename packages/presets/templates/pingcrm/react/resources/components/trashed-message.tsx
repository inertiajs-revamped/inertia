// @ts-nocheck
import type { PropsWithChildren } from 'react'
import Icon from './icon'

export type TrashedMessageProps = PropsWithChildren<{
  className?: string
  onRestore: (event: any) => void
}>

export default function TrashedMessages({
  children,
  onRestore,
}: TrashedMessageProps) {
  return (
    <div className="flex items-center justify-between mb-6 p-4 max-w-3xl bg-yellow-400 rounded">
      <div className="flex items-center">
        <Icon name="trash" className="shrink-0 mr-2 w-4 h-4 fill-yellow-800" />
        <div className="text-yellow-800 text-sm font-medium">{children}</div>
      </div>
      <button
        className="text-yellow-800 hover:underline text-sm"
        tabIndex={-1}
        type="button"
        onClick={onRestore}
      >
        Restore
      </button>
    </div>
  )
}
