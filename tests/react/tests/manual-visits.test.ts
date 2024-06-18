import { afterEach, beforeEach, describe, it } from 'vitest'

describe('Manual Visits', () => {
  it('visits a different page', async () => {})

  it('can make a location visit', async () => {})

  describe('Auto-cancellation', () => {
    it('will automatically cancel a pending visits when a new request is made', async () => {})
  })

  describe('Method', () => {
    beforeEach(async () => {})

    it('can use the visit method without any options to make a GET request', async () => {})

    it('can use the visit method with a specific "method" option to manually set the request method', async () => {})

    it('can use the GET method', async () => {})

    it('can use the POST method', async () => {})

    it('can use the PUT method', async () => {})

    it('can use the PATCH method', async () => {})

    it('can use the DELETE method', async () => {})
  })

  describe('Data', () => {
    describe('plain objects', () => {
      beforeEach(async () => {})

      it('passes data as params by default when using the visit method', async () => {})

      describe('GET method', () => {
        it('passes data as params', async () => {})

        describe('query string array formatter', () => {
          it('can use the brackets query string array formatter', async () => {})

          it('can use the indices query string array formatter', async () => {})

          it('defaults to using the brackets query string array formatter', async () => {})
        })
      })

      it('can pass data using the POST method', async () => {})

      it('can pass data using the PUT method', async () => {})

      it('can pass data using the PATCH method', async () => {})

      it('can pass data using the DELETE method', () => {})
    })

    describe('FormData objects', () => {
      beforeEach(async () => {})

      it('can pass data using the visit method when specifying a non-GET "method" option', async () => {})

      it('can pass data using the POST method', async () => {})

      it('can pass data using the PUT method', async () => {})

      it('can pass data using the PATCH method', async () => {})

      it('can pass data using the DELETE method', async () => {})
    })

    describe('auto-converted objects (when files are present)', () => {
      beforeEach(async () => {})

      it('auto-converts objects to form-data when files are present using the POST method', async () => {})

      it('auto-converts objects to form-data when files are present using the PUT method', async () => {})

      it('auto-converts objects to form-data when files are present using the PATCH method', async () => {})

      it('auto-converts objects to form-data when files are present using the DELETE method', async () => {})
    })
  })

  describe('Headers', () => {
    it('has the default set of headers', async () => {})

    it('starts using the x-inertia-version header when a version was given from the back-end', async () => {})

    it('allows to set custom headers using the visit method', async () => {})

    it('allows to set custom headers using the GET method', async () => {})

    it('allows to set custom headers using the POST method', async () => {})

    it('allows to set custom headers using the PUT method', async () => {})

    it('allows to set custom headers using the PATCH method', async () => {})

    it('allows to set custom headers using the DELETE method', async () => {})

    it('cannot override built-in Inertia headers', async () => {})
  })

  describe('Replace', () => {
    beforeEach(async () => {})

    afterEach(async () => {})

    it('replaces the current history state (visit method)', async () => {})

    it('replaces the current history state (GET method)', async () => {})

    it('does not replace the current history state when it is set to false (visit method)', async () => {})

    it('does not replace the current history state when it is set to false (GET method)', async () => {})
  })

  describe('Preserve state', () => {
    beforeEach(async () => {})

    it("preserves the page's local state (visit method)", async () => {})

    it("preserves the page's local state (GET method)", async () => {})

    it("preserves the page's local state (callback)", async () => {})

    it("does not preserve the page's local state (visit method)", async () => {})

    it("does not preserve the page's local state (GET method)", async () => {})

    it("does not preserve the page's local state (callback)", async () => {})
  })

  describe('Preserve scroll', () => {
    beforeEach(async () => {})

    describe('disabled (default)', () => {
      beforeEach(async () => {})

      it('does not reset untracked scroll regions in persistent layouts (visit method)', async () => {})

      it('does not reset untracked scroll regions in persistent layouts (GET method)', async () => {})

      it('does not reset untracked scroll regions in persistent layouts when returning false from a preserveScroll callback', async () => {})

      it('does not restore untracked scroll regions when pressing the back button (visit method)', async () => {})

      it('does not restore untracked scroll regions when pressing the back button (GET method)', async () => {})

      it('does not restore untracked scroll regions when returning true from a preserveScroll callback', async () => {})

      it('does not restore untracked scroll regions when pressing the back button from another website', async () => {})
    })

    describe('enabled', () => {
      beforeEach(async () => {})

      it('resets scroll regions to the top when doing a regular visit (visit method)', async () => {})

      it('resets scroll regions to the top when doing a regular visit (GET method)', async () => {})

      it('resets scroll regions to the top when returning false from a preserveScroll callback', async () => {})

      it('preserves scroll regions when using the "preserve-scroll" feature (visit method)', async () => {})

      it('preserves scroll regions when using the "preserve-scroll" feature (GET method)', async () => {})

      it('preserves scroll regions when using the "preserve-scroll" feature from a callback', async () => {})

      it('restores all tracked scroll regions when pressing the back button (visit method)', async () => {})

      it('restores all tracked scroll regions when pressing the back button (GET method)', async () => {})

      it.skip('restores all tracked scroll regions when pressing the back button from another website', async () => {})
    })
  })

  describe('URL fragment navigation (& automatic scrolling)', () => {
    /** @see https://github.com/inertiajs/inertia/pull/257 */

    beforeEach(async () => {})

    describe('visit-method', () => {
      it('Scrolls to the fragment element when making a visit to a different page', async () => {})

      it('Scrolls to the fragment element when making a visit to the same page', async () => {})

      it('Does not scroll to the fragment element when it does not exist on the page', async () => {})
    })

    describe('GET-method', () => {
      it('Scrolls to the fragment element when making a visit to a different page', async () => {})

      it('Scrolls to the fragment element when making a visit to the same page', async () => {})

      it('Does not scroll to the fragment element when it does not exist on the page', async () => {})
    })
  })

  describe('Partial Reloads', () => {
    beforeEach(async () => {})

    describe('visit-method', () => {
      it('does not have headers specific to partial reloads when the feature is not being used', async () => {})

      it('has headers specific to "only" partial reloads', async () => {})

      it('has headers specific to "except" partial reloads', async () => {})

      it('it updates all props when the feature is not being used', async () => {})

      it('it only updates props that are passed through "only"', async () => {})

      it('it only updates props that are not passed through "except"', async () => {})
    })

    describe('GET-method', () => {
      it('does not have headers specific to partial reloads when the feature is not being used', async () => {})

      it('has headers specific to partial reloads', async () => {})

      it('it updates all props when the feature is not being used', async () => {})

      it('it only updates props that are passed through "only"', async () => {})

      it('it only updates props that are not passed through "except"', async () => {})
    })
  })

  describe('Error bags', () => {
    beforeEach(async () => {})

    it('does not use error bags by default', async () => {})

    it('uses error bags using the visit method', async () => {})

    it('uses error bags using the GET method', async () => {})
  })

  describe('Redirects', () => {
    beforeEach(async () => {})

    it('follows 303 redirects', async () => {})

    it('follows external redirects', async () => {})
  })
})
