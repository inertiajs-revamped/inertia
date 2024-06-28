import { router } from '@inertiajs-revamped/react'

export default function () {
  const data = {
    file: new File([], 'example.jpg'),
    foo: 'bar',
  }

  const visitMethod = () => {
    router.visit('/dump/post', {
      method: 'post',
      data,
    })
  }

  const postMethod = () => {
    router.post('/dump/post', data)
  }

  const putMethod = () => {
    router.put('/dump/put', data)
  }

  const patchMethod = () => {
    router.patch('/dump/patch', data)
  }

  const deleteMethod = () => {
    router.delete('/dump/delete', { data })
  }

  return (
    <>
      <span id="text">
        This is the page that demonstrates automatic conversion of plain objects
        to form-data using manual visits
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
