// @ts-nocheck
import FileInput from '@/components/file-input'
import LoadingButton from '@/components/loading-button'
import SelectInput from '@/components/select-input'
import TextInput from '@/components/text-input'
import Layout from '@/layouts/layout'
import { withLayout } from '@inertiajs-revamped/react'
import { Head, Link, useForm } from '@inertiajs-revamped/react'
import type { FormEvent } from 'react'

function Create() {
  const { data, setData, errors, post, processing } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    owner: '0',
    photo: '',
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/users')
  }

  return (
    <>
      <Head title="Create User" />
      <h1 className="mb-8 text-3xl font-bold">
        <Link className="text-indigo-400 hover:text-indigo-600" href="/users">
          Users
        </Link>
        <span className="text-indigo-400 font-medium"> / </span> Create
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
              label="Password"
              name="password"
              type="password"
              error={errors.password}
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
            />
            <SelectInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="Owner"
              name="owner"
              error={errors.owner}
              value={data.owner}
              onChange={(e) => setData('owner', e.target.value)}
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </SelectInput>
            <FileInput
              className="pb-8 pr-6 w-full lg:w-1/2"
              label="Photo"
              name="photo"
              error={errors.photo}
              value={data.photo}
              accept="image/*"
              onInput={(photo) => setData('photo', photo.name)}
            />
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100">
            <LoadingButton
              loading={processing}
              className="btn-indigo"
              type="submit"
            >
              Create User
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  )
}

Create.layout = withLayout(Layout)

export default Create
