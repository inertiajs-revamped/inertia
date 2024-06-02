<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useIntegration } from '@/theme/composables/useIntegrations'

const route = useRoute()
const urlParts = route.path.slice(1).split('/')
const adapter = useIntegration(urlParts[1])
const isVue = adapter.componentExt === 'vue' ? 'ts' : 'tsx'
</script>

# Project Structure

## Overview

We follow the convention below for a consistent and organized project architecture.

> [!NOTE]
> This project structure is a common convention but not required.

## Directories and Files

- `public/*` - Static assets & compiled source (fonts, icons, etc.).
- `resources/*` - The frontend source code files.
- `package.json` - The Project manifest.
- `tsconfig.json` - The TypeScript configuration file.
- `vite.config.ts` - The Vite configuration file.

### `resources/`

The `resources` directory contains most of a projects source code:

- `application/` - The entry point files to load application specific environment.
- `components/` - The application components.
- `layouts/` - The application layouts.
- `pages/` - The application pages.
- `types/` - The application TypeScript interfaces or types.
- `views/` - The default `app.blade.php` template and other Blade templates.

## Example Project Tree

> [!TIP]
> Use our preset [starter kit](/guide/getting-started/quick-start) to scaffold a new Inertia.js-Revamped project in a second.

The recommended structure for a typical Inertia.js-Revamped project is as follows:

```text-vue
example-app/
├── public
├── resources/
│   ├── application/
│   │   ├── app.css
│   │   ├── main.{{ isVue }}
│   │   └── ssr.{{ isVue }}
│   ├── components/
│   │   ├── button.{{ adapter.componentExt }}
│   │   └── nav-button.{{ adapter.componentExt }}
│   ├── layouts/
│   │   ├── auth-layout.{{ adapter.componentExt }}
│   │   └── guest-layout.{{ adapter.componentExt }}
│   ├── pages/
│   │   ├── about/
│   │   │   └── index.{{ adapter.componentExt }}
│   │   ├── blog/
│   │   │   ├── index.{{ adapter.componentExt }}
│   │   │   └── archiv.{{ adapter.componentExt }}
│   │   └── error.{{ adapter.componentExt }}
│   ├── types/
│   │   └── inertia-{{ adapter.name }}.d.ts
│   └── views/
│       └── app.blade.php
├── package.json
├── tsconfig.json
└── vite.config.ts
```
