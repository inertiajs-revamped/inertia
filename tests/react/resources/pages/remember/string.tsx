import { Link, useRemember } from '@inertiajs-revamped/react'
import { useState } from 'react'

export default function () {
  const [name, setName] = useRemember('')

  const [data, setData] = useState({
    name,
    remember: false,
    untracked: '',
  })

  return (
    <>
      <label>
        Full Name
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={name}
          onChange={(e) => {
            setName(e.target.value)
            setData({
              ...data,
              name: e.target.value,
            })
          }}
        />
      </label>
      <label>
        Remember Me
        <input
          type="checkbox"
          id="remember"
          name="remember"
          checked={data.remember}
          onChange={(e) =>
            setData({
              ...data,
              remember: e.target.checked,
            })
          }
        />
      </label>
      <label>
        Untracked
        <input
          type="text"
          id="untracked"
          name="untracked"
          value={data.untracked}
          onChange={(e) =>
            setData({
              ...data,
              untracked: e.target.value,
            })
          }
        />
      </label>

      <Link href="/dump/get" className="link">
        Navigate away
      </Link>
    </>
  )
}
