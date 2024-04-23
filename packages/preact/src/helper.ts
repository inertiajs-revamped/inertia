import type { Expand } from '@inertiajs-revamped/core'
/**
 * Experimental
 *
 * https://lionhat.co/posts/persistent-layouts-nextjs.html
 * */
import {
  type ComponentChildren,
  type ComponentProps,
  type ComponentType,
  type VNode,
  createElement,
} from 'preact'

export interface DefaultLayoutProps {
  title?: string
  children?: ComponentChildren
}

export interface LayoutProps extends DefaultLayoutProps {}

export type WithLayout = (
  layout: ComponentType<Expand<Omit<LayoutProps, 'children'>>>,
  props?: ComponentProps<typeof layout>
) => (page: VNode) => ComponentChildren

const withLayout: WithLayout = (Layout, props) => (page) =>
  createElement(Layout, { ...props }, page)

export default withLayout
