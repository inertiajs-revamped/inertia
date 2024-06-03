<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useIntegration } from '@/theme/composables/useIntegrations'

const route = useRoute()
const urlParts = route.path.slice(1).split('/')
const adapter = useIntegration(urlParts[1])
</script>

# Pages

When building applications using Inertia, each page in your application typically has its own controller / route and a corresponding JavaScript component. This allows you to retrieve just the data necessary for that page - no API required.

In addition, all of the data needed for the page can be retrieved before the page is ever rendered by the browser, eliminating the need for displaying "loading" states when users visit your application.

## Creating pages

Inertia pages are simply JavaScript components. If you have ever written a Preact, React, or Vue component, you will feel right at home. As you can see in the example below, pages receive data from your application's controllers as props.

<AdapterWrapper :adapter="adapter.name">
  <template #preact>

```tsx
import { Head } from '@inertiajs-revamped/preact'
import Layout from './Layout'

export default function Welcome({ user }) {
  return (
    <Layout>
      <Head title="Welcome" />
      <h1>Welcome</h1>
      <p>Hello {user.name}, welcome to your first Inertia app!</p>
    </Layout>
  )
}
```

  </template>
  <template #react>

```tsx
import { Head } from '@inertiajs-revamped/react'
import Layout from './Layout'

export default function Welcome({ user }) {
  return (
    <Layout>
      <Head title="Welcome" />
      <h1>Welcome</h1>
      <p>Hello {user.name}, welcome to your first Inertia app!</p>
    </Layout>
  )
}
```

  </template>
  <template #vue>

```vue
<script setup>
import { Head } from '@inertiajs-revamped/vue'
import Layout from './Layout'

defineProps({ user: Object })
</script>

<template>
  <Layout>
    <Head title="Welcome" />
    <h1>Welcome</h1>
    <p>Hello {{ user.name }}, welcome to your first Inertia app!</p>
  </Layout>
</template>
```

  </template>
</AdapterWrapper>

Given the page above, you can render the page by returning an Inertia response from a controller or route. In this example, let's assume this page is stored at `resources/pages/user/show.{{ adapter.name === 'vue' ? 'ts' : 'tsx'}}` within a Laravel application.

```php
use Inertia\Inertia;

class UserController extends Controller
{
  public function show(User $user)
  {
    return Inertia::render('user/show', [
      'user' => $user
    ]);
  }
}
```
