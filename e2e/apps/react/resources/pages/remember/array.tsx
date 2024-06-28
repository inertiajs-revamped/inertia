import { Link, useRemember } from '@inertiajs-revamped/react'
import { useState } from 'react'

type TestFormState = [string, boolean]

export default function () {
  const [formState, setFormState] = useRemember<TestFormState>(
    ['', false],
    'remember/array'
  )

  const [data, setData] = useState({
    name: formState[0],
    remember: formState[1],
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
          onChange={(e) => {
            setFormState([e.target.value, formState[1]])
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
          onChange={(e) => {
            setFormState([formState[0], e.target.checked])
            setData({
              ...data,
              remember: e.target.checked,
            })
          }}
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
