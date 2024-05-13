/**
 * @description: fork by "@jsxiaosi/utils" v0.0.18
 * @author: 小斯（xiaosi）
 * @license: MIT
 */

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}

export function isUrl(path: string): boolean {
  const reg =
    /^https?:\/\/(([^:/?#]+)(?::([0-9]+))?)(\/[^?#]*)?(\?[^#]*)?(#.*)?$/
  return reg.test(path)
}
