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

export type LayoutProps = PropsWithChildren<{
  title?: string
}>

export type WithLayout = (
  layout: ComponentType<Omit<LayoutProps, 'children'>>,
  props?: ComponentPropsWithoutRef<typeof layout>
) => (page: ReactElement) => ReactNode

const withLayout: WithLayout = (Layout, props) => (page) =>
  createElement(Layout, { ...props }, page)

export default withLayout
