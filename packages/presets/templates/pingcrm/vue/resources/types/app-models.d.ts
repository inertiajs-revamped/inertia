declare global {
  namespace App.Models {
    type User = {
      id: number
      account_id: number
      first_name: string
      last_name: string
      email: string
      email_verified_at: string /* Date */
      owner: boolean
      photo_path: string | null
      created_at: string /* Date */ | null
      updated_at: string /* Date */ | null
      deleted_at: string /* Date */
      account?: Account | null
      name?: any
    }

    type Organization = {
      id: number
      account_id: number
      name: string
      email: string | null
      phone: string | null
      address: string | null
      city: string | null
      region: string | null
      country: string | null
      postal_code: string | null
      created_at: string /* Date */ | null
      updated_at: string /* Date */ | null
      deleted_at: string /* Date */
      contacts?: Contact[] | null
    }

    type Contact = {
      id: number
      account_id: number
      organization_id: number | null
      first_name: string
      last_name: string
      email: string | null
      phone: string | null
      address: string | null
      city: string | null
      region: string | null
      country: string | null
      postal_code: string | null
      created_at: string /* Date */ | null
      updated_at: string /* Date */ | null
      deleted_at: string /* Date */
      organization?: Organization | null
      name?: any
    }

    type Account = {
      id: number
      name: string
      created_at: string /* Date */ | null
      updated_at: string /* Date */ | null
      users?: User[] | null
      organizations?: Organization[] | null
      contacts?: Contact[] | null
    }
  }
}

export {}
