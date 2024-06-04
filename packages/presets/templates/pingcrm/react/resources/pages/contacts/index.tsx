// @ts-nocheck
import Icon from '@/components/icon'
import Pagination from '@/components/pagination'
import SearchFilter from '@/components/search-filter'
import Layout from '@/layouts/layout'
import { Head, Link, usePage, withLayout } from '@inertiajs-revamped/react'

const Index = () => {
  const {
    contacts: { data, links },
  } = usePage().props

  return (
    <>
      <Head title="Contacts" />
      <h1 className="mb-8 text-3xl font-bold">Contacts</h1>
      <div className="flex items-center justify-between mb-6">
        <SearchFilter />
        <Link className="btn-indigo" href="/contacts/create">
          <span>Create</span>
          <span className="hidden md:inline">&nbsp;Contact</span>
        </Link>
      </div>
      <div className="bg-white rounded-md shadow overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="text-left font-bold">
              <th className="pb-4 pt-6 px-6">Name</th>
              <th className="pb-4 pt-6 px-6">Organization</th>
              <th className="pb-4 pt-6 px-6">City</th>
              <th className="pb-4 pt-6 px-6" colSpan={2}>
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, name, city, phone, organization, deleted_at }) => (
              <tr
                key={id}
                className="hover:bg-gray-100 focus-within:bg-gray-100"
              >
                <td className="border-t">
                  <Link
                    className="flex items-center px-6 py-4 focus:text-indigo-500"
                    href={`/contacts/${id}/edit`}
                  >
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
                    href={`/contacts/${id}/edit`}
                    tabIndex={-1}
                  >
                    {organization?.name}
                  </Link>
                </td>
                <td className="border-t">
                  <Link
                    className="flex items-center px-6 py-4"
                    href={`/contacts/${id}/edit`}
                    tabIndex={-1}
                  >
                    {city}
                  </Link>
                </td>
                <td className="border-t">
                  <Link
                    className="flex items-center px-6 py-4"
                    href={`/contacts/${id}/edit`}
                    tabIndex={-1}
                  >
                    {phone}
                  </Link>
                </td>
                <td className="w-px border-t">
                  <Link
                    className="flex items-center px-4"
                    href={`/contacts/${id}/edit`}
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
            {data.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan={4}>
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination links={links} />
    </>
  )
}

Index.layout = withLayout(Layout)

export default Index
