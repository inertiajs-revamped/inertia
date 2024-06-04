// @ts-nocheck
import { Link, type PaginationLink } from '@inertiajs-revamped/react'

export interface PaginationProps {
  links: PaginationLink[]
}
export default function Pagination({ links }: PaginationProps) {
  return (
    <div className="mt-6">
      {Array.isArray(links) && links.length > 3 && (
        <div className="flex flex-wrap -mb-1">
          {links.map(({ active, label, url }) => {
            if (url === null) {
              return (
                <div
                  key={label}
                  className="mb-1 mr-1 px-4 py-3 text-gray-400 text-sm leading-4 border rounded"
                >
                  <span dangerouslySetInnerHTML={{ __html: label }}></span>
                </div>
              )
            }

            return (
              <Link
                key={`link-${label}`}
                className={`mb-1 mr-1 px-4 py-3 focus:text-indigo-500 text-sm leading-4 hover:bg-white border focus:border-indigo-500 rounded ${
                  active ? 'bg-white' : ''
                }`}
                href={url}
              >
                <span dangerouslySetInnerHTML={{ __html: label }}></span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
