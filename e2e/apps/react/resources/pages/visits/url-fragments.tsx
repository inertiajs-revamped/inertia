import { router } from '@inertiajs-revamped/react'

export default function () {
  const basicVisit = () => {
    router.visit('/visits/url-fragments#target')
    console.log(document.documentElement.scrollTop)
    console.log(document.documentElement.scrollLeft)
  }

  const fragmentVisit = () => {
    router.visit('#target')
  }

  const nonExistentFragmentVisit = () => {
    router.visit('/visits/url-fragments#non-existent-fragment')
  }

  const basicGetVisit = () => {
    router.get('/visits/url-fragments#target')
  }

  const fragmentGetVisit = () => {
    router.get('#target')
  }

  const nonExistentFragmentGetVisit = () => {
    router.get('/visits/url-fragments#non-existent-fragment')
  }

  return (
    <>
      <span id="text">
        This is the page that demonstrates url fragment behaviour using manual
        visits
      </span>

      <div
        style={{
          width: '200vw',
          height: '200vh',
          marginTop: '50vh',
        }}
      >
        <span onClick={basicVisit} id="basic">
          Basic visit
        </span>
        <span onClick={fragmentVisit} id="fragment">
          Fragment visit
        </span>
        <span
          onClick={nonExistentFragmentVisit}
          id="non-existent-fragment-link"
        >
          Non-existent fragment visit
        </span>

        <span onClick={basicGetVisit} id="basic-get">
          Basic GET visit
        </span>
        <span onClick={fragmentGetVisit} id="fragment-get">
          Fragment GET visit
        </span>
        <span
          onClick={nonExistentFragmentGetVisit}
          id="non-existent-fragment-get-link"
        >
          Non-existent fragment visit
        </span>

        <div id="target">This is the element with id 'target'</div>
      </div>
    </>
  )
}
