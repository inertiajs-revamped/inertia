// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

import BaseIcon from './components/BaseIcon.vue'
import Framework from './components/Framework.vue'
import Frameworks from './components/Frameworks.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Framework', Framework)
    app.component('Frameworks', Frameworks)
    app.component('BaseIcon', BaseIcon)
  },
} satisfies Theme
