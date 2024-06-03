// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'vitepress-markdown-it-stepper/theme'
import './style.css'

import { integrations } from '@/data/integrations'

import DropdownLayout from './layouts/DropdownLayout.vue'

import AdapterWrapper from './components/AdapterWrapper.vue'
import BaseIcon from './components/BaseIcon.vue'
import Card from './components/Card.vue'

export default {
  extends: DefaultTheme,
  Layout: DropdownLayout,
  enhanceApp({ app }) {
    app.provide('integrations', integrations)
    app.component('AdapterWrapper', AdapterWrapper)
    app.component('BaseIcon', BaseIcon)
    app.component('Card', Card)
    app.config.errorHandler = (_err, _instance, _info) => {
      if (typeof window !== 'undefined') {
        window.localStorage.clear()
      }
    }
  },
} satisfies Theme
