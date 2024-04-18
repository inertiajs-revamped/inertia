export interface Options {
  /**
   * Use for development with Inertia.js-Revamped workspace only (defaults: `false`)
   */
  sandbox: boolean

  /**
   * Exclude SSR from the preset installation (defaults: `true`)
   */
  ssr: boolean

  /**
   * Exclude TypeScript from the preset installation (defaults: `true`)
   */
  typescript: boolean

  /**
   * Choose the prefered UI-Framework for the preset installation (defaults: `undefined`)
   */
  ui: 'preact' | 'react' | 'vue' | undefined
}

export default definePreset<Options>({
  name: 'inertia-js-revamped',
  options: {
    sandbox: false,
    ssr: true,
    typescript: true,
    ui: undefined,
  },
  handler: async ({ options }) => {
    if (!options.ui) {
      throw new Error(
        'Please provide a value for the required `ui` flag: `--ui preact|react|vue`'
      )
    }

    await installInertiaRevamped(options)
  },
})

async function installInertiaRevamped({
  sandbox,
  ssr,
  typescript,
  ui,
}: Options) {
  if (sandbox) {
    await group({
      title: 'install PHP sandbox dependencies',
      handler: async () => {
        await deletePaths({
          paths: ['node_modules', 'package.json'],
        })

        await executeCommand({
          title: 'install PHP dependencies',
          command: 'composer',
          arguments: ['create-project', 'laravel/laravel:^11.0', '.'],
          ignoreExitCode: false,
        })

        await executeCommand({
          title: 'link Laravel file storage',
          command: 'php',
          arguments: ['artisan', 'storage:link'],
          ignoreExitCode: true,
        })

        await executeCommand({
          title: 'generate application key',
          command: 'php',
          arguments: ['artisan', 'key:generate'],
        })

        await editFiles({
          title: 'update composer.json',
          files: 'composer.json',
          operations: [
            {
              type: 'edit-json',
              delete: ['repositories'],
            },
            {
              type: 'edit-json',
              merge: {
                repositories: [
                  {
                    type: 'path',
                    url: '../../packages/laravel',
                    options: { symlink: true },
                  },
                ],
              },
            },
            {
              skipIf: (content) =>
                content.includes('"inertiajs-revamped/laravel": "@dev"'),
              type: 'edit-json',
              merge: {
                require: { 'inertiajs-revamped/laravel': '@dev' },
              },
            },
          ],
        })

        await executeCommand({
          title: 'update PHP dependencies',
          command: 'composer',
          arguments: ['update'],
          ignoreExitCode: true,
        })
      },
    })
  } else {
    await installPackages({
      title: 'install PHP dependencies',
      for: 'php',
      packages: ['inertiajs-revamped/laravel'],
    })
  }

  await group({
    title: 'install Inertia.js-Revamped scaffolding',
    handler: async () => {
      await deletePaths({
        title: 'remove some default files & folders',
        paths: ['resources', 'vite.config.js'],
      })

      await extractTemplates({
        title: 'extract templates',
        from: typescript ? `${ui}-ts` : ui,
      })

      await executeCommand({
        title: 'publish Inertia.js-Revamped configuration',
        command: 'php',
        arguments: [
          'artisan',
          'vendor:publish',
          '--provider=Inertia\\ServiceProvider',
        ],
      })

      await executeCommand({
        title: 'publish Inertia.js-Revamped middleware',
        command: 'php',
        arguments: ['artisan', 'inertia:middleware'],
      })

      await editFiles({
        title: 'register Inertia.js-Revamped middleware',
        files: 'bootstrap/app.php',
        operations: [
          {
            skipIf: (content) =>
              content.includes(
                'use App\\Http\\Middleware\\HandleInertiaRequests;'
              ),
            type: 'add-line',
            position: 'after',
            match: /use Illuminate\\Foundation\\Configuration\\Middleware;/,
            lines: 'use App\\Http\\Middleware\\HandleInertiaRequests;',
          },
          {
            skipIf: (content) =>
              content.includes('HandleInertiaRequests::class,'),
            type: 'add-line',
            position: 'after',
            match: /->withMiddleware\(function \(Middleware \$middleware\) {/,
            indent: '        ',
            lines: [
              '$middleware->web(append: [',
              '    HandleInertiaRequests::class,',
              ']);',
            ],
          },
        ],
      })

      await editFiles({
        title: 'update Inertia.js-Revamped middleware',
        files: 'app/Http/Middleware/HandleInertiaRequests.php',
        operations: [
          {
            type: 'remove-line',
            match: /array_merge\(parent::share/,
            count: 1,
            start: 1,
          },
          {
            type: 'add-line',
            position: 'after',
            match: /array_merge\(parent::share/,
            indent: '            ',
            lines: [
              "'versions' => [",
              "    'php' => PHP_VERSION,",
              "    'laravel' => \\Illuminate\\Foundation\\Application::VERSION",
              '],',
            ],
          },
        ],
      })

      if (ssr) {
        await editFiles({
          title: 'register Inertia.js-Revamped pages',
          files: 'config/inertia.php',
          operations: [
            {
              skipIf: (content) => content.includes(`'enabled' => true`),
              type: 'update-content',
              update: (content) =>
                content.replace(`'enabled' => false`, `'enabled' => true`),
            },
          ],
        })
      }

      await editFiles({
        title: 'update route file',
        files: 'routes/web.php',
        operations: [
          {
            skipIf: (content) => content.includes('use Inertia\\Inertia;'),
            type: 'add-line',
            position: 'before',
            match: /use Illuminate\\Support\\Facades\\Route;/,
            lines: ['use Inertia\\Inertia;'],
          },
          {
            skipIf: (content) => content.includes("Inertia::render('home')"),
            type: 'update-content',
            update: (r) =>
              r.replace("view('welcome')", "Inertia::render('home')"),
          },
          {
            skipIf: (content) => content.includes("Inertia::render('example')"),
            type: 'add-line',
            position: 'append',
            lines: [
              "Route::get('/example', function () {",
              "    return Inertia::render('example');",
              '});',
            ],
          },
        ],
      })

      if (!ssr) {
        await editFiles({
          title: 'clean up SSR',
          files: typescript ? 'vite.config.ts' : 'vite.config.js',
          operations: [
            {
              type: 'remove-line',
              match: /ssr\: \'resources\/application\/ssr/,
              start: 0,
              count: 1,
            },
          ],
        })
      }

      if (typescript) {
        await renamePaths({
          paths: '_tsconfig.json',
          transformer: ({ base }) => `${base.slice(1)}`,
        })

        await editFiles({
          title: 'clean up TypeScript files',
          files: ['resources/**/*.{ts,tsx}', 'vite.config.ts'],
          operations: [
            {
              type: 'remove-line',
              match: /^\/\/ \@ts-nocheck$/,
              start: 0,
              count: 1,
            },
          ],
        })
      }

      if (sandbox) {
        await editFiles({
          title: 'update package.json',
          files: 'package.json',
          operations: [
            {
              type: 'edit-json',
              merge: {
                name: `@inertiajs-revamped/sandbox-${ui}`,
              },
            },
          ],
        })
      }
    },
  })

  await group({
    title: 'install Node.js dependencies',
    handler: async () => {
      await editFiles({
        title: 'update package.json',
        files: 'package.json',
        operations: [
          { type: 'edit-json', delete: ['scripts', 'devDependencies'] },
          {
            type: 'edit-json',
            merge: {
              scripts: {
                dev: 'vite',
                build: 'vite build',
                ...(ssr && { 'build:ssr': 'vite build --ssr' }),
                ...(ssr && { 'build:prod': 'vite build && vite build --ssr' }),
                ...(ssr && {
                  preview: 'npm run build:prod && node bootstrap/ssr/ssr.mjs',
                }),
                clean: 'rm -rf public/build bootstrap/ssr',
                ...(sandbox && {
                  'sandbox:init': `preset apply ../../packages/presets --dev true --ui ${ui}`,
                }),
                ...(sandbox && {
                  'bundle-size': 'npx vite-bundle-visualizer',
                }),
              },
            },
          },
        ],
      })

      await installPackages({
        title: 'install Node.js devDependencies',
        for: 'node',
        ...(sandbox && { packageManager: 'pnpm' }),
        packages: [
          // default
          sandbox
            ? `@inertiajs-revamped/${ui}@workspace:*`
            : `@inertiajs-revamped/${ui}`,
          typescript ? '@types/node' : '',
          'laravel-vite-plugin',
          'postcss',
          typescript ? 'typescript' : '',
          'vite',
          // preact
          ...(ui === 'preact'
            ? [
                '@babel/core',
                '@babel/plugin-transform-react-jsx',
                '@preact/preset-vite',
                'preact',
                ssr ? 'preact-render-to-string' : '',
              ]
            : []),
          // react
          ...(ui === 'react'
            ? [
                typescript ? '@types/react' : '',
                typescript ? '@types/react-dom' : '',
                '@vitejs/plugin-react',
                'react',
                'react-dom',
              ]
            : []),
          // vue
          ...(ui === 'vue'
            ? ['@vitejs/plugin-vue', ssr ? '@vue/server-renderer' : '', 'vue']
            : []),
        ],
        dev: true,
      })

      await installPackages({
        title: 'install dependencies',
        for: 'node',
        ...(sandbox && { packageManager: 'pnpm' }),
        install: ['axios'],
      })
    },
  })
}
