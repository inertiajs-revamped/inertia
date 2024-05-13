import deepmerge from 'deepmerge'
import type { ArrayFormat, FormDataConvertible, Method } from './types'
import { isArray, isUrl } from './utils'

export function hrefToUrl(href: string | URL): URL {
  return new URL(href.toString(), window.location.toString())
}

export function mergeDataIntoQueryString(
  method: Method,
  href: URL | string,
  data: Record<string, FormDataConvertible>,
  qsArrayFormat: ArrayFormat = 'brackets'
): [string, Record<string, FormDataConvertible>] {
  const hasHost = /^https?:\/\//.test(href.toString())
  const hasAbsolutePath = hasHost || href.toString().startsWith('/')
  const hasRelativePath =
    !hasAbsolutePath &&
    !href.toString().startsWith('#') &&
    !href.toString().startsWith('?')
  const hasSearch =
    href.toString().includes('?') ||
    (method === 'get' && Object.keys(data).length)
  const hasHash = href.toString().includes('#')

  const url = new URL(href.toString(), 'http://localhost')

  if (method === 'get' && Object.keys(data).length) {
    url.search = objectToUrlParams(
      deepmerge(urlParamsToObject(url.search), data),
      qsArrayFormat
    )
    data = {}
  }

  return [
    [
      hasHost ? `${url.protocol}//${url.host}` : '',
      hasAbsolutePath ? url.pathname : '',
      hasRelativePath ? url.pathname.substring(1) : '',
      hasSearch ? url.search : '',
      hasHash ? url.hash : '',
    ].join(''),
    data,
  ]
}

export function urlWithoutHash(url: URL | Location): URL {
  url = new URL(url.href)
  url.hash = ''
  return url
}

/**
 * @description: fork by "@jsxiaosi/utils" v0.0.18
 * @author: 小斯（xiaosi）
 * @license: MIT
 */

export function objectToUrlParams(
  params: Record<string, any>,
  arrayFormat: ArrayFormat = 'unnamed'
): string {
  if (isArray(params)) {
    return params.map((val) => `[]=${val}`).join('&')
  } else {
    const queryString = Object.entries(params)
      .flatMap(([key, value]) => {
        if (isArray(value)) {
          switch (arrayFormat) {
            case 'brackets':
              return value.map((val) => `${key}[]=${val}`)
            case 'indices':
              return value.map((val, index) => `${key}[${index}]=${val}`)
            case 'repeat':
              return value.map((val) => `${key}=${val}`)
            case 'comma':
              return `${key}=${value.join(',')}`
            default:
              return value.map((val) => `[]=${val}`)
          }
        } else {
          return `${key}=${value}`
        }
      })
      .join('&')

    return queryString
  }
}

export function urlParamsToObject(queryString: string): Record<string, any> {
  let urlParams: string | undefined = queryString
  if (isUrl(queryString)) {
    urlParams = queryString.split('?')[1]
  }
  const searchParams = new URLSearchParams(urlParams)
  const paramsObject: Record<string, any> = {}
  const unnamedArray: any[] = []

  for (const [key, value] of searchParams.entries()) {
    let isArray = false
    let realKey = key
    if (key.endsWith('[]')) {
      isArray = true
      realKey = key.slice(0, -2)
    } else if (key.match(/\[\d+\]$/)) {
      isArray = true
      realKey = key.replace(/\[\d+\]$/, '')
    }

    if (realKey === '') {
      unnamedArray.push(value)
      continue
    }

    if (Object.prototype.hasOwnProperty.call(paramsObject, realKey)) {
      isArray = true
      if (!Array.isArray(paramsObject[realKey])) {
        paramsObject[realKey] = [paramsObject[realKey]]
      }
    }

    if (isArray) {
      if (!paramsObject[realKey]) {
        paramsObject[realKey] = []
      }
      paramsObject[realKey].push(value)
    } else {
      paramsObject[realKey] = value
    }
  }

  if (unnamedArray.length > 0) {
    if (Object.keys(paramsObject).length > 0)
      paramsObject.$unnamedArray = unnamedArray
    else return unnamedArray
  }

  return paramsObject
}
