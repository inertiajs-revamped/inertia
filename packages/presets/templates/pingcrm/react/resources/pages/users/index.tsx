// @ts-nocheck
import Icon from '@/components/icon'
import Pagination from '@/components/pagination'
import SearchFilter from '@/components/search-filter'
import Layout from '@/layouts/layout'
import { withLayout } from '@inertiajs-revamped/react'
import { Head, Link, usePage } from '@inertiajs-revamped/react'

const Index = () => {
  const { users } = usePage().props

  return (
    <>
      <Head title="Users" />
      <h1 className="mb-8 text-3xl font-bold">Users</h1>
      <div className="flex items-center justify-between mb-6">
        <SearchFilter />
        <Link className="btn-indigo" href="/users/create">
          <span>Create</span>
          <span className="hidden md:inline">&nbsp;User</span>
        </Link>
      </div>
      <div className="bg-white rounded-md shadow overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="text-left font-bold">
              <th className="pb-4 pt-6 px-6">Name</th>
              <th className="pb-4 pt-6 px-6">Email</th>
              <th className="pb-4 pt-6 px-6" colSpan={2}>
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users.map(({ id, name, email, owner, photo, deleted_at }) => (
                <tr
                  key={id}
                  className="hover:bg-gray-100 focus-within:bg-gray-100"
                >
                  <td className="border-t">
                    <Link
                      className="flex items-center px-6 py-4 focus:text-indigo-500"
                      href={`/users/${id}/edit`}
                    >
                      {photo && (
                        <img
                          className="block -my-2 mr-2 w-5 h-5 rounded-full"
                          src={photo}
                          alt={name}
                        />
                      )}
                      {name}
                      {deleted_at && (
                        <Icon
                          name="trash"
                          className="flex-shrink-0 ml-2 w-3 h-3 fill-gray-400"
                        />
                      )}
                    </Link>
                  </td>
                  <td className="border-t">
                    <Link
                      className="flex items-center px-6 py-4"
                      href={`/users/${id}/edit`}
                      tabIndex={-1}
                    >
                      {email}
                    </Link>
                  </td>
                  <td className="border-t">
                    <Link
                      className="flex items-center px-6 py-4"
                      href={`/users/${id}/edit`}
                      tabIndex={-1}
                    >
                      {owner ? 'Owner' : 'User'}
                    </Link>
                  </td>
                  <td className="w-px border-t">
                    <Link
                      className="flex items-center px-4"
                      href={`/users/${id}/edit`}
                      tabIndex={-1}
                    >
                      <Icon
                        name="cheveron-right"
                        className="block w-6 h-6 fill-gray-400"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            {Array.isArray(users) && users.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan={4}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination links={users.links} />
    </>
  )
}

Index.layout = withLayout(Layout)

export default Index
