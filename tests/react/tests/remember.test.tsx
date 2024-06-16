import { type Browser, type Page, launch } from 'puppeteer'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { evalCheckbox, evalText, evalTextInput } from './helper'
describe('Remember (local state caching)', () => {
  let page: Page
  let browser: Browser

  beforeAll(async () => {
    browser = await launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    page = await browser.newPage()
  })

  afterEach(async () => {
    await page.close()
    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
  })

  it('does not remember anything as of default', async () => {
    await page.goto('http://127.0.0.1:12345/remember/default', {
      waitUntil: 'domcontentloaded',
    })
    expect(page.url()).toEqual('http://127.0.0.1:12345/remember/default')
    /* page.once('load', () =>
      page.on('window:load', () => {
        throw 'A location/non-SPA visit was detected'
      })
    ) */

    await page.waitForNavigation()

    await page.evaluate((selector) => {
      document.querySelector<HTMLInputElement>(selector)!.value = ''
    }, '#name')
    await page.type('#name', 'A')
    const remember = await page.$('#remember')
    if (remember) {
      await remember.click()
    }
    await page.type('#untracked', 'B')
    await page.click('.link')
    await page.waitForNavigation()
    expect(page.url()).toEqual('http://127.0.0.1:12345/dump/get')

    await page.goBack()
    expect(page.url()).toEqual('http://127.0.0.1:12345/remember/default')

    expect(await evalTextInput(page, '#name')).not.to.equal('A')
    expect(await evalCheckbox(page, '#remember')).not.to.equal(true)
    expect(await evalTextInput(page, '#untracked')).not.to.equal('B')
  })

  it('remembers tracked fields using the array syntax', async () => {
    await page.goto('http://127.0.0.1:12345/remember/array', {
      waitUntil: 'domcontentloaded',
    })
    expect(page.url()).toEqual('http://127.0.0.1:12345/remember/array')

    await page.type('#name', 'A')
    const remember = await page.$('#remember')
    if (remember) {
      await remember.click()
    }
    await page.type('#untracked', 'B')
    await page.click('.link')
    await page.waitForNavigation()
    expect(page.url()).toEqual('http://127.0.0.1:12345/dump/get')

    await page.goBack()
    expect(page.url()).toEqual('http://127.0.0.1:12345/remember/array')

    expect(await evalTextInput(page, '#name')).toEqual('A')
    expect(await evalCheckbox(page, '#remember')).toEqual(true)
    expect(await evalTextInput(page, '#untracked')).not.to.equal('B')
  })

  it('remembers tracked fields using the object syntax', async () => {
    await page.goto('http://127.0.0.1:12345/remember/object', {
      waitUntil: 'domcontentloaded',
    })
    expect(page.url()).toEqual('http://127.0.0.1:12345/remember/object')

    await page.type('#name', 'A')
    const remember = await page.$('#remember')
    if (remember) {
      await remember.click()
    }
    await page.type('#untracked', 'B')
    await page.click('.link')
    await page.waitForNavigation()
    expect(page.url()).toEqual('http://127.0.0.1:12345/dump/get')

    await page.goBack()
    expect(page.url()).toEqual('http://127.0.0.1:12345/remember/object')

    expect(await evalTextInput(page, '#name')).toEqual('A')
    expect(await evalCheckbox(page, '#remember')).toEqual(true)
    expect(await evalTextInput(page, '#untracked')).not.to.equal('B')
  })

  it('remembers tracked fields using the string syntax', async () => {
    await page.goto('http://127.0.0.1:12345/remember/string', {
      waitUntil: 'domcontentloaded',
    })
    expect(page.url()).toEqual('http://127.0.0.1:12345/remember/string')

    await page.type('#name', 'A')
    const remember = await page.$('#remember')
    if (remember) {
      await remember.click()
    }
    await page.type('#untracked', 'B')
    await page.click('.link')
    await page.waitForNavigation()
    expect(page.url()).toEqual('http://127.0.0.1:12345/dump/get')

    await page.goBack()
    expect(page.url()).toEqual('http://127.0.0.1:12345/remember/string')

    expect(await evalTextInput(page, '#name')).toEqual('A')
    expect(await evalCheckbox(page, '#remember')).toEqual(false)
    expect(await evalTextInput(page, '#untracked')).not.to.equal('B')
  })

  it('restores remembered data when pressing the back button', async () => {
    await page.goto('http://127.0.0.1:12345/remember/multiple-components', {
      waitUntil: 'domcontentloaded',
    })
    expect(page.url()).toEqual(
      'http://127.0.0.1:12345/remember/multiple-components'
    )

    await page.type('#name', 'D')
    const remember = await page.$('#remember')
    if (remember) {
      await remember.click()
    }
    await page.type('#untracked', 'C')

    await page.type('.a-name', 'A1')
    await page.type('.a-untracked', 'A2')
    await page.type('.b-name', 'B1')
    const rememberB = await page.$('.b-remember')
    if (rememberB) {
      await rememberB.click()
    }
    await page.type('.b-untracked', 'B2')

    await page.click('.link')
    await page.waitForNavigation()
    expect(page.url()).toEqual('http://127.0.0.1:12345/dump/get')

    await page.goBack()
    expect(page.url()).toEqual(
      'http://127.0.0.1:12345/remember/multiple-components'
    )

    expect(await evalTextInput(page, '#name')).toEqual('D')
    expect(await evalCheckbox(page, '#remember')).toEqual(true)
    expect(await evalTextInput(page, '#untracked')).not.to.equal('C')

    expect(await evalTextInput(page, '.a-name')).toEqual('A1')
    expect(await evalCheckbox(page, '.a-remember')).toEqual(false)
    expect(await evalTextInput(page, '.a-untracked')).not.to.equal('A2')

    expect(await evalTextInput(page, '.b-name')).toEqual('B1')
    expect(await evalCheckbox(page, '.b-remember')).toEqual(true)
    expect(await evalTextInput(page, '.b-untracked')).not.to.equal('B2')
  })

  it.skip(
    'restores remembered data when pressing the back button from another website',
    { retry: 10 },
    async () => {
      await page.goto('http://127.0.0.1:12345/remember/multiple-components', {
        waitUntil: 'domcontentloaded',
      })
      expect(page.url()).toEqual(
        'http://127.0.0.1:12345/remember/multiple-components'
      )

      await page.type('#name', 'D')
      const remember = await page.$('#remember')
      if (remember) {
        await remember.click()
      }
      await page.type('#untracked', 'C')

      await page.type('.a-name', 'A1')
      await page.type('.a-untracked', 'A2')
      await page.type('.b-name', 'B1')
      const rememberA = await page.$('.b-remember')
      if (rememberA) {
        await rememberA.click()
      }
      await page.type('.b-untracked', 'B2')

      await page.click('.off-site')
      await page.waitForNavigation()
      expect(page.url()).toEqual('http://127.0.0.1:12345/non-inertia')

      await page.goBack()
      expect(page.url()).toEqual(
        'http://127.0.0.1:12345/remember/multiple-components'
      )

      expect(await evalTextInput(page, '#name')).toEqual('D')
      expect(await evalCheckbox(page, '#remember')).toEqual(true)
      expect(await evalTextInput(page, '#untracked')).toEqual('')

      expect(await evalTextInput(page, '.a-name')).toEqual('A1')
      expect(await evalCheckbox(page, '.a-remember')).toEqual(false)
      expect(await evalTextInput(page, '.a-untracked')).not.to.equal('A1')

      expect(await evalTextInput(page, '.b-name')).toEqual('B1')
      expect(await evalCheckbox(page, '.b-remember')).toEqual(true)
      expect(await evalTextInput(page, '.b-untracked')).not.to.equal('B2')
    }
  )

  describe('form helper', () => {
    it('does not remember form data as of default', async () => {
      await page.goto('http://127.0.0.1:12345/remember/form-helper/default', {
        waitUntil: 'domcontentloaded',
      })
      expect(page.url()).toEqual(
        'http://127.0.0.1:12345/remember/form-helper/default'
      )

      /* await page.waitForNavigation()

      await page.evaluate((selector) => {
        document.querySelector<HTMLInputElement>(selector)!.value = ''
      }, '#name') */

      await page.type('#name', 'A')
      await page.type('#handle', 'B')
      const remember = await page.$('#remember')
      if (remember) {
        await remember.click()
      }
      await page.type('#untracked', 'C')

      await page.click('.link')
      await page.waitForNavigation()
      expect(page.url()).toEqual('http://127.0.0.1:12345/dump/get')

      await page.goBack()
      expect(page.url()).toEqual(
        'http://127.0.0.1:12345/remember/form-helper/default'
      )

      expect(await evalTextInput(page, '#name')).not.to.equal('A')
      expect(await evalTextInput(page, '#handle')).not.to.equal('B')
      expect(await evalCheckbox(page, '#remember')).not.to.equal(true)
      expect(await evalTextInput(page, '#untracked')).not.to.equal('C')
    })

    it('does not remember form errors as of default', async () => {
      await page.goto('http://127.0.0.1:12345/remember/form-helper/default', {
        waitUntil: 'domcontentloaded',
      })
      expect(page.url()).toEqual(
        'http://127.0.0.1:12345/remember/form-helper/default'
      )

      await page.waitForNavigation()

      await page.evaluate((selector) => {
        document.querySelector<HTMLInputElement>(selector)!.value = ''
      }, '#name')
      await page.type('#name', 'A')
      await page.evaluate((selector) => {
        document.querySelector<HTMLInputElement>(selector)!.value = ''
      }, '#handle')
      await page.type('#handle', 'B')
      await page.evaluate((selector) => {
        document.querySelector<HTMLInputElement>(selector)!.checked = false
      }, '#remember')
      const remember = await page.$('#remember')
      if (remember) {
        await remember.click()
      }
      await page.type('#untracked', 'C')

      expect(await page.$('.name_error')).toStrictEqual(null)
      expect(await page.$('.handle_error')).toStrictEqual(null)
      expect(await page.$('.remember_error')).toStrictEqual(null)

      await page.click('.submit')
      await page.waitForNavigation()

      expect(await evalText(page, '.name_error')).toEqual('Some name error')
      expect(await evalText(page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await page.$('.remember_error')).toStrictEqual(null)
    })

    it('remembers form data when tracked', async () => {
      await page.goto('http://127.0.0.1:12345/remember/form-helper/remember', {
        waitUntil: 'domcontentloaded',
      })
      expect(page.url()).toEqual(
        'http://127.0.0.1:12345/remember/form-helper/remember'
      )

      await page.waitForNetworkIdle()

      await page.evaluate((selector) => {
        document.querySelector<HTMLInputElement>(selector)!.value = ''
      }, '#name')
      await page.type('#name', 'A')
      await page.evaluate((selector) => {
        document.querySelector<HTMLInputElement>(selector)!.value = ''
      }, '#handle')
      await page.type('#handle', 'B')
      await page.evaluate((selector) => {
        document.querySelector<HTMLInputElement>(selector)!.checked = false
      }, '#remember')
      const remember = await page.$('#remember')
      if (remember) {
        await remember.click()
      }
      await page.type('#untracked', 'C')

      await page.click('.link')
      await page.waitForNavigation()
      expect(page.url()).toEqual('http://127.0.0.1:12345/dump/get')

      await page.goBack()
      expect(page.url()).toEqual(
        'http://127.0.0.1:12345/remember/form-helper/remember'
      )

      expect(await evalTextInput(page, '#name')).toEqual('A')
      expect(await evalTextInput(page, '#handle')).toEqual('B')
      expect(await evalCheckbox(page, '#remember')).toEqual(true)
      expect(await evalTextInput(page, '#untracked')).not.to.equal('C')
    })

    it('remembers form errors when tracked', async () => {
      await page.goto('http://127.0.0.1:12345/remember/form-helper/remember', {
        waitUntil: 'domcontentloaded',
      })
      expect(page.url()).toEqual(
        'http://127.0.0.1:12345/remember/form-helper/remember'
      )

      await page.waitForNetworkIdle()

      await page.evaluate((selector) => {
        document.querySelector<HTMLInputElement>(selector)!.value = ''
      }, '#name')
      await page.type('#name', 'A')
      await page.evaluate((selector) => {
        document.querySelector<HTMLInputElement>(selector)!.value = ''
      }, '#handle')
      await page.type('#handle', 'B')
      await page.evaluate((selector) => {
        document.querySelector<HTMLInputElement>(selector)!.checked = false
      }, '#remember')
      const remember = await page.$('#remember')
      if (remember) {
        await remember.click()
      }
      await page.type('#untracked', 'C')

      expect(await page.$('.name_error')).toStrictEqual(null)
      expect(await page.$('.handle_error')).toStrictEqual(null)
      expect(await page.$('.remember_error')).toStrictEqual(null)

      await page.click('.submit')
      await page.waitForNavigation()

      expect(await evalText(page, '.name_error')).toEqual('Some name error')
      expect(await evalText(page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await page.$('.remember_error')).toStrictEqual(null)

      await page.click('.link')
      await page.waitForNavigation()
      expect(page.url()).toEqual('http://127.0.0.1:12345/dump/get')

      await page.goBack()
      expect(page.url()).toEqual(
        'http://127.0.0.1:12345/remember/form-helper/remember'
      )

      expect(await evalTextInput(page, '#name')).toEqual('A')
      expect(await evalTextInput(page, '#handle')).toEqual('B')
      expect(await evalCheckbox(page, '#remember')).toEqual(true)
      expect(await evalTextInput(page, '#untracked')).not.to.equal('C')

      expect(await evalText(page, '.name_error')).toEqual('Some name error')
      expect(await evalText(page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await page.$('.remember_error')).toStrictEqual(null)
    })

    it('remembers the last state of a form when tracked', async () => {
      await page.goto('http://127.0.0.1:12345/remember/form-helper/remember', {
        waitUntil: 'domcontentloaded',
      })
      expect(page.url()).toEqual(
        'http://127.0.0.1:12345/remember/form-helper/remember'
      )

      await page.waitForNetworkIdle()

      await page.evaluate((selector) => {
        document.querySelector<HTMLInputElement>(selector)!.value = ''
      }, '#name')
      await page.type('#name', 'A')
      await page.evaluate((selector) => {
        document.querySelector<HTMLInputElement>(selector)!.value = ''
      }, '#handle')
      await page.type('#handle', 'B')
      await page.evaluate((selector) => {
        document.querySelector<HTMLInputElement>(selector)!.checked = false
      }, '#remember')
      const remember = await page.$('#remember')
      if (remember) {
        await remember.click()
      }
      await page.type('#untracked', 'C')

      expect(await page.$('.name_error')).toBe(null)
      expect(await page.$('.handle_error')).toBe(null)
      expect(await page.$('.remember_error')).toBe(null)

      await page.click('.submit')
      await page.waitForNavigation()

      expect(await evalTextInput(page, '#name')).toEqual('A')
      expect(await evalTextInput(page, '#handle')).toEqual('B')
      expect(await evalCheckbox(page, '#remember')).toEqual(true)
      expect(await evalTextInput(page, '#untracked')).toEqual('C') // Only due to visit POST/PUT/PATCH/DELETE method's default preserveState option.

      expect(await evalText(page, '.name_error')).toEqual('Some name error')
      expect(await evalText(page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await page.$('.remember_error')).toStrictEqual(null)

      await page.click('.reset-one')
      expect(await evalTextInput(page, '#name')).toEqual('A')
      expect(await evalTextInput(page, '#handle')).toEqual('example')
      expect(await evalCheckbox(page, '#remember')).toEqual(true)
      expect(await evalTextInput(page, '#untracked')).toEqual('C') // Unchanged from above

      expect(await page.$('.name_error')).toBe(null)
      expect(await evalText(page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await page.$('.remember_error')).toBe(null)

      await page.click('.link')
      await page.waitForNavigation()
      expect(page.url()).toEqual('http://127.0.0.1:12345/dump/get')

      await page.goBack()
      expect(page.url()).toEqual(
        'http://127.0.0.1:12345/remember/form-helper/remember'
      )

      expect(await evalTextInput(page, '#name')).toEqual('A')
      expect(await evalTextInput(page, '#handle')).toEqual('example')
      expect(await evalCheckbox(page, '#remember')).toEqual(true)
      expect(await evalTextInput(page, '#untracked')).not.to.equal('C')

      expect(await page.$('.name_error')).toBe(null)
      expect(await evalText(page, '.handle_error')).toEqual(
        'The Handle was invalid'
      )
      expect(await page.$('.remember_error')).toStrictEqual(null)
    })
  })
})
