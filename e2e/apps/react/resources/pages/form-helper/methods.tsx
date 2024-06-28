import { useForm } from '@inertiajs-revamped/react'

export default function () {
  const form = useForm({
    name: 'foo',
    remember: false,
  })

  const postForm = () => {
    form.post('/dump/post')
  }

  const putForm = () => {
    form.put('/dump/put')
  }

  const patchForm = () => {
    form.patch('/dump/patch')
  }

  const deleteForm = () => {
    form.delete('/dump/delete')
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

      <span onClick={postForm} id="post">
        POST form
      </span>
      <span onClick={putForm} id="put">
        PUT form
      </span>
      <span onClick={patchForm} id="patch">
        PATCH form
      </span>
      <span onClick={deleteForm} id="delete">
        DELETE form
      </span>
    </>
  )
}
