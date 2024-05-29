// @ts-nocheck
import type { ReactNode } from 'react'

declare module '@inertiajs-revamped/react' {
  interface User {
    id: number
    name: string
    email: string
    email_verified_at: string
  }

  interface PageProps {
    auth: {
      user: User
    }
  }

  interface WelcomePageProps extends PageProps {
    laravelVersion: string
    phpVersion: string
  }

  interface ProfilePageProps extends PageProps {
    mustVerifyEmail: boolean
    status?: string
  }

  interface LayoutProps {}

  interface AuthenticatedLayoutProps extends LayoutProps {
    user: User
    header?: ReactNode
  }
}
