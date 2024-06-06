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
      pattern: `${defaultConfig.github.repo}/tree/main/docs/src/:path`,
      text: 'Edit this page on GitHub',
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
    // ...
    config: (md) => {
      // https://github.com/vuejs/docs/blob/e276daba15586ca2f993661cc0d7fe9ce84954d7/.vitepress/config.ts#L745C7-L745C60
      // @ts-expect-error - broken type output in vitepress
      md.use<MarkdownItStepperOptions>(markdownItStepper)
    },
  },
})
