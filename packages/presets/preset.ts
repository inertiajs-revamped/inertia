const packageManager = ['NPM', 'PNPM', 'Yarn', 'Bun'] as const
const templates = ['default', 'breeze', 'pingcrm']
const ui = ['Preact', 'React', 'Vue'] as const

export interface Options {
  /**
   * Choose your package manager (default: `undefined`)
   */
  packageManager?: Lowercase<(typeof packageManager)[number]>

  /**
   * Choose your template (default: `undefined`)
   */
  template?: Lowercase<(typeof templates)[number]>

  /**
   * Choose your prefered UI-Framework (default: `undefined`)
   */
  ui?: Lowercase<(typeof ui)[number]>

  /**
   * Choose whether to use TypeScript or JavaScript (default: `true`)
   */
  typescript?: boolean

  /**
   * Choose whether to enable/disable SSR (default: `true`)
   */
  ssr?: boolean

  /**
   * Use for development with Inertia.js-Revamped workspace only (default: `false`)
   * @see {@link https://github.com/inertiajs-revamped/inertia/blob/main/CONTRIBUTING.md#sandbox-environment-experimental}
   */
  sandbox?: boolean
}

export default definePreset<Options>({
  name: 'Inertia.js-Revamped',
  options: {
    sandbox: false,
  },
  postInstall: ({ hl }) => [
    `Run the development server with ${hl('npm run dev')}`,
    `Edit your entry points in ${hl('resources/application')}`,
    `Edit your pages in ${hl('resources/pages')}`,
  ],
  handler: async ({ options, prompts }) => {
    const opts = {} as Options

    if (options.sandbox) {
      Object.assign(opts, {
        packageManager: options.packageManager || 'pnpm',
        template: options.template || 'breeze',
        ui: options.ui || 'react',
        typescript: options.typescript ?? true,
        ssr: options.ssr || true,
        sandbox: true,
      }) satisfies Options

      await installSandbox()
    } else {
      await initialPrompts({ options, prompts })

      Object.assign(opts, {
        packageManager: options.packageManager ?? prompts.packageManager,
        template: options.template || prompts.template,
        ui: options.ui || prompts.ui,
        typescript: !!(options.typescript || prompts.variant === 'ts'),
        ssr: !!(options.ssr || prompts.ssr === 'enabled'),
        sandbox: false,
      }) satisfies Options

      await installPackages({
        title: 'Installing PHP dependencies with Composer',
        for: 'php',
        packages: ['inertiajs-revamped/laravel'],
      })
    }

    if (!opts.packageManager) {
      throw new Error(
        'You must specify a package manager (e.g. "npm", "yarn", "pnpm", or "bun").'
      )
    }

    if (!opts.ui) {
      throw new Error(
        'You must specify a UI framework (e.g. "preact", "react", or "vue").'
      )
    }

    if (!opts.template) {
      throw new Error(
        'You must specify a template (e.g. "default", "breeze", or "pingcrm").'
      )
    }

    if (typeof opts.typescript === 'undefined') {
      throw new Error(
        'Please choose whether you want to use TypeScript or JavaScript.'
      )
    }

    if (typeof opts.ssr === 'undefined') {
      throw new Error(
        'Please choose whether to enable or disable Server-Side Rendering (SSR).'
      )
    }

    if (opts.template === 'breeze') {
      await installBreeze(opts)
    } else if (opts.template === 'pingcrm') {
      await installPingCRM(opts)
    } else {
      await installInertiaRevamped(opts)
    }
  },
})

async function initialPrompts({
  options,
  prompts,
}: { options: Options; prompts: Record<string, string | undefined> }) {
  if (typeof options.packageManager === 'undefined') {
    await prompt({
      title: 'Choose your package manager',
      name: 'packageManager',
      text: '(Press <up> / <down> to select, <return> to confirm)',
      choices: packageManager.map((manager) => {
        return { title: manager, value: manager.toLowerCase() }
      }),
      initial: 0,
    })
  }

  if (typeof options.ui === 'undefined') {
    await prompt({
      title: 'Choose your UI framework',
      name: 'ui',
      text: '(Press <up> / <down> to select, <return> to confirm)',
      choices: ui.map((framework) => {
        return { title: framework, value: framework.toLowerCase() }
      }),
      initial: 0,
    })
  }

  if (
    typeof options.template === 'undefined' ||
    (options.ui !== 'preact' && prompts.ui !== 'preact')
  ) {
    await prompt({
      title: 'Choose your starter template',
      name: 'template',
      text: '(Press <up> / <down> to select, <return> to confirm)',
      choices: [
        { title: 'default', value: 'default' },
        { title: 'breeze', value: 'breeze' },
        { title: 'pingcrm', value: 'pingcrm' },
      ],
      initial: 0,
    })
  }

  if (typeof options.typescript === 'undefined') {
    await prompt({
      title: 'Choose your variant',
      name: 'variant',
      text: '(Press <up> / <down> to select, <return> to confirm)',
      choices: [
        { title: 'TypeScript', value: 'ts' },
        { title: 'JavaScript', value: 'js' },
      ],
      initial: 0,
    })
  }

  if (typeof options.ssr === 'undefined') {
    await prompt({
      title: 'Choose to enable/disable SSR',
      name: 'ssr',
      text: '(Press <up> / <down> to select, <return> to confirm)',
      choices: [
        { title: 'Enable SSR', value: 'enabled' },
        { title: 'Disable SSR', value: 'disabled' },
      ],
      initial: 0,
    })
  }
}

