import { describe, expect, it } from 'vitest'

import {
  hrefToUrl,
  mergeDataIntoQueryString,
  urlWithoutHash,
} from '@inertiajs-revamped/core'

const mockUrlWithHash = new URL('https://example.org/foo#bar')
const mockUrlWithoutHash = new URL('https://example.org/foo')
const mockUrlWithQuery = new URL('https://example.org/foo?param=value')
const mockUrlWithEmptyHash = new URL('https://example.org/foo#')
const mockUrlWithHashAndQuery = new URL(
  'https://example.org/foo?param=value#bar'
)
const mockLocation = { href: 'https://example.org/foo#bar' } as Location

describe('url.ts', () => {
  describe('hrefToUrl', () => {
    it('converts string to URL', () => {
      const result = hrefToUrl('https://example.org/foo#bar')
      expect(result).toEqual(mockUrlWithHash)
    })

    it('converts relative URL string to absolute URL', () => {
      const result = hrefToUrl('/path')
      expect(result.href).toEqual(`${window.location.origin}/path`)
    })

    it('converts URL string with query parameters to URL object', () => {
      const result = hrefToUrl('https://example.org/path?param=value')
      expect(result.href).toEqual('https://example.org/path?param=value')
    })

    it('converts URL string with hash and query parameters to URL object', () => {
      const result = hrefToUrl('https://example.org/path?param=value#hash')
      expect(result.href).toEqual('https://example.org/path?param=value#hash')
    })

    it('returns the same URL object when input is a URL object', () => {
      const input = new URL('https://example.org/path')
      const result = hrefToUrl(input)
      expect(result).toStrictEqual(input)
    })
  })

  describe('mergeDataIntoQueryString', () => {
    it('merges data into query string', () => {
      const result = mergeDataIntoQueryString('get', 'home', {
        foo: 'bar',
        baz: 'buz',
      })

      expect(result).toEqual(['home?foo=bar&baz=buz', {}])
    })
  })

  describe('urlWithoutHash', () => {
    it('returns URL without hash', () => {
      const result = urlWithoutHash(mockUrlWithHash).href
      expect(result).toEqual('https://example.org/foo')
    })

    it('returns URL without hash for URL without hash component', () => {
      const result = urlWithoutHash(mockUrlWithoutHash).href
      expect(result).toEqual('https://example.org/foo')
    })

    it('returns URL without hash for URL with query parameters but no hash', () => {
      const result = urlWithoutHash(mockUrlWithQuery).href
      expect(result).toEqual('https://example.org/foo?param=value')
    })

    it('returns URL without hash for URL with empty hash', () => {
      const result = urlWithoutHash(mockUrlWithEmptyHash).href
      expect(result).toEqual('https://example.org/foo')
    })

    it('returns URL without hash for URL with both hash and query parameters', () => {
      const result = urlWithoutHash(mockUrlWithHashAndQuery).href
      expect(result).toEqual('https://example.org/foo?param=value')
    })

    it('returns URL without hash for Location object', () => {
      const result = urlWithoutHash(mockLocation).href
      expect(result).toEqual('https://example.org/foo')
    })
  })
})
