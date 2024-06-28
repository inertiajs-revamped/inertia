import { router } from '@inertiajs-revamped/react'

export default function Replace() {
  const replace = () => {
    router.visit('/dump/get', {
      replace: true,
    })
  }

  const replaceFalse = () => {
    router.visit('/dump/get', {
      replace: false,
    })
  }

  const replaceGet = () => {
    router.get(
      '/dump/get',
      {},
      {
        replace: true,
      }
    )
  }

  const replaceGetFalse = () => {
    router.get(
      '/dump/get',
      {},
      {
        replace: false,
      }
    )
  }

  return (
    <div>
      <span id="text">
        This is the links page that demonstrates manual replace
      </span>

      <span onClick={replace} id="replace">
        [State] Replace visit: true
      </span>
      <span onClick={replaceFalse} id="replace-false">
        [State] Replace visit: false
      </span>
      <span onClick={replaceGet} id="replace-get">
        [State] Replace GET: true
      </span>
      <span onClick={replaceGetFalse} id="replace-get-false">
        [State] Replace GET: false
      </span>
    </div>
  )
}
