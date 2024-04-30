import { JSDOM } from 'jsdom'
import { describe, expect, it } from 'vitest'

import {
  hrefToUrl,
  mergeDataIntoQueryString,
  urlWithoutHash,
} from '@inertiajs-revamped/core'

const urlWithHash = new URL('https://example.org/foo#bar')

describe('url.ts', () => {
  describe('hrefToUrl', () => {
    it('should convert string to URL', () => {
      // @ts-expect-error JSDOM Window mismatch
      global.window ??= new JSDOM('<body></body>', {
        url: 'http://example.org/',
      }).window

      const result = hrefToUrl('https://example.org/foo#bar')

      expect(result).toEqual(urlWithHash)
    })
  })

  describe('mergeDataIntoQueryString', () => {
    it('should merge data into query string', () => {
      const result = mergeDataIntoQueryString('get', 'home', {
        foo: 'bar',
        baz: 'buz',
      })

      expect(result).toEqual(['home?foo=bar&baz=buz', {}])
    })
  })

  describe('urlWithoutHash', () => {
    it('should return URL without hash', () => {
      const result = urlWithoutHash(urlWithHash).href

      expect(result).toEqual('https://example.org/foo')
    })
  })
})
