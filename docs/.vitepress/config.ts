import { URL, fileURLToPath } from 'node:url'
import { searchForWorkspaceRoot } from 'vite'
import { defineConfig } from 'vitepress'
import {
  type MarkdownItStepperOptions,
  markdownItStepper,
} from 'vitepress-markdown-it-stepper'
import { defaultConfig, headConfig, navConfig, sidebarConfig } from './configs'

const isProduction = process.env.NODE_ENV === 'production'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: defaultConfig.title,
  description: defaultConfig.description,
  srcDir: 'src',
  outDir: './dist',
  appearance: true,
  lastUpdated: true,
  cleanUrls: true,
  srcExclude: ['**/_templates'],
  head: headConfig,
  rewrites: {
    'integrations/vue/hooks/:page*': 'integrations/vue/composables/:page*',
  },
  themeConfig: {
    outline: {
      level: [2, 3],
    },
    sidebar: sidebarConfig,
    nav: navConfig,
    socialLinks: [
      { icon: 'discord', link: defaultConfig.discord },
      { icon: 'github', link: defaultConfig.github.repo },
    ],
    editLink: {
      text: 'Edit this page on GitHub',
      pattern: ({ filePath }) => {
        if (
          filePath.startsWith('integrations/') &&
          !filePath.startsWith('integrations/laravel')
        ) {
          const regex = /^integrations\/(?:preact|react|vue)\/(?:(.*))/
          const match = filePath.match(regex)

          return `https://github.com/inertiajs-revamped/inertia/tree/main/docs/src/_templates/adapter/${match?.[1]}`
        } else {
          return `https://github.com/inertiajs-revamped/inertia/tree/main/docs/src/${filePath}`
        }
      },
    },
    footer: {
      message: `Released under the <a href="${defaultConfig.github.repo}/blob/main/LICENSE">MIT License</a>.`,
      copyright: `Copyright © ${new Date().getFullYear()} <a href="${
        defaultConfig.url
      }">${defaultConfig.title}</a> & Contributors.`,
    },
    ...(isProduction && {
      search: {
        provider: 'local',
      },
    }),
  },
  ...(isProduction && {
    ignoreDeadLinks: true,
    sitemap: {
      hostname: defaultConfig.url,
    },
  }),
  vite: {
    optimizeDeps: {
      // vitepress is aliased with replacement `join(DIST_CLIENT_PATH, '/index')`
      // This needs to be excluded from optimization
      exclude: ['vitepress'],
    },
    server: {
      fs: {
        allow: [searchForWorkspaceRoot(process.cwd())],
      },
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity,
    },
    resolve: {
      preserveSymlinks: true,
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./', import.meta.url)),
        },
        {
          find: /^.*\/VPFeature\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/VPFeature.vue', import.meta.url)
          ),
        },
      ] /* {
        '@': fileURLToPath(new URL('./', import.meta.url)),
        
      }, */,
    },
  },
  markdown: {
    config: (md) => {
      md.use<MarkdownItStepperOptions>(markdownItStepper)
    },
  },
})
