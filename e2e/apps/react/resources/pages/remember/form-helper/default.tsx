import { Link, useForm } from '@inertiajs-revamped/react'

export default function () {
  const form = useForm({
    name: 'foo',
    handle: 'example',
    remember: false,
  })

  const submit = () => {
    form.post('/remember/form-helper/default')
  }

  return (
    <>
      <label>
        Full Name
        <input
          type="text"
          id="name"
          name="name"
          value={form.data.name}
          onChange={(event) => form.setData('name', event.target.value)}
        />
      </label>
      {form.errors.name && <span id="name_error">{form.errors.name}</span>}

      <label>
        Handle
        <input
          type="text"
          id="handle"
          name="handle"
          value={form.data.handle}
          onChange={(event) => form.setData('handle', event.target.value)}
        />
      </label>
      {form.errors.handle && (
        <span id="handle_error">{form.errors.handle}</span>
      )}

      <label>
        Remember Me
        <input
          type="checkbox"
          id="remember"
          name="remember"
          checked={form.data.remember}
          onChange={(event) => form.setData('remember', event.target.checked)}
        />
      </label>
      {form.errors.remember && (
        <span id="remember_error">{form.errors.remember}</span>
      )}

      <label>
        Untracked
        <input type="text" id="untracked" name="untracked" />
      </label>

      <span onClick={submit} id="submit">
        Submit form
      </span>

      <Link href="/dump/get" id="link">
        Navigate away
      </Link>
    </>
  )
}
