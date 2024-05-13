import type { FormDataConvertible, RequestPayload } from './types'
import { isArray } from './utils'

export function hasFiles(data: RequestPayload | FormDataConvertible): boolean {
  return (
    data instanceof File ||
    data instanceof Blob ||
    (data instanceof FileList && data.length > 0) ||
    (data instanceof FormData &&
      Array.from(data.values()).some((value) => hasFiles(value))) ||
    (typeof data === 'object' &&
      data !== null &&
      Object.values(data).some((value) => hasFiles(value)))
  )
}

export function objectToFormData(
  source: Record<string, FormDataConvertible>,
  form: FormData = new FormData(),
  parentKey: string | null = null
): FormData {
  source = source || {}

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      append(form, composeKey(parentKey, key), source[key])
    }
  }

  return form
}

function composeKey(parent: string | null, key: string): string {
  return parent ? parent + '[' + key + ']' : key
}

function append(form: FormData, key: string, value: FormDataConvertible): void {
  if (isArray(value)) {
    Array.from(value.keys()).forEach((index) =>
      append(form, composeKey(key, index.toString()), value[index])
    )
    return
  }

  if (value instanceof Date) {
    form.append(key, value.toISOString())
    return
  }

  if (value instanceof File) {
    form.append(key, value, value.name)
    return
  }

  if (value instanceof Blob) {
    form.append(key, value)
    return
  }

  if (typeof value === 'boolean') {
    form.append(key, value ? '1' : '0')
    return
  }

  if (typeof value === 'string') {
    form.append(key, value)
    return
  }

  if (typeof value === 'number') {
    form.append(key, `${value}`)
    return
  }

  if (value === null || value === undefined) {
    form.append(key, '')
    return
  }

  objectToFormData(value, form, key)
}
