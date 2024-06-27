import {
  Blob as FormDataBlob,
  File as FormDataFile,
  FormData as FormDataNode,
} from 'formdata-node'
import { beforeAll, describe, expect, it } from 'vitest'

import { hasFiles, objectToFormData } from '@inertiajs-revamped/core'

describe('form-data.ts', () => {
  beforeAll(() => {
    globalThis.FormData = FormDataNode
    globalThis.File = FormDataFile
    globalThis.Blob = FormDataBlob
  })

  describe('hasFiles', () => {
    it('should find file in simple object', () => {
      const file = new File(['Test file content'], 'test.txt', {
        type: 'text/plain',
      })

      const obj = {
        fileObject: file,
      }

      expect(hasFiles(obj)).toBeTruthy()
    })

    it('should find file in complex object', () => {
      const file = new File(['Test file content'], 'test.txt', {
        type: 'text/plain',
      })

      const obj = {
        fileObject: {
          fileName: 'name.jpg',
          id: 1,
          file,
        },
      }

      expect(hasFiles(obj)).toBeTruthy()
    })
  })

  describe('objectToFormData', () => {
    it('should return formData', () => {
      const formData = objectToFormData({})

      expect(formData).toBeInstanceOf(FormData)
    })

    it('should accept custom formData', () => {
      const FormDataNode = new FormData()

      const form = objectToFormData({}, FormDataNode)

      expect(form.constructor).toMatchObject(FormDataNode)
    })

    it('should return File as is', async () => {
      const file = new File(['Test file content'], 'test.txt', {
        type: 'text/plain',
      })

      const form = objectToFormData({ file })

      const actual = form.get('file') as File

      expect(actual).toBeInstanceOf(File)
      expect(await actual.text()).toMatchObject(await file.text())
    })

    it('should return Blob as is', async () => {
      const blob = new Blob(['Test file content'], { type: 'text/plain' })

      const form = objectToFormData({ blob })

      const actual = form.get('blob') as File

      expect(actual).toBeInstanceOf(File)
      expect(await actual.text()).toMatchObject(await blob.text())
    })

    it('should create formData for object', () => {
      const file = new File(['Test file content'], 'test.txt', {
        type: 'text/plain',
      })
      const obj = {
        str: 'string',
        num: 10,
        flt: 5.43,
        fileObject: file,
      }

      const formData = objectToFormData(obj)

      expect(formData.get('str')).toEqual('string')
      expect(formData.get('num')).toEqual('10')
      expect(formData.get('flt')).toEqual('5.43')
      expect(formData.get('fileObject')).toEqual(file)
    })
  })
})
