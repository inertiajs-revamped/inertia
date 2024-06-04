// @ts-nocheck
import BottomHeader from '@/components/bottom-header'
import FlashMessages from '@/components/flash-messages'
import MainMenu from '@/components/main-menu'
import TopHeader from '@/components/top-header'
import type { LayoutProps } from '@inertiajs-revamped/react'

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-screen">
        <div className="md:flex">
          <TopHeader />
          <BottomHeader />
        </div>
        <div className="flex flex-grow overflow-hidden">
          <MainMenu className="hidden flex-shrink-0 p-12 w-56 bg-indigo-800 overflow-y-auto md:block" />
          {/* To reset scroll region (https://inertiajs.com/pages#scroll-regions) add `scroll-region="true"` to div below */}
          <div className="px-4 py-8 w-full overflow-hidden overflow-y-auto md:p-12">
            <FlashMessages />
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
