import { Link } from '@inertiajs-revamped/react'
import { useState } from 'react'

export default function () {
  const [data, setData] = useState({
    name: '',
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
          value={data.name}
          onChange={(e) =>
            setData({
              ...data,
              name: e.target.value,
            })
          }
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

      <Link href="/dump/get" id="link">
        Navigate away
      </Link>
    </>
  )
}
