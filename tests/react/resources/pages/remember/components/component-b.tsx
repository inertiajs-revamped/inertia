import { useRemember } from '@inertiajs-revamped/react'
import { useState } from 'react'

export default function () {
  const [formState, setFormState] = useRemember(
    {
      name: '',
      remember: false,
    },
    'example/component-b'
  )

  const [data, setData] = useState({
    name: formState.name,
    remember: formState.remember,
    untracked: '',
  })

  return (
    <>
      <span>
        This component uses a string 'key' for the remember functionality.
      </span>
      <label>
        Full Name
        <input
          type="text"
          className="b-name"
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
          className="b-remember"
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
        Remember Me
        <input
          type="text"
          className="b-untracked"
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
    </>
  )
}
