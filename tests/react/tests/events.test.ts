/* import type { Page, Progress, Visit } from '@inertiajs-revamped/react' */
import { beforeEach, describe, it } from 'vitest'

/* const assertVisitObject = (visit: Visit) => {
  expect(visit).to.be.an('object')
  expect(visit).to.have.property('url')
  expect(visit).to.have.property('method')
  expect(visit).to.have.property('data')
  expect(visit).to.have.property('headers')
  expect(visit).to.have.property('preserveState')
}
const assertPageObject = (page: Page) => {
  expect(page).to.be.an('object')
  expect(page).to.have.property('component')
  expect(page).to.have.property('props')
  expect(page).to.have.property('url')
  expect(page).to.have.property('version')
}
const assertProgressObject = (progress: Progress) => {
  expect(progress).to.have.property('percentage')
  expect(progress).to.have.property('total')
  expect(progress).to.have.property('loaded')
  expect(progress?.percentage).to.be.gte(0).and.lte(100)
} */

// todo
describe('Events', () => {
  beforeEach(async () => {})

  describe('Listeners', () => {
    it('does not have any listeners by default', async () => {})

    describe('Inertia.on', () => {
      it('returns a callback that can be used to remove the global listener', async () => {})
    })
  })

  describe('Hooks', () => {
    describe('before', () => {
      it('fires the event when a request is about to be made', async () => {})

      describe('Local Event Callbacks', () => {
        it('can prevent the visit by returning false ', async () => {})
      })

      describe('Global Inertia.on', () => {
        it('can prevent the visit by returning false ', async () => {})
      })

      describe('Global addEventListener', () => {
        it('can prevent the visit by using preventDefault', async () => {})
      })
    })

    describe('cancelToken', () => {
      it('fires when the request is starting', async () => {})
    })

    describe('cancel', () => {
      it('fires when the request was cancelled', async () => {})
    })

    describe('start', () => {
      it('fires when the request has started', async () => {})
    })

    describe('progress', () => {
      it('fires when the request has files and upload progression occurs', async () => {})

      it('does not fire when the request has no files', async () => {})

      describe('error', () => {
        it('fires when the request finishes with validation errors', async () => {})
      })

      describe('Local Event Callbacks', () => {
        it('can delay onFinish from firing by returning a promise', async () => {})
      })
    })

    describe('success', () => {
      it('fires when the request finished without validation errors', async () => {})

      describe('Local Event Callbacks', () => {
        it('can delay onFinish from firing by returning a promise', async () => {})
      })
    })

    describe('invalid', () => {
      it('gets fired when a non-Inertia response is received', async () => {})
    })

    describe('exception', () => {
      it('gets fired when an unexpected situation occurs (e.g. network disconnect)', async () => {})
    })

    describe('finish', () => {
      it('fires when the request completes', async () => {})
    })

    describe('navigate', () => {
      it('fires when the page navigates away after a successful request', async () => {})
    })
  })

  describe('Lifecycles', () => {
    it('fires all expected events in the correct order on a successful request', async () => {})

    it('fires all expected events in the correct order on an error request', async () => {})

    describe('Cancelling', () => {
      it('cancels a visit before it completes', async () => {})

      it('prevents onCancel from firing when the request is already finished', async () => {})
    })
  })
})
