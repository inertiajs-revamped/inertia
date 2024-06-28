import { Link, useRemember } from '@inertiajs-revamped/react'
import { useState } from 'react'
import CommponentA from './components/component-a'
import CommponentB from './components/component-b'

export default function () {
  const [formState, setFormState] = useRemember(
    {
      name: '',
      remember: false,
    },
    'remember/multiple-components'
  )

  const [data, setData] = useState({
    name: formState.name,
    remember: formState.remember,
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
            setFormState({
              ...formState,
              name: e.target.value,
            })
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
            setFormState({
              ...formState,
              remember: e.target.checked,
            })
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

      <CommponentA />
      <CommponentB />

      <Link href="/dump/get" id="link">
        Navigate away
      </Link>
      <a href="/non-inertia" id="off-site">
        Navigate off-site
      </a>
    </>
  )
}
