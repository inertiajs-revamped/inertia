// @ts-nocheck
import { Link, usePage } from '@inertiajs-revamped/react'
import Icon from './icon'

export interface MainMenuProps {
  className?: string
  closeMenu?: () => void
}

export default function MainMenu({ className, closeMenu }: MainMenuProps) {
  const { url } = usePage()

  const isUrl = (...urls: string[]): boolean => {
    let currentUrl = url.slice(1)
    if (urls[0] === '') {
      return currentUrl === ''
    }
    return !!urls.filter((url) => currentUrl.startsWith(url)).length
  }

  return (
    <div className={className}>
      <div className="mb-4">
        <Link
          className="group flex items-center py-3"
          href="/"
          {...(closeMenu && { onClick: closeMenu })}
        >
          <Icon
            name="dashboard"
            className={`mr-2 w-4 h-4 ${
              url === '/'
                ? 'fill-white'
                : 'fill-indigo-400 group-hover:fill-white'
            }`}
          />
          <div
            className={
              url === '/'
                ? 'text-white'
                : 'text-indigo-300 group-hover:text-white'
            }
          >
            Dashboard
          </div>
        </Link>
      </div>
      <div className="mb-4">
        <Link
          className="group flex items-center py-3"
          href="/organizations"
          {...(closeMenu && { onClick: closeMenu })}
        >
          <Icon
            name="office"
            className={`mr-2 w-4 h-4 ${
              isUrl('organizations')
                ? 'fill-white'
                : 'fill-indigo-400 group-hover:fill-white'
            }`}
          />
          <div
            className={
              isUrl('organizations')
                ? 'text-white'
                : 'text-indigo-300 group-hover:text-white'
            }
          >
            Organizations
          </div>
        </Link>
      </div>
      <div className="mb-4">
        <Link
          className="group flex items-center py-3"
          href="/contacts"
          {...(closeMenu && { onClick: closeMenu })}
        >
          <Icon
            name="users"
            className={`mr-2 w-4 h-4 ${
              isUrl('contacts')
                ? 'fill-white'
                : 'fill-indigo-400 group-hover:fill-white'
            }`}
          />
          <div
            className={
              isUrl('contacts')
                ? 'text-white'
                : 'text-indigo-300 group-hover:text-white'
            }
          >
            Contacts
          </div>
        </Link>
      </div>
      <div className="mb-4">
        <Link
          className="group flex items-center py-3"
          href="/reports"
          {...(closeMenu && { onClick: closeMenu })}
        >
          <Icon
            name="printer"
            className={`mr-2 w-4 h-4 ${
              isUrl('reports')
                ? 'fill-white'
                : 'fill-indigo-400 group-hover:fill-white'
            }`}
          />
          <div
            className={
              isUrl('reports')
                ? 'text-white'
                : 'text-indigo-300 group-hover:text-white'
            }
          >
            Reports
          </div>
        </Link>
      </div>
    </div>
  )
}
