declare module '@inertiajs-revamped/vue' {
  interface Filters {
    search: string | null
    role: string | null
    trashed: string | null
  }

  interface PaginationLink {
    url: string | null
    label: string
    active: boolean
  }

  interface PageProps {
    auth: {
      user: App.Models.User
    }
    filters: Filters
    flash: {
      error: string | null
      success: string | null
    }
    contacts: {
      data: App.Models.Contact[]
      links: PaginationLink[]
    }
    contact: App.Models.Contact
    organizations: {
      data: App.Models.Organization[]
      links: PaginationLink[]
    }
    organization: App.Models.Organization
    users: {
      data: App.Models.User[]
      links: PaginationLink[]
    }
    user: App.Models.User
    versions: {
      php: string
      laravel: string
    }
  }
}

export {}
