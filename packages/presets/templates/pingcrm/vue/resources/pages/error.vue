<script setup lang="ts">
import { Head, Link } from '@inertiajs-revamped/vue'

interface Props {
  status?: string
}

const props = defineProps<Props>()

const title = {
  503: '503: Service Unavailable',
  500: '500: Server Error',
  404: '404: Page Not Found',
  403: '403: Forbidden',
}[props.status!]

const description = {
  503: 'Sorry, we are doing some maintenance. Please check back soon.',
  500: 'Whoops, something went wrong on our servers.',
  404: 'Sorry, the page you are looking for could not be found.',
  403: 'Sorry, you are forbidden from accessing this page.',
}[props.status!]
</script>

<template>
  <div>

    <Head :title="title" />
    <section class="body-font text-gray-600">
      <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="title-font mb-4 text-gray-900 text-3xl font-medium sm:text-4xl">
          {{ title }}
        </h1>
        <p class="mb-8 leading-relaxed">{{ description }}</p>
        <Link href="/" class="btn-indigo">
        Return Home
        </Link>
      </div>
    </section>
  </div>
</template>
