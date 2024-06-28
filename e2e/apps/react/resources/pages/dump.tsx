import { type DumpProps } from '@inertiajs-revamped/react'
import { useEffect } from 'react'

export default function ({ headers, method, form, files, query }: DumpProps) {
  const dump = {
    headers,
    method,
    form,
    files: files ?? [],
    query,
  }

  useEffect(() => {
    console.log('dumpdumpdump', dump)
  })

  return (
    <>
      <div id="text">
        This is Inertia page component containing a data dump of the request
      </div>
      <hr />
      <pre id="dump" data-page={JSON.stringify(dump, null)}>
        {JSON.stringify(dump, null, 2)}
      </pre>
    </>
  )
}
