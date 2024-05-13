import { describe, expect, it } from 'vitest'

import {
  hrefToUrl,
  mergeDataIntoQueryString,
  objectToUrlParams,
  urlParamsToObject,
  urlWithoutHash,
} from '@inertiajs-revamped/core'

describe('url.ts', () => {
  const params = {
    key1: 'value1',
    key2: ['value2a', 'value2b'],
  }
  const mockUrlWithHash = new URL('https://example.org/foo#bar')
  const mockUrlWithoutHash = new URL('https://example.org/foo')
  const mockUrlWithQuery = new URL('https://example.org/foo?param=value')
  const mockUrlWithEmptyHash = new URL('https://example.org/foo#')
  const mockUrlWithHashQuery = new URL(
    'https://example.org/foo?param=value#bar'
  )
  const mockLocation = { href: 'https://example.org/foo#bar' } as Location

  describe('hrefToUrl', () => {
    it('converts URL string to absolute URL', () => {
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
      const result = hrefToUrl(mockUrlWithoutHash)
      expect(result).toStrictEqual(mockUrlWithoutHash)
    })
  })

  describe('mergeDataIntoQueryString', () => {
    it('merges data into query string with brackets array format', () => {
      const result = mergeDataIntoQueryString('get', 'home', params, 'brackets')
      expect(result).toEqual([
        'home?key1=value1&key2[]=value2a&key2[]=value2b',
        {},
      ])
    })

    it('merges data into query string with unnamed array format', () => {
      const result = mergeDataIntoQueryString('get', 'home', params, 'unnamed')
      expect(result).toEqual(['home?key1=value1&[]=value2a&[]=value2b', {}])
    })

    it('merges data into query string with indices array format', () => {
      const result = mergeDataIntoQueryString('get', 'home', params, 'indices')
      expect(result).toEqual([
        'home?key1=value1&key2[0]=value2a&key2[1]=value2b',
        {},
      ])
    })

    it('merges data into query string with indices array format', () => {
      const result = mergeDataIntoQueryString('get', 'home', params, 'repeat')
      expect(result).toEqual(['home?key1=value1&key2=value2a&key2=value2b', {}])
    })

    it('merges data into query string with comma array format', () => {
      const result = mergeDataIntoQueryString('get', 'home', params, 'comma')
      expect(result).toEqual(['home?key1=value1&key2=value2a,value2b', {}])
    })
  })

  describe('objectToUrlParams', () => {
    it('converts object to query string with unnamed array format', () => {
      const queryString = objectToUrlParams(params)
      expect(queryString).toBe('key1=value1&[]=value2a&[]=value2b')
    })

    it('converts object to query string with brackets array format', () => {
      const queryString = objectToUrlParams(params, 'brackets')
      expect(queryString).toBe('key1=value1&key2[]=value2a&key2[]=value2b')
    })

    it('converts object to query string with indices array format', () => {
      const queryString = objectToUrlParams(params, 'indices')
      expect(queryString).toBe('key1=value1&key2[0]=value2a&key2[1]=value2b')
    })

    it('converts object to query string with repeat array format', () => {
      const queryString = objectToUrlParams(params, 'repeat')
      expect(queryString).toBe('key1=value1&key2=value2a&key2=value2b')
    })

    it('converts object to query string with comma array format', () => {
      const queryString = objectToUrlParams(params, 'comma')
      expect(queryString).toBe('key1=value1&key2=value2a,value2b')
    })

    it('converts array to query string in the default unnamed array format', () => {
      const queryString = objectToUrlParams(params.key2)
      expect(queryString).toBe('[]=value2a&[]=value2b')
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
      const result = urlWithoutHash(mockUrlWithHashQuery).href
      expect(result).toEqual('https://example.org/foo?param=value')
    })

    it('returns URL without hash for Location object', () => {
      const result = urlWithoutHash(mockLocation).href
      expect(result).toEqual('https://example.org/foo')
    })
  })

  describe('urlParamsToObject', () => {
    it('parse key-value pairs', () => {
      const result = urlParamsToObject('key1=value1&key2=value2')
      expect(result).toEqual({ key1: 'value1', key2: 'value2' })
    })

    it('parse unnamed array', () => {
      const result = urlParamsToObject('[]=a&[]=b&[]=c')
      expect(result).toEqual(['a', 'b', 'c'])
    })

    it('parse named arrays with brackets', () => {
      const result = urlParamsToObject('array[]=a&array[]=b&array[]=c')
      expect(result).toEqual({ array: ['a', 'b', 'c'] })
    })

    it('parse named arrays with indices', () => {
      const result = urlParamsToObject('array[0]=a&array[1]=b&array[2]=c')
      expect(result).toEqual({ array: ['a', 'b', 'c'] })
    })

    it('parsing repeat named arrays', () => {
      const result = urlParamsToObject('array=a&array=b&array=c')
      expect(result).toEqual({ array: ['a', 'b', 'c'] })
    })

    it('parse unnamed array with mixed named parameters', () => {
      const result = urlParamsToObject('[]=a&[]=b&key=value&[]=c')
      expect(result).toEqual({ $unnamedArray: ['a', 'b', 'c'], key: 'value' })
    })

    it('parse full URL', () => {
      const result = urlParamsToObject(
        'https://example.com?key1=value1&key2=value2'
      )
      expect(result).toEqual({ key1: 'value1', key2: 'value2' })
    })

    it('return an empty object when provided an empty string', () => {
      const result = urlParamsToObject('')
      expect(result).toEqual({})
    })
  })
})
