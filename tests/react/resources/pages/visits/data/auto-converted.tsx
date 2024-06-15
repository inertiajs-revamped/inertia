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
      <span className="text">
        This is the page that demonstrates automatic conversion of plain objects
        to form-data using manual visits
      </span>

      <span onClick={visitMethod} className="visit">
        Visit Link
      </span>
      <span onClick={postMethod} className="post">
        POST Link
      </span>
      <span onClick={putMethod} className="put">
        PUT Link
      </span>
      <span onClick={patchMethod} className="patch">
        PATCH Link
      </span>
      <span onClick={deleteMethod} className="delete">
        DELETE Link
      </span>
    </>
  )
}
