// @ts-nocheck
import LoadingButton from '@/components/loading-button'
import SelectInput from '@/components/select-input'
import TextInput from '@/components/text-input'
import Layout from '@/layouts/layout'
import { Head, Link, useForm, withLayout } from '@inertiajs-revamped/react'
import type { FormEvent } from 'react'

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    name: '',
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
    post('/organizations')
  }

  return (
    <>
      <Head title="Create Organization" />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          className="text-indigo-400 hover:text-indigo-600"
          href="/organizations"
        >
          Organizations
        </Link>
        <span className="text-indigo-400 font-medium"> / </span> Create
      </h1>
      <div className="max-w-3xl bg-white rounded-md shadow overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mb-8 -mr-6 p-8">
            <TextInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="Name"
              name="name"
              error={errors.name}
              value={data.name}
              type="text"
              onChange={(e) => setData('name', e.target.value)}
            />
            <TextInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="Email"
              name="email"
              error={errors.email}
              value={data.email}
              type="email"
              onChange={(e) => setData('email', e.target.value)}
            />
            <TextInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="Phone"
              name="phone"
              error={errors.phone}
              value={data.phone}
              type="text"
              onChange={(e) => setData('phone', e.target.value)}
            />
            <TextInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="Address"
              name="address"
              error={errors.address}
              value={data.address}
              type="text"
              onChange={(e) => setData('address', e.target.value)}
            />
            <TextInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="City"
              name="city"
              error={errors.city}
              value={data.city}
              type="text"
              onChange={(e) => setData('city', e.target.value)}
            />
            <TextInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="Province/State"
              name="region"
              error={errors.region}
              value={data.region}
              type="text"
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
              error={errors.postal_code}
              value={data.postal_code}
              type="text"
              onChange={(e) => setData('postal_code', e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
            <LoadingButton
              loading={processing}
              className="btn-indigo"
              type="submit"
            >
              Create Organization
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  )
}

Create.layout = withLayout(Layout)

export default Create
