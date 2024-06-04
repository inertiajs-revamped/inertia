// @ts-nocheck
import { Link } from '@inertiajs-revamped/react'
import { useEffect, useRef, useState } from 'react'
import Logo from './logo'
import MainMenu from './main-menu'

export default function TopHeader() {
  const [menuOpened, setMenuOpened] = useState(false)

  const didMount = useRef(false)

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' || e.key === 'Esc') setMenuOpened(false)
  }

  useEffect(() => {
    if (didMount.current) {
      if (menuOpened) document.addEventListener('keydown', onKeyDown, false)
      return () => {
        document.removeEventListener('keydown', onKeyDown, false)
      }
    } else {
      didMount.current = true
    }
  }, [menuOpened])

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-indigo-900 md:flex-shrink-0 md:justify-center md:w-56">
      <Link className="mt-1" href="/">
        <Logo
          className="text-white fill-current"
          width="120"
          height="28"
          aria-label="App Logo"
        />
      </Link>
      <div className="relative md:hidden">
        <svg
          onClick={() => setMenuOpened(true)}
          className="w-6 h-6 text-white fill-current cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
        <div className={`${menuOpened ? '' : 'hidden'} absolute right-0 z-20`}>
          <MainMenu
            className="relative z-20 mt-2 pb-2 px-8 py-4 bg-indigo-800 rounded shadow-lg"
            closeMenu={() => {
              setMenuOpened(false)
            }}
          />
          <div
            onClick={() => setMenuOpened(false)}
            className="fixed z-10 inset-0 bg-black opacity-25"
          ></div>
        </div>
      </div>
    </div>
  )
}
