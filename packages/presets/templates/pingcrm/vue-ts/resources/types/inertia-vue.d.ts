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

  interface ModelPagination<Model> {
    data: Model[]
    links: PaginationLink[]
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
    contact: App.Models.Contact
    organization: App.Models.Organization
    user: App.Models.User & { photo: string | null }
    contacts: App.Models.Contact[]
    organizations: App.Models.Organization[]
    users: (App.Models.User & { photo: string | null })[]
    versions: {
      php: string
      laravel: string
    }
  }
}

export {}
