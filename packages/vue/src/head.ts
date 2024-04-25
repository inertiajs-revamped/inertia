import { type DefineComponent, defineComponent } from 'vue'

export type InertiaHead = DefineComponent<{
  title?: string
}>

const Head: InertiaHead = defineComponent({
  props: {
    title: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      provider: this.$headManager.createProvider(),
    }
  },
  beforeUnmount() {
    this.provider.disconnect()
  },
  methods: {
    // @ts-expect-error
    isUnaryTag(node) {
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
    },
    // @ts-expect-error
    renderTagStart(node) {
      node.props = node.props || {}
      node.props.inertia =
        node.props['head-key'] !== undefined ? node.props['head-key'] : ''
      const attrs = Object.keys(node.props).reduce((carry, name) => {
        const value = node.props[name]
        if (['key', 'head-key'].includes(name)) {
          return carry
        } else if (value === '') {
          return carry + ` ${name}`
        } else {
          return carry + ` ${name}="${value}"`
        }
      }, '')
      return `<${node.type}${attrs}>`
    },
    // @ts-expect-error
    renderTagChildren(node) {
      return typeof node.children === 'string'
        ? node.children
        : node.children.reduce(
            // @ts-expect-error
            (html, child) => html + this.renderTag(child),
            ''
          )
    },
    // @ts-expect-error
    isFunctionNode(node) {
      return typeof node.type === 'function'
    },
    // @ts-expect-error
    isComponentNode(node) {
      return typeof node.type === 'object'
    },
    // @ts-expect-error
    isCommentNode(node) {
      return /(comment|cmt)/i.test(node.type.toString())
    },
    // @ts-expect-error
    isFragmentNode(node) {
      return /(fragment|fgt|symbol\(\))/i.test(node.type.toString())
    },
    // @ts-expect-error
    isTextNode(node) {
      return /(text|txt)/i.test(node.type.toString())
    },
    // @ts-expect-error
    renderTag(node) {
      if (this.isTextNode(node)) {
        return node.children
      } else if (this.isFragmentNode(node)) {
        return ''
      } else if (this.isCommentNode(node)) {
        return ''
      }
      let html = this.renderTagStart(node)
      if (node.children) {
        html += this.renderTagChildren(node)
      }
      if (!this.isUnaryTag(node)) {
        html += `</${node.type}>`
      }
      return html
    },
    // @ts-expect-error
    addTitleElement(elements) {
      // @ts-expect-error
      if (this.title && !elements.find((tag) => tag.startsWith('<title'))) {
        elements.push(`<title inertia>${this.title}</title>`)
      }
      return elements
    },
    // @ts-expect-error
    renderNodes(nodes) {
      return this.addTitleElement(
        nodes
          // @ts-expect-error
          .flatMap((node) => this.resolveNode(node))
          // @ts-expect-error
          .map((node) => this.renderTag(node))
          // @ts-expect-error
          .filter((node) => node)
      )
    },
    // @ts-expect-error
    resolveNode(node) {
      if (this.isFunctionNode(node)) {
        return this.resolveNode(node.type())
      } else if (this.isComponentNode(node)) {
        console.warn(
          `Using components in the <Head> component is not supported.`
        )
        return []
      } else if (this.isTextNode(node) && node.children) {
        return node
      } else if (this.isFragmentNode(node) && node.children) {
        // @ts-expect-error
        return node.children.flatMap((child) => this.resolveNode(child))
      } else if (this.isCommentNode(node)) {
        return []
      } else {
        return node
      }
    },
  },
  render() {
    this.provider.update(
      this.renderNodes(this.$slots.default ? this.$slots.default() : [])
    )
  },
})

export default Head
