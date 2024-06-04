// @ts-nocheck
import { Link, usePage } from '@inertiajs-revamped/react'
import { useEffect, useRef, useState } from 'react'
import Icon from './icon'

export default function BottomHeader() {
  const { auth } = usePage().props

  const [menuOpened, setMenuOpened] = useState(false)

  const didMount = useRef(false)

  useEffect(() => {
    if (didMount.current) {
      if (menuOpened) document.addEventListener('keydown', onKeyDown, false)
      return () => document.removeEventListener('keydown', onKeyDown, false)
    } else {
      didMount.current = true
    }
  }, [menuOpened])

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' || e.key === 'Esc') setMenuOpened(false)
  }

  return (
    <div className="d:text-md flex items-center justify-between p-4 w-full text-sm bg-white border-b md:px-12 md:py-0">
      <div className="mr-4 mt-1">{auth.user.account?.name}</div>
      <div className="relative">
        <div
          className="group flex items-center cursor-pointer select-none"
          onClick={() => setMenuOpened(true)}
        >
          <div className="mr-1 text-gray-800 group-hover:text-indigo-600 focus:text-indigo-600 whitespace-nowrap">
            <span>{auth.user.first_name}</span>
            <span className="hidden ml-1 md:inline">{auth.user.last_name}</span>
          </div>
          <Icon
            className="w-5 h-5 text-gray-800 group-hover:text-indigo-600 focus:text-indigo-600 fill-current"
            name="cheveron-down"
          />
        </div>
        <div className={menuOpened ? '' : 'hidden'}>
          <div className="absolute z-20 left-auto right-0 top-0 mt-8 py-2 whitespace-nowrap text-sm bg-white rounded shadow-xl">
            <Link
              href={`/users/${auth.user.id}/edit`}
              className="block px-6 py-2 hover:text-white hover:bg-indigo-600"
              onClick={() => setMenuOpened(false)}
            >
              My Profile
            </Link>
            <Link
              href="/users"
              className="block px-6 py-2 hover:text-white hover:bg-indigo-600"
              onClick={() => setMenuOpened(false)}
            >
              Manage Users
            </Link>
            <Link
              as="button"
              href="/logout"
              className="block px-6 py-2 w-full text-left hover:text-white hover:bg-indigo-600 focus:outline-none"
              method="delete"
            >
              Logout
            </Link>
          </div>
          <div
            onClick={() => {
              setMenuOpened(false)
            }}
            className="fixed z-10 inset-0 bg-black opacity-25"
          ></div>
        </div>
      </div>
    </div>
  )
}
