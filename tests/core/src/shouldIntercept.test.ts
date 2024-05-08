import { describe, expect, it } from 'vitest'

import { shouldIntercept } from '@inertiajs-revamped/core'

const defaultEventMock = {
  // to simulate `HTMLAnchorElement`
  currentTarget: {
    tagName: 'A',
  },
  target: {
    isContentEditable: false,
  },
  defaultPrevented: false,
  // https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/which#value_for_mouseevent_non-standard
  // 1: Left button
  which: 1,
  // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
  // 0: Left mouse
  button: 0,
  altKey: false,
  ctrlKey: false,
  metaKey: false,
  shiftKey: false,
  bubbles: true,
  cancelable: true,
}

describe('shouldIntercept.ts', () => {
  describe('should not intercept', () => {
    /* it('when tagName is not a', () => {
      const result = shouldIntercept({
        ...defaultEventMock,
        currentTarget: {
          // @ts-expect-error mocked `MouseEvent`
          tagName: 'span',
        },
      })

      expect(result).toBe(false)
    }) */

    it('when isContentEditable', () => {
      const result = shouldIntercept({
        ...defaultEventMock,
        target: {
          // @ts-expect-error mocked `MouseEvent`
          isContentEditable: true,
        },
      })

      expect(result).toBe(false)
    })

    it('when defaultPrevented', () => {
      // @ts-expect-error mocked `MouseEvent`
      const result = shouldIntercept({
        ...defaultEventMock,
        defaultPrevented: true,
      })

      expect(result).toBe(false)
    })

    it('when ctrlKey pressed', () => {
      // @ts-expect-error mocked `MouseEvent`
      const result = shouldIntercept({
        ...defaultEventMock,
        ctrlKey: true,
      })

      expect(result).toBe(false)
    })

    it('when altKey pressed', () => {
      // @ts-expect-error mocked `MouseEvent`
      const result = shouldIntercept({
        ...defaultEventMock,
        altKey: true,
      })

      expect(result).toBe(false)
    })

    it('when metaKey pressed', () => {
      // @ts-expect-error mocked `MouseEvent`
      const result = shouldIntercept({
        ...defaultEventMock,
        metaKey: true,
      })

      expect(result).toBe(false)
    })

    it('when shiftKey pressed', () => {
      // @ts-expect-error mocked `MouseEvent`
      const result = shouldIntercept({
        ...defaultEventMock,
        shiftKey: true,
      })

      expect(result).toBe(false)
    })

    it('when middle mouse button pressed', () => {
      // @ts-expect-error mocked `MouseEvent`
      const result = shouldIntercept({
        ...defaultEventMock,
        which: 2,
      })

      expect(result).toBe(false)
    })

    it('when right mouse button pressed', () => {
      // @ts-expect-error mocked `MouseEvent`
      const result = shouldIntercept({
        ...defaultEventMock,
        which: 3,
      })

      expect(result).toBe(false)
    })

    /* it('when middle mouse button pressed', () => {
      // @ts-expect-error mocked `MouseEvent`
      const result = shouldIntercept({
        ...defaultEventMock,
        button: 1,
      })

      expect(result).toBe(false)
    })

    it('when right mouse button pressed', () => {
      // @ts-expect-error mocked `MouseEvent`
      const result = shouldIntercept({
        ...defaultEventMock,
        button: 2,
      })

      expect(result).toBe(false)
    })

    it('when browser back mouse button pressed', () => {
      // @ts-expect-error mocked `MouseEvent`
      const result = shouldIntercept({
        ...defaultEventMock,
        button: 3,
      })

      expect(result).toBe(false)
    })

    it('when browser forward mouse button pressed', () => {
      // @ts-expect-error mocked `MouseEvent`
      const result = shouldIntercept({
        ...defaultEventMock,
        button: 4,
      })

      expect(result).toBe(false)
    }) */
  })

  describe('should intercept', () => {
    it('with defaults', () => {
      // @ts-expect-error mocked `MouseEvent`
      const result = shouldIntercept(defaultEventMock)

      expect(result).toBe(true)
    })

    it('when no mouse button pressed', () => {
      // @ts-expect-error mocked `MouseEvent`
      const result = shouldIntercept({
        ...defaultEventMock,
        which: 0,
      })

      expect(result).toBe(true)
    })
  })
})
