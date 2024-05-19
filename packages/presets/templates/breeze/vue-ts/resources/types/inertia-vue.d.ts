declare module '@inertiajs-revamped/vue' {
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
}

export {}
