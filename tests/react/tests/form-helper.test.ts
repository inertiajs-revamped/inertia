import type { DumpProps } from '@inertiajs-revamped/react'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import {
  type App,
  BASE_URL,
  evalCheckbox,
  evalText,
  evalTextInput,
  start,
} from './helper'

describe('Form Helper', () => {
  let app: App

  beforeAll(async () => {
    app = await start()
  })

  afterAll(async () => {
    await app.stop()
  })

  describe('Methods', () => {
    beforeEach(async () => {
      await app.navigate('/form-helper/methods')
      expect(app.page.url()).toEqual(`${BASE_URL}/form-helper/methods`)

      await app.page.locator('input#remember').click()
    })

    it('can submit the form using the POST method', async () => {
      await app.page.locator('.post').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/post`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/post`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('method', 'post')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form')
      expect(pageProps.form).toHaveProperty('name', 'foo')
      expect(pageProps.form).toHaveProperty('remember', true)
    })

    it('can submit the form using the PUT method', async () => {
      await app.page.locator('.put').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/put`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/put`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('method', 'put')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form')
      expect(pageProps.form).toHaveProperty('name', 'foo')
      expect(pageProps.form).toHaveProperty('remember', true)
    })

    it('can submit the form using the PATCH method', async () => {
      await app.page.locator('.patch').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/patch`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/patch`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('method', 'patch')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form')
      expect(pageProps.form).toHaveProperty('name', 'foo')
      expect(pageProps.form).toHaveProperty('remember', true)
    })

    it('can submit the form using the DELETE method', async () => {
      await app.page.locator('.delete').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/delete`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/delete`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('method', 'delete')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form')
      expect(pageProps.form).toHaveProperty('name', 'foo')
      expect(pageProps.form).toHaveProperty('remember', true)
    })
  })

  describe('Transform', () => {
    beforeEach(async () => {
      app.page.once('load', () =>
        app.page.on('window:load', () => {
          alert('A location/non-SPA visit was detected')
        })
      )
      await app.navigate('/form-helper/transform')
      expect(app.page.url()).toEqual(`${BASE_URL}/form-helper/transform`)

      await app.page.locator('input#remember').click()
    })

    it('can transform the form prior to submission using the POST method', async () => {
      await app.page.locator('.post').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/post`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/post`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('method', 'post')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form')
      expect(pageProps.form).toHaveProperty('name', 'bar')
      expect(pageProps.form).toHaveProperty('remember', true)
    })

    it('can transform the form prior to submission using the PUT method', async () => {
      await app.page.locator('.put').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/put`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/put`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('method', 'put')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form')
      expect(pageProps.form).toHaveProperty('name', 'baz')
      expect(pageProps.form).toHaveProperty('remember', true)
    })

    it('can transform the form prior to submission using the PATCH method', async () => {
      await app.page.locator('.patch').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/patch`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/patch`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('method', 'patch')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form')
      expect(pageProps.form).toHaveProperty('name', 'foo')
      expect(pageProps.form).toHaveProperty('remember', true)
    })

    it('can transform the form prior to submission using the DELETE method', async () => {
      await app.page.locator('.delete').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/delete`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/delete`)

      const pageProps: DumpProps = await app.page.$eval('pre.dump', (el) => {
        return JSON.parse(el.dataset.page as string)
      })
      expect(pageProps).toHaveProperty('method', 'delete')
      expect(pageProps).toHaveProperty('query', {})
      expect(pageProps).toHaveProperty('form')
      expect(pageProps.form).toHaveProperty('name', 'bar')
      expect(pageProps.form).toHaveProperty('remember', true)
    })
  })

  describe('Errors', () => {
    beforeEach(async () => {
      await app.navigate('/form-helper/errors')
      expect(app.page.url()).toEqual(`${BASE_URL}/form-helper/errors`)

      const errorStatus = await app.page
        .locator('.errors-status')
        .map((el) => el.textContent)
        .wait()

      expect(errorStatus).toEqual('Form has no errors')

      await app.page.locator('input#name').fill('A')
      await app.page.locator('input#handle').fill('B')
      await app.page.locator('input#remember').click()
    })

    it('can display form errors', async () => {
      expect(await app.page.$('.name_error')).toBeNull()
      expect(await app.page.$('.handle_error')).toBeNull()
      expect(await app.page.$('.remember_error')).toBeNull()

      await app.page.locator('.submit').click()
      await app.page.waitForNavigation()

      expect(await evalText(app.page, '.errors-status')).toEqual(
        'Form has errors'
      )
      expect(await evalText(app.page, '.name_error')).toEqual('Some name error')
      expect(await evalText(app.page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await app.page.$('.remember_error')).toBeNull()
    })

    it('can clear all form errors', async () => {
      await app.page.locator('.submit').click()
      await app.page.waitForNavigation()

      expect(await evalText(app.page, '.errors-status')).toEqual(
        'Form has errors'
      )
      expect(await evalText(app.page, '.name_error')).toEqual('Some name error')
      expect(await evalText(app.page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await app.page.$('.remember_error')).toBeNull()

      await app.page.locator('.clear').click()

      expect(await evalText(app.page, '.errors-status')).toEqual(
        'Form has no errors'
      )
      expect(await app.page.$('.name_error')).toBeNull()
      expect(await app.page.$('.handle_error')).toBeNull()
      expect(await app.page.$('.remember_error')).toBeNull()
    })

    it('does not reset fields back to their initial values when it clears all form errors', async () => {
      await app.page.locator('.submit').click()
      await app.page.waitForNavigation()

      expect(await evalText(app.page, '.errors-status')).toEqual(
        'Form has errors'
      )
      expect(await evalText(app.page, '.name_error')).toEqual('Some name error')
      expect(await evalText(app.page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await app.page.$('.remember_error')).toBeNull()
      expect(await evalTextInput(app.page, '#name')).toEqual('A')
      expect(await evalTextInput(app.page, '#handle')).toEqual('B')
      expect(await evalCheckbox(app.page, '#remember')).toEqual(true)

      await app.page.locator('.clear').click()

      expect(await evalText(app.page, '.errors-status')).toEqual(
        'Form has no errors'
      )
      expect(await app.page.$('.name_error')).toBeNull()
      expect(await app.page.$('.handle_error')).toBeNull()
      expect(await app.page.$('.remember_error')).toBeNull()
      expect(await evalTextInput(app.page, '#name')).toEqual('A')
      expect(await evalTextInput(app.page, '#handle')).toEqual('B')
      expect(await evalCheckbox(app.page, '#remember')).toEqual(true)
    })

    it('can clear a subset of form errors', async () => {
      await app.page.locator('.submit').click()
      await app.page.waitForNavigation()

      expect(await evalText(app.page, '.errors-status')).toEqual(
        'Form has errors'
      )
      expect(await evalText(app.page, '.name_error')).toEqual('Some name error')
      expect(await evalText(app.page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await app.page.$('.remember_error')).toBeNull()

      await app.page.locator('.clear-one').click()

      expect(await evalText(app.page, '.errors-status')).toEqual(
        'Form has errors'
      )
      expect(await evalText(app.page, '.name_error')).toEqual('Some name error')
      expect(await app.page.$('.handle_error')).toBeNull()
      expect(await app.page.$('.remember_error')).toBeNull()
    })

    it('does not reset fields back to their initial values when it clears a subset of form errors', async () => {
      await app.page.locator('.submit').click()
      await app.page.waitForNavigation()

      expect(await evalText(app.page, '.errors-status')).toEqual(
        'Form has errors'
      )
      expect(await evalText(app.page, '.name_error')).toEqual('Some name error')
      expect(await evalText(app.page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await app.page.$('.remember_error')).toBeNull()
      expect(await evalTextInput(app.page, '#name')).toEqual('A')
      expect(await evalTextInput(app.page, '#handle')).toEqual('B')
      expect(await evalCheckbox(app.page, '#remember')).toEqual(true)

      await app.page.locator('.clear-one').click()

      expect(await evalText(app.page, '.errors-status')).toEqual(
        'Form has errors'
      )
      expect(await evalText(app.page, '.name_error')).toEqual('Some name error')
      expect(await app.page.$('.handle_error')).toBeNull()
      expect(await app.page.$('.remember_error')).toBeNull()
      expect(await evalTextInput(app.page, '#name')).toEqual('A')
      expect(await evalTextInput(app.page, '#handle')).toEqual('B')
      expect(await evalCheckbox(app.page, '#remember')).toEqual(true)
    })

    it('can set a single error', async () => {
      await app.page.locator('.set-one').click()

      expect(await evalText(app.page, '.errors-status')).toEqual(
        'Form has errors'
      )
      expect(await app.page.$('.name_error')).toBeNull()
      expect(await evalText(app.page, '.handle_error')).toEqual(
        'Manually set Handle error'
      )
      expect(await app.page.$('.remember_error')).toBeNull()
    })

    it('can set multiple errors', async () => {
      await app.page.locator('.set').click()

      expect(await evalText(app.page, '.errors-status')).toEqual(
        'Form has errors'
      )
      expect(await evalText(app.page, '.name_error')).toEqual(
        'Manually set Name error'
      )
      expect(await evalText(app.page, '.handle_error')).toEqual(
        'Manually set Handle error'
      )
      expect(await app.page.$('.remember_error')).toBeNull()
    })
  })

  describe('Data', () => {
    beforeEach(async () => {
      await app.navigate('/form-helper/data')
      expect(app.page.url()).toEqual(`${BASE_URL}/form-helper/data`)
    })

    it('can reset all fields to their initial values', async () => {
      await app.page.locator('input#name').fill('A')
      await app.page.locator('input#remember').click()

      expect(await evalTextInput(app.page, '#name')).toEqual('A')
      expect(await evalTextInput(app.page, '#handle')).toEqual('example')
      expect(await evalCheckbox(app.page, '#remember')).toEqual(true)

      await app.page.locator('.submit').click()
      await app.page.waitForNavigation()

      await app.page.locator('.reset').click()

      expect(await evalTextInput(app.page, '#name')).toEqual('foo')
      expect(await evalTextInput(app.page, '#handle')).toEqual('example')
      expect(await evalCheckbox(app.page, '#remember')).toEqual(false)
    })

    it('can reset a single field to its initial value', async () => {
      await app.page.locator('input#name').fill('A')
      await app.page.locator('input#handle').fill('B')
      await app.page.locator('input#remember').click()

      await app.page.locator('.submit').click()
      await app.page.waitForNavigation()

      expect(await evalTextInput(app.page, '#name')).toEqual('A')
      expect(await evalTextInput(app.page, '#handle')).toEqual('B')
      expect(await evalCheckbox(app.page, '#remember')).toEqual(true)

      await app.page.locator('.reset-one').click()

      expect(await evalTextInput(app.page, '#name')).toEqual('A')
      expect(await evalTextInput(app.page, '#handle')).toEqual('example')
      expect(await evalCheckbox(app.page, '#remember')).toEqual(true)
    })

    it('does not reset errors when it resets a field to its initial value', async () => {
      await app.page.locator('input#name').fill('A')
      await app.page.locator('input#handle').fill('B')
      await app.page.locator('input#remember').click()

      await app.page.locator('.submit').click()
      await app.page.waitForNavigation()

      expect(await evalTextInput(app.page, '#name')).toEqual('A')
      expect(await evalTextInput(app.page, '#handle')).toEqual('B')
      expect(await evalCheckbox(app.page, '#remember')).toEqual(true)
      expect(await evalText(app.page, '.errors-status')).toEqual(
        'Form has errors'
      )
      expect(await evalText(app.page, '.name_error')).toEqual('Some name error')
      expect(await evalText(app.page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )

      await app.page.locator('.reset-one').click()

      expect(await evalTextInput(app.page, '#name')).toEqual('A')
      expect(await evalTextInput(app.page, '#handle')).toEqual('example')
      expect(await evalCheckbox(app.page, '#remember')).toEqual(true)
      expect(await evalText(app.page, '.errors-status')).toEqual(
        'Form has errors'
      )
      expect(await evalText(app.page, '.name_error')).toEqual('Some name error')
      expect(await evalText(app.page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await app.page.$('.remember_error')).toBeNull()
    })

    it('does not reset errors when it resets all fields to their initial values', async () => {
      await app.page.locator('input#name').fill('A')
      await app.page.locator('input#handle').fill('B')
      await app.page.locator('input#remember').click()

      await app.page.locator('.submit').click()
      await app.page.waitForNavigation()

      expect(await evalTextInput(app.page, '#name')).toEqual('A')
      expect(await evalTextInput(app.page, '#handle')).toEqual('B')
      expect(await evalCheckbox(app.page, '#remember')).toEqual(true)
      expect(await evalText(app.page, '.errors-status')).toEqual(
        'Form has errors'
      )
      expect(await evalText(app.page, '.name_error')).toEqual('Some name error')
      expect(await evalText(app.page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )

      await app.page.locator('.reset').click()

      expect(await evalTextInput(app.page, '#name')).toEqual('foo')
      expect(await evalTextInput(app.page, '#handle')).toEqual('example')
      expect(await evalCheckbox(app.page, '#remember')).toEqual(false)
      expect(await evalText(app.page, '.errors-status')).toEqual(
        'Form has errors'
      )
      expect(await evalText(app.page, '.name_error')).toEqual('Some name error')
      expect(await evalText(app.page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await app.page.$('.remember_error')).toBeNull()
    })

    describe('Update "reset" defaults', () => {
      beforeEach(async () => {
        await app.page.waitForNavigation()
        expect(await evalTextInput(app.page, '#name')).toEqual('foo')
        expect(await evalTextInput(app.page, '#handle')).toEqual('example')
        expect(await evalCheckbox(app.page, '#remember')).toEqual(false)
      })

      it('can assign the current values as the new defaults', async () => {
        await app.page.locator('input#name').fill('A')
        await app.page.locator('input#handle').fill('B')
        await app.page.locator('input#remember').click()

        await app.page.locator('.reassign').click()

        await app.page.locator('input#name').fill('foo')
        await app.page.locator('input#handle').fill('example')
        await app.page.locator('input#remember').click()

        expect(await evalTextInput(app.page, '#name')).toEqual('foo')
        expect(await evalTextInput(app.page, '#handle')).toEqual('example')
        expect(await evalCheckbox(app.page, '#remember')).toEqual(false)

        await app.page.locator('.reset').click()

        expect(await evalTextInput(app.page, '#name')).toEqual('A')
        expect(await evalTextInput(app.page, '#handle')).toEqual('B')
        expect(await evalCheckbox(app.page, '#remember')).toEqual(true)
      })

      it('can assign new defaults for multiple fields', async () => {
        await app.page.locator('.reassign-object').click()

        expect(await evalTextInput(app.page, '#name')).toEqual('foo')
        expect(await evalTextInput(app.page, '#handle')).toEqual('example')
        expect(await evalCheckbox(app.page, '#remember')).toEqual(false)

        await app.page.locator('.reset-one').click()

        expect(await evalTextInput(app.page, '#name')).toEqual('foo')
        expect(await evalTextInput(app.page, '#handle')).toEqual(
          'updated handle'
        )
        expect(await evalCheckbox(app.page, '#remember')).toEqual(false)

        await app.page.locator('.reset').click()

        expect(await evalTextInput(app.page, '#name')).toEqual('foo')
        expect(await evalTextInput(app.page, '#handle')).toEqual(
          'updated handle'
        )
        expect(await evalCheckbox(app.page, '#remember')).toEqual(true)
      })

      it('can assign new default for a single field', async () => {
        await app.page.locator('.reassign-single').click()

        expect(await evalTextInput(app.page, '#name')).toEqual('foo')
        expect(await evalTextInput(app.page, '#handle')).toEqual('example')
        expect(await evalCheckbox(app.page, '#remember')).toEqual(false)

        await app.page.locator('.reset').click()

        expect(await evalTextInput(app.page, '#name')).toEqual('single value')
        expect(await evalTextInput(app.page, '#handle')).toEqual('example')
        expect(await evalCheckbox(app.page, '#remember')).toEqual(false)
      })
    })
  })

  // todo
  describe('Events', () => {
    beforeEach(async () => {})

    describe('onBefore', () => {
      it('fires when a request is about to be made', async () => {})

      it('can prevent the visit from starting by returning false', async () => {})

      it('will reset the successful and recently successful statuses immediately when the form gets (re)submitted', async () => {})
    })

    describe('onStart', () => {
      it('fires when the request has started', async () => {})
      it('marks the form as processing', async () => {})
    })

    describe('onProgress', () => {
      it('fires when the form has files (and upload progression occurs)', async () => {})
      it('does not fire when the form has no files', async () => {})
      it('updates the progress property of the form', async () => {})
    })

    describe('onCancel', () => {
      it('fires when the request was cancelled', async () => {})
    })

    describe('onSuccess', () => {
      it('fires the request succeeds without validation errors', async () => {})
      it('marks the form as no longer processing', async () => {})
      it('resets the progress property back to null', async () => {})
      it('can delay onFinish from firing by returning a promise', async () => {})
      it('clears all existing errors and resets the hasErrors prop', async () => {})
      it('will mark the form as being submitted successfully', async () => {})
      it('will only mark the form as "recently successful" for two seconds', async () => {})
    })

    describe('onError', () => {
      it('fires when the request finishes with validation errors', async () => {})
      it('marks the form as no longer processing', async () => {})
      it('resets the progress property back to null', async () => {})
      it('sets form errors', async () => {})
      it('can delay onFinish from firing by returning a promise', async () => {})
    })

    describe('onFinish', () => {
      it('fires when the request is completed', async () => {})
    })
  })
})
