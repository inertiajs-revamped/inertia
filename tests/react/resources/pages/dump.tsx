interface DumpProps {
  headers: any
  method: string
  form: any
  files: string[]
  query: any
}

export default function ({ headers, method, form, files, query }: DumpProps) {
  const dump = {
    headers,
    method,
    form,
    files: files ? files : {},
    query: query,
    /* $page: $page, */
  }

  return (
    <>
      <div className="text">
        This is Inertia page component containing a data dump of the request
      </div>
      <hr />
      <pre className="dump">{JSON.stringify(dump)}</pre>
    </>
  )
}
