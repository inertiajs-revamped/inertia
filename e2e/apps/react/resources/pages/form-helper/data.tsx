import { useForm } from '@inertiajs-revamped/react'

export default function () {
  const form = useForm({
    name: 'foo',
    handle: 'example',
    remember: false,
  })

  const submit = () => {
    form.post(window.location.href)
  }

  const resetAll = () => {
    form.reset()
  }

  const resetOne = () => {
    form.reset('handle')
  }

  const reassign = () => {
    form.setDefaults()
  }

  const reassignObject = () => {
    form.setDefaults({
      handle: 'updated handle',
      remember: true,
    })
  }

  const reassignSingle = () => {
    form.setDefaults('name', 'single value')
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

      <span onClick={resetAll} id="reset">
        Reset all data
      </span>
      <span onClick={resetOne} id="reset-one">
        Reset one field
      </span>

      <span onClick={reassign} id="reassign">
        Reassign current as defaults
      </span>
      <span onClick={reassignObject} id="reassign-object">
        Reassign default values
      </span>
      <span onClick={reassignSingle} id="reassign-single">
        Reassign single default
      </span>

      <span id="errors-status">
        Form has {form.hasErrors ? '' : 'no '}errors
      </span>
    </>
  )
}
