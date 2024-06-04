// @ts-nocheck
import FileInput from '@/components/file-input'
import LoadingButton from '@/components/loading-button'
import SelectInput from '@/components/select-input'
import TextInput from '@/components/text-input'
import TrashedMessage from '@/components/trashed-message'
import Layout from '@/layouts/layout'
import { withLayout } from '@inertiajs-revamped/react'
import { Head, Link, router, useForm, usePage } from '@inertiajs-revamped/react'
import type { FormEvent } from 'react'

export function Edit() {
  const { user } = usePage().props

  const { data, setData, errors, post, processing } = useForm({
    _method: 'PUT',
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    email: user.email || '',
    password: user.password || '',
    owner: user.owner ? '1' : '0' || '0',
    photo: '',
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post(`/users/${user.id}`)
  }

  const handleDestroy = () => {
    if (confirm('Are you sure you want to delete this user?')) {
      router.delete(`/users/${user.id}`)
    }
  }

  const handleRestore = () => {
    if (confirm('Are you sure you want to restore this user?')) {
      router.put(`/users/${user.id}/restore`)
    }
  }

  return (
    <>
      <Head title={`${data.first_name} ${data.last_name}`} />
      <div className="flex justify-start mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold">
          <Link className="text-indigo-400 hover:text-indigo-600" href="/users">
            Users
          </Link>
          <span className="text-indigo-400 font-medium"> / </span>
          {data.first_name} {data.last_name}
        </h1>
        {user.photo && (
          <img
            className="block ml-4 w-8 h-8 rounded-full"
            src={user.photo}
            alt={data.first_name}
          />
        )}
      </div>
      {user.deleted_at && (
        <TrashedMessage onRestore={handleRestore}>
          This user has been deleted.
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
              onChange={(e) => setData('owner', e.target.value)}
              defaultValue={data.owner}
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
          <div className="flex items-center px-8 py-4 bg-gray-50 border-t border-gray-100">
            {!user.deleted_at && (
              <button
                className="text-red-600 hover:underline"
                tabIndex={-1}
                type="button"
                onClick={handleDestroy}
              >
                Delete User
              </button>
            )}
            <LoadingButton
              loading={processing}
              className="btn-indigo ml-auto"
              type="submit"
            >
              Update User
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  )
}

Edit.layout = withLayout(Layout)

export default Edit
