import { type DumpProps, usePage } from '@inertiajs-revamped/react'

export default function ({ headers, method, form, files, query }: DumpProps) {
  const page = usePage()

  const dump = {
    headers,
    method,
    form,
    files: files ?? {},
    query,
    page,
  }

  return (
    <>
      <div className="text">
        This is Inertia page component containing a data dump of the request
      </div>
      <hr />
      <pre className="dump" data-page={JSON.stringify(dump, null)}>
        {JSON.stringify(dump, null, 2)}
      </pre>
    </>
  )
}
