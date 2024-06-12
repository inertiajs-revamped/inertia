import { existsSync } from 'node:fs'
import { join } from 'node:path'
import laravel from 'laravel-vite-plugin'

export type LaravelPluginConfig = Omit<
  Exclude<Parameters<typeof laravel>[0], string | string[]>,
  'input'
> & {
  input?: string | string[]
}

export interface PluginConfig {
  ui: 'preact' | 'react' | 'vue'
  laravel: LaravelPluginConfig
}

export type ResolvedPlugin = ReturnType<typeof laravel>[]

export type ResolvedPluginConfig = {
  ui: PluginConfig['ui']
  laravel: Required<PluginConfig['laravel']>
}

export default async function plugin(
  options: PluginConfig
): Promise<ResolvedPlugin> {
  const config = resolvePluginConfig(options)

  return [laravel(config.laravel)]
}

const refreshPaths = [
  'app/Livewire/**',
  'app/View/Components/**',
  'lang/**',
  'resources/**',
  'routes/**',
].filter((path) => existsSync(path.replace(/\*\*$/, '')))

function resolvePluginConfig(
  config: PluginConfig
): Required<ResolvedPluginConfig> {
  if (typeof config.ui === 'undefined') {
    throw new Error('@inertiajs-revamped/vite: missing ui configuration.')
  }

  if (config.laravel.refresh === true) {
    config.laravel.refresh = [{ paths: refreshPaths }]
  }

  return {
    ui: config.ui,
    laravel: {
      input:
        config.laravel.input ??
        `resources/application/main.${config.ui === 'vue' ? 'ts' : 'tsx'}`,
      publicDirectory: config.laravel.publicDirectory ?? 'public',
      buildDirectory: config.laravel.buildDirectory ?? 'build',
      ssr:
        config.laravel.ssr ??
        `resources/application/ssr.${config.ui === 'vue' ? 'ts' : 'tsx'}`,
      ssrOutputDirectory: config.laravel.ssrOutputDirectory ?? 'bootstrap/ssr',
      refresh: config.laravel.refresh ?? false,
      hotFile:
        config.laravel.hotFile ??
        join(config.laravel.publicDirectory ?? 'public', 'hot'),
      valetTls: config.laravel.valetTls ?? null,
      detectTls: config.laravel.detectTls ?? config.laravel.valetTls ?? null,
      transformOnServe: config.laravel.transformOnServe ?? ((code) => code),
    },
  }
}
