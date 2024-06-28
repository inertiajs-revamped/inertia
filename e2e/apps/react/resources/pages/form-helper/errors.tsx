import { useForm } from '@inertiajs-revamped/react'

export default function () {
  const form = useForm({
    name: 'foo',
    handle: 'example',
    remember: false,
  })

  const submit = () => {
    form.post('/form-helper/errors')
  }

  const clearErrors = () => {
    form.clearErrors()
  }

  const clearError = () => {
    form.clearErrors('handle')
  }

  const setErrors = () => {
    form.setError({
      name: 'Manually set Name error',
      handle: 'Manually set Handle error',
      remember: '',
    })
  }

  const setError = () => {
    form.setError('handle', 'Manually set Handle error')
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

      <span onClick={submit} id="submit">
        Submit form
      </span>

      <span onClick={clearErrors} id="clear">
        Clear all errors
      </span>
      <span onClick={clearError} id="clear-one">
        Clear one error
      </span>
      <span onClick={setErrors} id="set">
        Set errors
      </span>
      <span onClick={setError} id="set-one">
        Set one error
      </span>

      <span id="errors-status">
        Form has {form.hasErrors ? '' : 'no '}errors
      </span>
    </>
  )
}
