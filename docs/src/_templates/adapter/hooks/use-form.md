---
title: useForm
---

<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useIntegration } from '@/theme/composables/useIntegrations'

const route = useRoute()
const urlParts = route.path.slice(1).split('/')
const adapter = useIntegration(urlParts[1])
</script>

# `useForm` <Badge type="warning">{{ adapter.name === 'vue' ? 'composable' : 'hook' }}</Badge>

Use the `useForm()` hook to reduce the amount of boilerplate code needed for handling typical form submissions.

> [!NOTE]
> This document is a work in progress.

## Usage

```typescript
// usage
```

## Example

```typescript
// example
```
