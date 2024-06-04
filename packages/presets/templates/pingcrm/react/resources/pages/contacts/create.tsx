// @ts-nocheck
import LoadingButton from '@/components/loading-button'
import SelectInput from '@/components/select-input'
import TextInput from '@/components/text-input'
import Layout from '@/layouts/layout'
import {
  Head,
  Link,
  useForm,
  usePage,
  withLayout,
} from '@inertiajs-revamped/react'
import type { FormEvent } from 'react'

const Create = () => {
  const { organizations } = usePage().props

  const { data, setData, errors, post, processing } = useForm({
    first_name: '',
    last_name: '',
    organization_id: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    country: '',
    postal_code: '',
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/contacts')
  }

  return (
    <>
      <Head title="Create Contact" />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          className="text-indigo-400 hover:text-indigo-600"
          href="/contacts"
        >
          Contacts
        </Link>
        <span className="text-indigo-400 font-medium"> /</span> Create
      </h1>
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
              value={data.organization_id}
              onChange={(e) => setData('organization_id', e.target.value)}
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
              value={data.country}
              onChange={(e) => setData('country', e.target.value)}
            >
              <option value=""></option>
              <option value="CA">Canada</option>
              <option value="US">United States</option>
            </SelectInput>
            <TextInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="Postal code"
              name="postal_code"
              type="text"
              error={errors.postal_code}
              value={data.postal_code}
              onChange={(e) => setData('postal_code', e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
            <LoadingButton
              loading={processing}
              className="btn-indigo"
              type="submit"
            >
              Create Contact
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  )
}

Create.layout = withLayout(Layout)

export default Create
