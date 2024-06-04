// @ts-nocheck
import LoadingButton from '@/components/loading-button'
import SelectInput from '@/components/select-input'
import TextInput from '@/components/text-input'
import TrashedMessage from '@/components/trashed-message'
import Layout from '@/layouts/layout'
import {
  Head,
  Link,
  router,
  useForm,
  usePage,
  withLayout,
} from '@inertiajs-revamped/react'
import type { FormEvent } from 'react'

export function Edit() {
  const { contact, organizations } = usePage().props

  const { data, setData, errors, put, processing } = useForm({
    first_name: contact.first_name || '',
    last_name: contact.last_name || '',
    organization_id: contact.organization_id || '',
    email: contact.email || '',
    phone: contact.phone || '',
    address: contact.address || '',
    city: contact.city || '',
    region: contact.region || '',
    country: contact.country || '',
    postal_code: contact.postal_code || '',
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    put(`/contacts/${contact.id}`)
  }

  const handleDestroy = () => {
    if (confirm('Are you sure you want to delete this contact?')) {
      router.delete(`/contacts/${contact.id}`)
    }
  }

  const handleRestore = () => {
    if (confirm('Are you sure you want to restore this contact?')) {
      router.put(`/contacts/${contact.id}/restore`)
    }
  }

  return (
    <>
      <Head title={`${data.first_name} ${data.last_name}`} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          className="text-indigo-400 hover:text-indigo-600"
          href="/contacts"
        >
          Contacts
        </Link>
        <span className="text-indigo-400 font-medium"> / </span>
        {data.first_name} {data.last_name}
      </h1>
      {contact.deleted_at && (
        <TrashedMessage className="mb-6" onRestore={handleRestore}>
          This contact has been deleted.
        </TrashedMessage>
      )}
      <div className="max-w-3xl bg-white rounded-md shadow overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mb-8 -mr-6 p-8">
            <TextInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="First name"
              name="first_name"
              type="text"
              error={errors.first_name}
              value={data.first_name}
              onChange={(e) => setData('first_name', e.target.value)}
            />
            <TextInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="Last name"
              name="last_name"
              type="text"
              error={errors.last_name}
              value={data.last_name}
              onChange={(e) => setData('last_name', e.target.value)}
            />
            <SelectInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="Organization"
              name="organization_id"
              error={errors.organization_id}
              onChange={(e) => setData('organization_id', e.target.value)}
              defaultValue={data.organization_id}
            >
              <option value="null" />
              {Array.isArray(organizations) &&
                organizations.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
            </SelectInput>
            <TextInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="Email"
              name="email"
              type="email"
              error={errors.email}
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
            />
            <TextInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="Phone"
              name="phone"
              type="text"
              error={errors.phone}
              value={data.phone}
              onChange={(e) => setData('phone', e.target.value)}
            />
            <TextInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="Address"
              name="address"
              type="text"
              error={errors.address}
              value={data.address}
              onChange={(e) => setData('address', e.target.value)}
            />
            <TextInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="City"
              name="city"
              type="text"
              error={errors.city}
              value={data.city}
              onChange={(e) => setData('city', e.target.value)}
            />
            <TextInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="Province/State"
              name="region"
              type="text"
              error={errors.region}
              value={data.region}
              onChange={(e) => setData('region', e.target.value)}
            />
            <SelectInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="Country"
              name="country"
              error={errors.country}
              onChange={(e) => setData('country', e.target.value)}
              defaultValue={data.country}
            >
              <option value="null" />
              <option value="CA">Canada</option>
              <option value="US">United States</option>
            </SelectInput>
            <TextInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="Postal code"
              name="postal_code"
              type="text"
              error={errors.postal_code}
              onChange={(e) => setData('postal_code', e.target.value)}
              defaultValue={data.postal_code}
            />
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-50 border-t border-gray-100">
            {!contact.deleted_at && (
              <button
                className="text-red-600 hover:underline"
                tabIndex={-1}
                type="button"
                onClick={handleDestroy}
              >
                Delete Contact
              </button>
            )}
            <LoadingButton
              loading={processing}
              className="btn-indigo ml-auto"
              type="submit"
            >
              Update Contact
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  )
}

Edit.layout = withLayout(Layout)

export default Edit
