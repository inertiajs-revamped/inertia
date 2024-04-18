# @inertiajs-revamped/presets

> Laravel presets for Inertia.js-Revamped

## Documentation

View the docs (currently in development) at [inertiajs-revamped.com](https://inertiajs-revamped.com).

## Usage

Use `@preset/cli` to install Inertia.js-Revamped in a fresh Laravel application.

```bash
npx @preset/cli apply inertiajs-revamped/inertia --ui=<preact|react|vue>
```

By default preset installs Inertia.js-Revamped, a UI framework of your choice, configures [Vite](https://vitejs.dev) with [TypeScript](https://www.typescriptlang.org/), and enables [SSR](https://inertiajs-revamped.com/advanced-usage/server-side-rendering).

### Options

#### `--no-typescript`

TypeScript variant can be disabled by passing the `--no-typescript` flag.

#### `--no-ssr`

SSR can be disabled by passing the `--no-ssr` flag.

## License

Licensed under the [MIT license](https://github.com/inertiajs-revamped/inertia/blob/main/packages/core/LICENSE).
