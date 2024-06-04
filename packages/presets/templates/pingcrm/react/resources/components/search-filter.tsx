// @ts-nocheck
import { pickBy } from '@/utils'
import { router, usePage } from '@inertiajs-revamped/react'
import { type ChangeEvent, useEffect, useRef, useState } from 'react'
import SelectInput from './select-input'

export default function SearchFilter() {
  const { filters } = usePage().props

  const [opened, setOpened] = useState(false)
  const { url } = usePage()

  const [values, setValues] = useState({
    role: filters.role || '',
    search: filters.search || '',
    trashed: filters.trashed || '',
  })

  const prevValues = usePrevious(values)

  function usePrevious(value: typeof values) {
    const ref = useRef<typeof values>()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }

  function reset() {
    setValues({
      role: '',
      search: '',
      trashed: '',
    })
  }

  useEffect(() => {
    if (prevValues) {
      router.get(url.split('?')[0], pickBy(values), {
        replace: true,
        preserveState: true,
      })
    }
  }, [values])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const key = e.target.name
    const value = e.target.value

    setValues((values) => ({
      ...values,
      [key]: value,
    }))

    if (opened) setOpened(false)
  }

  return (
    <div className="flex items-center mr-4 w-full max-w-md">
      <div className="relative flex w-full bg-white rounded shadow">
        <div
          style={{ top: '100%' }}
          className={`absolute ${opened ? '' : 'hidden'}`}
        >
          <div
            onClick={() => setOpened(false)}
            className="fixed z-20 inset-0 bg-black opacity-25"
          ></div>
          <div className="relative z-30 mt-2 px-4 py-6 w-64 bg-white rounded shadow-lg">
            {Object.prototype.isPrototypeOf.call(filters, 'role') && (
              <SelectInput
                className="mb-4"
                label="Role"
                name="role"
                value={values.role}
                onChange={() => handleChange}
              >
                <option value=""></option>
                <option value="user">User</option>
                <option value="owner">Owner</option>
              </SelectInput>
            )}
            <SelectInput
              label="Trashed"
              name="trashed"
              value={values.trashed}
              onChange={() => handleChange}
            >
              <option value=""></option>
              <option value="with">With Trashed</option>
              <option value="only">Only Trashed</option>
            </SelectInput>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpened(true)}
          className="focus:z-10 px-4 hover:bg-gray-100 border-r focus:border-white rounded-l focus:outline-none focus:ring-2 focus:ring-indigo-400 md:px-6"
        >
          <div className="flex items-baseline">
            <span className="hidden text-gray-700 md:inline">Filter</span>
            <svg
              className="w-2 h-2 text-gray-700 fill-current md:ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 961.243 599.998"
            >
              <path d="M239.998 239.999L0 0h961.243L721.246 240c-131.999 132-240.28 240-240.624 239.999-.345-.001-108.625-108.001-240.624-240z" />
            </svg>
          </div>
        </button>
        <input
          className="relative px-6 py-3 w-full rounded-r focus:outline-none focus:ring-2 focus:ring-indigo-400"
          autoComplete="off"
          type="text"
          name="search"
          value={values.search}
          onChange={handleChange}
          placeholder="Search…"
        />
      </div>
      <button
        onClick={reset}
        className="focus:text-indigo-700 ml-3 text-gray-600 hover:text-gray-700 text-sm focus:outline-none"
        type="button"
      >
        Reset
      </button>
    </div>
  )
}
