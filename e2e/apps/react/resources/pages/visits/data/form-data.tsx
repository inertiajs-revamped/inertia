import { router } from '@inertiajs-revamped/react'

export default function () {
  const visitMethod = () => {
    const formData = new FormData()
    formData.append('foo', 'visit')

    router.visit('/dump/post', {
      method: 'post',
      data: formData,
    })
  }

  const postMethod = () => {
    const formData = new FormData()
    formData.append('baz', 'post')

    router.post('/dump/post', formData)
  }

  const putMethod = () => {
    const formData = new FormData()
    formData.append('foo', 'put')

    router.put('/dump/put', formData)
  }

  const patchMethod = () => {
    const formData = new FormData()
    formData.append('bar', 'patch')

    router.patch('/dump/patch', formData)
  }

  const deleteMethod = () => {
    const formData = new FormData()
    formData.append('baz', 'delete')

    router.delete('/dump/delete', {
      data: formData,
    })
  }

  return (
    <>
      <span id="text">
        This is the page that demonstrates manual visit data passing through
        FormData objects
      </span>

      <span onClick={visitMethod} id="visit">
        Visit Link
      </span>
      <span onClick={postMethod} id="post">
        POST Link
      </span>
      <span onClick={putMethod} id="put">
        PUT Link
      </span>
      <span onClick={patchMethod} id="patch">
        PATCH Link
      </span>
      <span onClick={deleteMethod} id="delete">
        DELETE Link
      </span>
    </>
  )
}