async function installSandbox() {
  await group({
    title: 'Installing PHP Sandbox Dependencies',
    handler: async () => {
      await deletePaths({
        paths: ['node_modules', 'package.json'],
      })

      await executeCommand({
        title: 'Installing PHP Dependencies',
        command: 'composer',
        arguments: ['create-project', 'laravel/laravel:^11.0', '.'],
        ignoreExitCode: false,
      })

      await executeCommand({
        title: 'Linking Laravel File Storage',
        command: 'php',
        arguments: ['artisan', 'storage:link'],
        ignoreExitCode: true,
      })

      await executeCommand({
        title: 'Generating Laravel Application Key',
        command: 'php',
        arguments: ['artisan', 'key:generate'],
      })

      await editFiles({
        title: 'Updating Laravel composer.json',
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
        title: 'Updating PHP dependencies with Composer',
        command: 'composer',
        arguments: ['update'],
        ignoreExitCode: true,
      })
    },
  })
}

async function installBreeze({
  packageManager,
  template,
  ui,
  typescript,
  sandbox,
  ssr,
}: Options) {
  await group({
    title: 'Installing Breeze Scaffolding',
    handler: async () => {
      await deletePaths({
        title: 'Cleaning Up Default Files & Content',
        paths: ['resources', 'vite.config.js'],
      })

      await installPackages({
        title: 'Installing PHP dependencies with Composer',
        for: 'php',
        packages: ['laravel/sanctum:^4.0'],
      })

      await executeArtisanCommands()

      await extractTemplates({
        title: 'Extracting Breeze/base Templates',
        templates: sandbox
          ? 'templates/breeze'
          : 'packages/presets/templates/breeze',
        from: 'base',
      })

      await extractTemplates({
        title: `Extracting Breeze/${ui} Templates`,
        templates: sandbox
          ? 'templates/breeze'
          : 'packages/presets/templates/breeze',
        from: typescript ? `${ui}-ts` : ui,
      })

      await cleanUp({ ui, typescript, ssr, sandbox })

      await installNodeDependencies({
        packageManager,
        template,
        ui,
        typescript,
        ssr,
        sandbox,
      })
    },
  })
}

