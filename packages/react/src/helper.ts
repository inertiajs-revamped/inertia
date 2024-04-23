import type { Expand } from '@inertiajs-revamped/core'
/**
 * Experimental
 *
 * https://lionhat.co/posts/persistent-layouts-nextjs.html
 * */
import {
  type ComponentPropsWithoutRef,
  type ComponentType,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  createElement,
} from 'react'

export interface DefaultLayoutProps {
  title?: string
}

export interface LayoutProps extends PropsWithChildren<DefaultLayoutProps> {}

export type WithLayout = (
  layout: ComponentType<Expand<Omit<LayoutProps, 'children'>>>,
  props?: ComponentPropsWithoutRef<typeof layout>
) => (page: ReactElement) => ReactNode

const withLayout: WithLayout = (Layout, props) => (page) =>
  createElement(Layout, { ...props }, page)

export default withLayout
