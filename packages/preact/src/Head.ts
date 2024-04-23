import {
  type ComponentChildren,
  type FunctionComponent,
  cloneElement,
} from 'preact'
import { useContext, useEffect, useMemo } from 'preact/hooks'
import HeadContext from './HeadContext'

export type InertiaHeadProps = {
  title?: string
  children?: ComponentChildren
}

export type InertiaHead = FunctionComponent<InertiaHeadProps>

const Head: InertiaHead = function ({ children, title }) {
  const headManager = useContext(HeadContext)
  const provider = useMemo(() => headManager?.createProvider(), [headManager])

  useEffect(() => {
    return () => {
      provider?.disconnect()
    }
  }, [provider])

  // @ts-expect-error
  function isUnaryTag(node) {
    return (
      [
        'area',
        'base',
        'br',
        'col',
        'embed',
        'hr',
        'img',
        'input',
        'keygen',
        'link',
        'meta',
        'param',
        'source',
        'track',
        'wbr',
      ].indexOf(node.type) > -1
    )
  }

  // @ts-expect-error
  function renderTagStart(node) {
    const attrs = Object.keys(node.props).reduce((carry, name) => {
      if (['head-key', 'children', 'dangerouslySetInnerHTML'].includes(name)) {
        return carry
      }
      const value = node.props[name]
      if (value === '') {
        return carry + ` ${name}`
      } else {
        return carry + ` ${name}="${value}"`
      }
    }, '')
    return `<${node.type}${attrs}>`
  }

  // @ts-expect-error
  function renderTagChildren(node) {
    return typeof node.props.children === 'string'
      ? node.props.children
      : // @ts-expect-error
        node.props.children.reduce((html, child) => html + renderTag(child), '')
  }

  // @ts-expect-error
  function renderTag(node) {
    let html = renderTagStart(node)
    if (node.props.children) {
      html += renderTagChildren(node)
    }
    if (node.props.dangerouslySetInnerHTML) {
      html += node.props.dangerouslySetInnerHTML.__html
    }
    if (!isUnaryTag(node)) {
      html += `</${node.type}>`
    }
    return html
  }

  // @ts-expect-error
  function ensureNodeHasInertiaProp(node) {
    return cloneElement(node, {
      inertia:
        node.props['head-key'] !== undefined ? node.props['head-key'] : '',
    })
  }

  // @ts-expect-error
  function renderNode(node) {
    return renderTag(ensureNodeHasInertiaProp(node))
  }

  // @ts-expect-error
  function renderNodes(nodes) {
    const computed = (Array.isArray(nodes) ? nodes : [nodes])
      .filter((node) => node)
      .map((node) => renderNode(node))
    if (title && !computed.find((tag) => tag.startsWith('<title'))) {
      computed.push(`<title inertia>${title}</title>`)
    }
    return computed
  }

  provider?.update(renderNodes(children))

  return null
}
export default Head