async function executeArtisanCommands() {
  await executeCommand({
    title: 'Publishing Inertia.js-Revamped Middleware',
    command: 'php',
    arguments: ['artisan', 'inertia:middleware'],
  })

  await executeCommand({
    title: 'Publishing Inertia.js-Revamped Configuration',
    command: 'php',
    arguments: [
      'artisan',
      'vendor:publish',
      '--provider=Inertia\\ServiceProvider',
    ],
  })

  await editFiles({
    title: 'Registering Inertia.js-Revamped Middleware',
    files: 'bootstrap/app.php',
    operations: [
      {
        skipIf: (content) =>
          content.includes('use App\\Http\\Middleware\\HandleInertiaRequests;'),
        type: 'add-line',
        position: 'after',
        match: /use Illuminate\\Foundation\\Application;/,
        lines: 'use App\\Http\\Middleware\\HandleInertiaRequests;',
      },
      {
        skipIf: (content) =>
          content.includes(
            'use Illuminate\\Http\\Middleware\\AddLinkHeadersForPreloadedAssets;'
          ),
        type: 'add-line',
        position: 'after',
        match: /use Illuminate\\Foundation\\Configuration\\Middleware;/,
        lines:
          'use Illuminate\\Http\\Middleware\\AddLinkHeadersForPreloadedAssets;',
      },
      {
        skipIf: (content) => content.includes('HandleInertiaRequests::class,'),
        type: 'remove-line',
        match: /->withMiddleware\(function \(Middleware \$middleware\) {/,
        count: 1,
        start: 1,
      },
      {
        skipIf: (content) => content.includes('HandleInertiaRequests::class,'),
        type: 'add-line',
        position: 'after',
        match: /->withMiddleware\(function \(Middleware \$middleware\) {/,
        indent: '        ',
        lines: [
          '$middleware->web(append: [',
          '    HandleInertiaRequests::class,',
          '    AddLinkHeadersForPreloadedAssets::class,',
          ']);',
        ],
      },
    ],
  })
}

async function installPingCRM({
  packageManager,
  template,
  ui,
  typescript,
  ssr,
  sandbox,
}: Options) {
  await group({
    title: 'Installing PingCRM Scaffolding',
    handler: async () => {
      await deletePaths({
        title: 'Cleaning Up Default Files & Content',
        paths: [
          'database/database.sqlite',
          'public/favicon.ico',
          'resources',
          'tests',
          'vite.config.js',
        ],
      })

      await installPackages({
        title: 'Installing PHP dependencies with Composer',
        for: 'php',
        packages: ['laravel/sanctum:^4.0', 'league/glide-symfony:^2.0'],
      })

      await executeArtisanCommands()

      await extractTemplates({
        title: 'Extracting PingCRM Templates',
        templates: sandbox
          ? 'templates/pingcrm'
          : 'packages/presets/templates/pingcrm',
        from: 'base',
      })

      await extractTemplates({
        title: `Extracting PingCRM/${ui} Templates`,
        templates: sandbox
          ? 'templates/pingcrm'
          : 'packages/presets/templates/pingcrm',
        from: typescript ? `${ui}-ts` : ui,
      })

      await editFiles({
        title: 'Updating Environment Configuration',
        files: '.env',
        operations: [
          {
            skipIf: (content) => content.includes('SESSION_DRIVER=file'),
            type: 'update-content',
            update: (r) =>
              r.replace('SESSION_DRIVER=database', 'SESSION_DRIVER=file'),
          },
          {
            skipIf: (content) => content.includes('CACHE_STORE=file'),
            type: 'update-content',
            update: (r) =>
              r.replace('CACHE_STORE=database', 'CACHE_STORE=file'),
          },
          {
            skipIf: (content) => content.includes('QUEUE_CONNECTION=sync'),
            type: 'update-content',
            update: (r) =>
              r.replace('QUEUE_CONNECTION=database', 'QUEUE_CONNECTION=sync'),
          },
        ],
      })

      await executeCommand({
        title: 'Creating SQLite database',
        command: 'touch',
        arguments: ['database/database.sqlite'],
      })

      await executeCommand({
        title: 'Migrating PingCRM database',
        command: 'php',
        arguments: ['artisan', 'migrate'],
      })

      await executeCommand({
        title: 'Seeding PingCRM database',
        command: 'php',
        arguments: ['artisan', 'db:seed'],
      })

      await cleanUp({ ui, typescript, ssr, sandbox })

      await installNodeDependencies({
        packageManager,
        template,
        ui,
        typescript,
        ssr,
        sandbox,
      })
    },
  })
}

async function installInertiaRevamped({
  packageManager,
  template,
  ui,
  typescript,
  ssr,
  sandbox,
}: Options) {
  await group({
    title: 'Installing Inertia.js-Revamped Scaffolding',
    handler: async () => {
      await deletePaths({
        title: 'Cleaning Up Default Files & Content',
        paths: ['resources', 'vite.config.js'],
      })

      await extractTemplates({
        title: 'Extracting Inertia.js-Revamped Templates',
        templates: sandbox
          ? 'templates/default'
          : 'packages/presets/templates/default',
        from: typescript ? `${ui}-ts` : ui,
      })

      await executeCommand({
        title: 'Publishing Inertia.js-Revamped Middleware',
        command: 'php',
        arguments: ['artisan', 'inertia:middleware'],
      })

      await executeCommand({
        title: 'Publishing Inertia.js-Revamped Configuration',
        command: 'php',
        arguments: [
          'artisan',
          'vendor:publish',
          '--provider=Inertia\\ServiceProvider',
        ],
      })

      await editFiles({
        title: 'Registering Inertia.js-Revamped Middleware',
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
            type: 'remove-line',
            match: /->withMiddleware\(function \(Middleware \$middleware\) {/,
            count: 1,
            start: 1,
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
        title: 'Updating Inertia.js-Revamped Middleware',
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

      await editFiles({
        title: 'Updating Inertia.js-Revamped Routes',
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
    },
  })

  await cleanUp({ ui, typescript, ssr, sandbox })

  await installNodeDependencies({
    packageManager,
    template,
    ui,
    typescript,
    ssr,
    sandbox,
  })
}

async function installNodeDependencies({
  packageManager,
  template,
  ui,
  typescript,
  ssr,
  sandbox,
}: Options) {
  await group({
    title: 'Installing Node.js Dependencies',
    handler: async () => {
      await editFiles({
        title: 'Updating package.json Dependencies',
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
        title: 'Installing Node.js devDependencies',
        for: 'node',
        ...(sandbox && { packageManager }),
        packages: [
          // default
          template === 'breeze' && ui === 'react' ? '@headlessui/react' : '',
          sandbox
            ? `@inertiajs-revamped/${ui}@workspace:*`
            : `@inertiajs-revamped/${ui}`,
          template === 'breeze' ? '@tailwindcss/forms' : '',
          typescript ? '@types/node' : '',
          template === 'breeze' || template === 'pingcrm' ? 'autoprefixer' : '',
          'laravel-vite-plugin',
          template === 'pingcrm' ? 'nanoid' : '',
          'postcss',
          template === 'pingcrm' ? 'postcss-import' : '',
          template === 'breeze' || template === 'pingcrm' ? 'tailwindcss' : '',
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
        title: 'Installing Node.js Dependencies',
        for: 'node',
        ...(sandbox && { packageManager }),
        install: ['axios'],
      })
    },
  })
}

async function cleanUp({ ui, typescript, ssr, sandbox }: Options) {
  await group({
    title: 'Cleaning Up Files & Content',
    handler: async () => {
      if (!ssr) {
        await editFiles({
          title: 'Cleaning Up SSR Config',
          files: 'config/inertia.php',
          operations: [
            {
              skipIf: (content) => content.includes("'enabled' => false"),
              type: 'update-content',
              update: (content) =>
                content.replace("'enabled' => true", "'enabled' => false"),
            },
          ],
        })

        await editFiles({
          title: 'Cleaning Up Vite-Config',
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

        await editFiles({
          title: 'Cleaning Up SSR Templates',
          files: typescript
            ? 'resources/application/main.tsx'
            : 'resources/application/main.jsx',
          operations: [
            {
              skipIf: (content) =>
                content.includes(
                  "import { createRoot } from 'react-dom/client'"
                ) || ui !== 'react',
              type: 'update-content',
              update: (r) => r.replace('hydrateRoot', 'createRoot'),
            },
            {
              skipIf: (content) =>
                content.includes("import { render } from 'preact'") ||
                ui !== 'preact',
              type: 'update-content',
              update: (r) => r.replace('hydrate', 'render'),
            },
            {
              skipIf: (content) =>
                content.includes('createRoot(') || ui !== 'react',
              type: 'update-content',
              update: (r) => r.replace('hydrateRoot(', 'createRoot('),
            },
            {
              skipIf: (content) =>
                content.includes('render(') || ui !== 'preact',
              type: 'update-content',
              update: (r) => r.replace('hydrate(', 'render('),
            },
          ],
        })

        await deletePaths({
          title: 'Cleaning Up SSR Files',
          paths: [
            typescript
              ? 'resources/application/ssr.tsx'
              : 'resources/application/ssr.jsx',
          ],
        })
      }

      if (typescript) {
        await renamePaths({
          title: 'Renaming tsconfig.json',
          paths: '_tsconfig.json',
          transformer: ({ base }) => `${base.slice(1)}`,
        })

        await editFiles({
          title: 'Cleaning Up TypeScript Files',
          files: [
            'resources/**/*.{ts,tsx}',
            'tailwind.config.ts',
            'vite.config.ts',
          ],
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
          title: 'Updating package.json',
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

        if (ssr) {
          await editFiles({
            title: 'Adding Development Features',
            files: typescript
              ? 'resources/application/main.tsx'
              : 'resources/application/main.jsx',
            operations: [
              {
                skipIf: (content) =>
                  content.includes('{ createRoot, hydrateRoot }') ||
                  ui !== 'react',
                type: 'update-content',
                update: (r) =>
                  r.replace('{ hydrateRoot }', '{ createRoot, hydrateRoot }'),
              },
              {
                skipIf: (content) =>
                  content.includes('if(import.meta.env.DEV) {') ||
                  ui !== 'react',
                type: 'add-line',
                position: 'before',
                match: /hydrateRoot\(/,
                indent: 4,
                lines: [
                  'if (import.meta.env.DEV) {',
                  '  createRoot(el!).render(',
                  '    <StrictMode>',
                  '      <App {...props} />',
                  '    </StrictMode>',
                  '  )',
                  '  return',
                  '}',
                ],
              },
            ],
          })
        }
      }
    },
  })
}
