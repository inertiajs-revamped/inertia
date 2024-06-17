import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import {
  type App,
  BASE_URL,
  evalCheckbox,
  evalText,
  evalTextInput,
  start,
} from './helper'

describe('Remember (local state caching)', () => {
  let app: App

  beforeAll(async () => {
    app = await start()
  })

  afterEach(async () => {
    await app.page.reload()
    await app.page.waitForNetworkIdle()
  })

  afterAll(async () => {
    await app.stop()
  })

  it('does not remember anything as of default', async () => {
    await app.navigate('/remember/default')
    expect(app.page.url()).toEqual(`${BASE_URL}/remember/default`)

    await app.page.locator('input#name').fill('A')
    await app.page.locator('input#remember').click()
    await app.page.locator('input#untracked').fill('B')

    await app.page.locator('.link').click()
    await app.page.waitForResponse(`${BASE_URL}/dump/get`)
    await app.page.waitForNavigation()
    expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)

    await app.page.goBack()
    expect(app.page.url()).toEqual(`${BASE_URL}/remember/default`)

    expect(await evalTextInput(app.page, '#name')).not.to.equal('A')
    expect(await evalCheckbox(app.page, '#remember')).not.to.equal(true)
    expect(await evalTextInput(app.page, '#untracked')).not.to.equal('B')
  })

  it('remembers tracked fields using the array syntax', async () => {
    await app.navigate('/remember/array')
    expect(app.page.url()).toEqual(`${BASE_URL}/remember/array`)

    await app.page.locator('input#name').fill('A')
    await app.page.locator('input#remember').click()
    await app.page.locator('input#untracked').fill('B')

    await app.page.locator('.link').click()
    await app.page.waitForResponse(`${BASE_URL}/dump/get`)
    await app.page.waitForNavigation()
    expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)

    await app.page.goBack()
    expect(app.page.url()).toEqual(`${BASE_URL}/remember/array`)

    expect(await evalTextInput(app.page, '#name')).toEqual('A')
    expect(await evalCheckbox(app.page, '#remember')).toEqual(true)
    expect(await evalTextInput(app.page, '#untracked')).not.to.equal('B')
  })

  it('remembers tracked fields using the object syntax', async () => {
    await app.navigate('/remember/object')
    expect(app.page.url()).toEqual(`${BASE_URL}/remember/object`)

    await app.page.locator('input#name').fill('A')
    await app.page.locator('input#remember').click()
    await app.page.locator('input#untracked').fill('B')

    await app.page.locator('.link').click()
    await app.page.waitForResponse(`${BASE_URL}/dump/get`)
    await app.page.waitForNavigation()
    expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)

    await app.page.goBack()
    expect(app.page.url()).toEqual(`${BASE_URL}/remember/object`)

    expect(await evalTextInput(app.page, '#name')).toEqual('A')
    expect(await evalCheckbox(app.page, '#remember')).toEqual(true)
    expect(await evalTextInput(app.page, '#untracked')).not.to.equal('B')
  })

  it('remembers tracked fields using the string syntax', async () => {
    await app.navigate('/remember/string')
    expect(app.page.url()).toEqual(`${BASE_URL}/remember/string`)

    await app.page.locator('input#name').fill('A')
    await app.page.locator('input#remember').click()
    await app.page.locator('input#untracked').fill('B')

    await app.page.locator('.link').click()
    await app.page.waitForResponse(`${BASE_URL}/dump/get`)
    await app.page.waitForNavigation()
    expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)

    await app.page.goBack()
    expect(app.page.url()).toEqual(`${BASE_URL}/remember/string`)

    expect(await evalTextInput(app.page, '#name')).toEqual('A')
    expect(await evalCheckbox(app.page, '#remember')).toEqual(false)
    expect(await evalTextInput(app.page, '#untracked')).not.to.equal('B')
  })

  it('restores remembered data when pressing the back button', async () => {
    await app.navigate('/remember/multiple-components')
    expect(app.page.url()).toEqual(`${BASE_URL}/remember/multiple-components`)

    await app.page.locator('input#name').fill('D')
    await app.page.locator('input#remember').click()
    await app.page.locator('input#untracked').fill('C')

    await app.page.locator('input.a-name').fill('A1')
    await app.page.locator('input.a-untracked').fill('A2')
    await app.page.locator('input.b-name').fill('B1')
    await app.page.locator('input.b-remember').click()
    await app.page.locator('input.b-untracked').fill('B2')

    await app.page.locator('.link').click()
    await app.page.waitForResponse(`${BASE_URL}/dump/get`)
    await app.page.waitForNavigation()
    expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)

    await app.page.goBack()
    expect(app.page.url()).toEqual(`${BASE_URL}/remember/multiple-components`)

    expect(await evalTextInput(app.page, '#name')).toEqual('D')
    expect(await evalCheckbox(app.page, '#remember')).toEqual(true)
    expect(await evalTextInput(app.page, '#untracked')).not.to.equal('C')

    expect(await evalTextInput(app.page, '.a-name')).toEqual('A1')
    expect(await evalCheckbox(app.page, '.a-remember')).toEqual(false)
    expect(await evalTextInput(app.page, '.a-untracked')).not.to.equal('A2')

    expect(await evalTextInput(app.page, '.b-name')).toEqual('B1')
    expect(await evalCheckbox(app.page, '.b-remember')).toEqual(true)
    expect(await evalTextInput(app.page, '.b-untracked')).not.to.equal('B2')
  })

  it('restores remembered data when pressing the back button from another website' /* { retry: 10 }, */, async () => {
    await app.navigate('/remember/multiple-components')
    expect(app.page.url()).toEqual(`${BASE_URL}/remember/multiple-components`)

    await app.page.locator('input#name').fill('D')
    await app.page.locator('input#remember').click()
    await app.page.locator('input#untracked').fill('C')

    await app.page.locator('input.a-name').fill('A1')
    await app.page.locator('input.a-untracked').fill('A2')
    await app.page.locator('input.b-name').fill('B1')
    await app.page.locator('input.b-remember').click()
    await app.page.locator('input.b-untracked').fill('B2')

    await app.page.locator('.off-site').click()
    await app.page.waitForNavigation()
    expect(app.page.url()).toEqual(`${BASE_URL}/non-inertia`)

    await app.page.goBack()
    await app.page.waitForNavigation()
    expect(app.page.url()).toEqual(`${BASE_URL}/remember/multiple-components`)

    expect(await evalTextInput(app.page, '#name')).toEqual('D')
    expect(await evalCheckbox(app.page, '#remember')).toEqual(true)
    expect(await evalTextInput(app.page, '#untracked')).toEqual('')

    expect(await evalTextInput(app.page, '.a-name')).toEqual('A1')
    expect(await evalCheckbox(app.page, '.a-remember')).toEqual(false)
    expect(await evalTextInput(app.page, '.a-untracked')).not.to.equal('A1')

    expect(await evalTextInput(app.page, '.b-name')).toEqual('B1')
    expect(await evalCheckbox(app.page, '.b-remember')).toEqual(true)
    expect(await evalTextInput(app.page, '.b-untracked')).not.to.equal('B2')
  })

  describe('form helper', () => {
    it('does not remember form data as of default', async () => {
      await app.navigate('/remember/form-helper/default')
      expect(app.page.url()).toEqual(`${BASE_URL}/remember/form-helper/default`)

      await app.page.locator('input#name').fill('A')
      await app.page.locator('input#handle').fill('B')
      await app.page.locator('input#remember').click()
      await app.page.locator('input#untracked').fill('C')

      await app.page.locator('.link').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/get`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)

      await app.page.goBack()
      expect(app.page.url()).toEqual(`${BASE_URL}/remember/form-helper/default`)

      expect(await evalTextInput(app.page, '#name')).not.to.equal('A')
      expect(await evalTextInput(app.page, '#handle')).not.to.equal('B')
      expect(await evalCheckbox(app.page, '#remember')).not.to.equal(true)
      expect(await evalTextInput(app.page, '#untracked')).not.to.equal('C')
    })

    it('does not remember form errors as of default', async () => {
      await app.navigate('/remember/form-helper/default')
      expect(app.page.url()).toEqual(`${BASE_URL}/remember/form-helper/default`)

      await app.page.locator('input#name').fill('A')
      await app.page.locator('input#handle').fill('B')
      await app.page.locator('input#remember').click()
      await app.page.locator('input#untracked').fill('C')

      expect(await app.page.$('.name_error')).toStrictEqual(null)
      expect(await app.page.$('.handle_error')).toStrictEqual(null)
      expect(await app.page.$('.remember_error')).toStrictEqual(null)

      await app.page.click('.submit')
      await app.page.waitForNavigation()

      expect(await evalText(app.page, '.name_error')).toEqual('Some name error')
      expect(await evalText(app.page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await app.page.$('.remember_error')).toStrictEqual(null)
    })

    it('remembers form data when tracked', async () => {
      await app.navigate('/remember/form-helper/remember')
      expect(app.page.url()).toEqual(
        `${BASE_URL}/remember/form-helper/remember`
      )

      await app.page.locator('input#name').fill('A')
      await app.page.locator('input#handle').fill('B')
      await app.page.locator('input#remember').click()
      await app.page.locator('input#untracked').fill('C')

      await app.page.locator('.link').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/get`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)

      await app.page.goBack()
      expect(app.page.url()).toEqual(
        `${BASE_URL}/remember/form-helper/remember`
      )

      expect(await evalTextInput(app.page, '#name')).toEqual('A')
      expect(await evalTextInput(app.page, '#handle')).toEqual('B')
      expect(await evalCheckbox(app.page, '#remember')).toEqual(true)
      expect(await evalTextInput(app.page, '#untracked')).not.to.equal('C')
    })

    it('remembers form errors when tracked', async () => {
      await app.navigate('/remember/form-helper/remember')
      expect(app.page.url()).toEqual(
        `${BASE_URL}/remember/form-helper/remember`
      )

      await app.page.locator('input#name').fill('A')
      await app.page.locator('input#handle').fill('B')
      await app.page.locator('input#remember').click()
      await app.page.locator('input#untracked').fill('C')

      expect(await app.page.$('.name_error')).toStrictEqual(null)
      expect(await app.page.$('.handle_error')).toStrictEqual(null)
      expect(await app.page.$('.remember_error')).toStrictEqual(null)

      await app.page.click('.submit')
      await app.page.waitForNavigation()

      expect(await evalText(app.page, '.name_error')).toEqual('Some name error')
      expect(await evalText(app.page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await app.page.$('.remember_error')).toStrictEqual(null)

      await app.page.locator('.link').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/get`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)

      await app.page.goBack()
      expect(app.page.url()).toEqual(
        `${BASE_URL}/remember/form-helper/remember`
      )

      expect(await evalTextInput(app.page, '#name')).toEqual('A')
      expect(await evalTextInput(app.page, '#handle')).toEqual('B')
      expect(await evalCheckbox(app.page, '#remember')).toEqual(true)
      expect(await evalTextInput(app.page, '#untracked')).not.to.equal('C')

      expect(await evalText(app.page, '.name_error')).toEqual('Some name error')
      expect(await evalText(app.page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await app.page.$('.remember_error')).toStrictEqual(null)
    })

    it('remembers the last state of a form when tracked', async () => {
      await app.navigate('/remember/form-helper/remember')
      expect(app.page.url()).toEqual(
        `${BASE_URL}/remember/form-helper/remember`
      )

      await app.page.locator('input#name').fill('A')
      await app.page.locator('input#handle').fill('B')
      await app.page.locator('input#remember').click()
      await app.page.locator('input#untracked').fill('C')

      expect(await app.page.$('.name_error')).toBe(null)
      expect(await app.page.$('.handle_error')).toBe(null)
      expect(await app.page.$('.remember_error')).toBe(null)

      await app.page.click('.submit')
      await app.page.waitForNavigation()

      expect(await evalTextInput(app.page, '#name')).toEqual('A')
      expect(await evalTextInput(app.page, '#handle')).toEqual('B')
      expect(await evalCheckbox(app.page, '#remember')).toEqual(true)
      expect(await evalTextInput(app.page, '#untracked')).toEqual('C') // Only due to visit POST/PUT/PATCH/DELETE method's default preserveState option.

      expect(await evalText(app.page, '.name_error')).toEqual('Some name error')
      expect(await evalText(app.page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await app.page.$('.remember_error')).toStrictEqual(null)

      await app.page.click('.reset-one')
      expect(await evalTextInput(app.page, '#name')).toEqual('A')
      expect(await evalTextInput(app.page, '#handle')).toEqual('example')
      expect(await evalCheckbox(app.page, '#remember')).toEqual(true)
      expect(await evalTextInput(app.page, '#untracked')).toEqual('C') // Unchanged from above

      expect(await app.page.$('.name_error')).toBe(null)
      expect(await evalText(app.page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await app.page.$('.remember_error')).toBe(null)

      await app.page.locator('.link').click()
      await app.page.waitForResponse(`${BASE_URL}/dump/get`)
      await app.page.waitForNavigation()
      expect(app.page.url()).toEqual(`${BASE_URL}/dump/get`)

      await app.page.goBack()
      expect(app.page.url()).toEqual(
        `${BASE_URL}/remember/form-helper/remember`
      )

      expect(await evalTextInput(app.page, '#name')).toEqual('A')
      expect(await evalTextInput(app.page, '#handle')).toEqual('example')
      expect(await evalCheckbox(app.page, '#remember')).toEqual(true)
      expect(await evalTextInput(app.page, '#untracked')).not.to.equal('C')

      expect(await app.page.$('.name_error')).toBe(null)
      expect(await evalText(app.page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await app.page.$('.remember_error')).toStrictEqual(null)
    })
  })
})
