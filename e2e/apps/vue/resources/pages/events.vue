<template>
  <div>
    <!-- Listeners -->
    <span @click="withoutEventListeners" id="without-listeners">Basic Visit</span>
    <span @click="removeInertiaListener" id="remove-inertia-listener">Remove Inertia Listener</span>

    <!-- Events: Before -->
    <span @click="beforeVisit" id="before">Before Event</span>
    <span @click="beforeVisitPreventLocal" id="before-prevent-local">Before Event</span>
    <inertia-link :href="$page.url" method="post" @before="(visit) => alert('linkOnBefore', visit)"
      @start="() => alert('linkOnStart')" id="link-before">Before Event Link</inertia-link>
    <inertia-link :href="$page.url" method="post" @before="(visit) => tap(false, alert('linkOnBefore'))"
      @start="() => alert('This listener should not have been called.')" id="link-before-prevent-local">Before Event
      Link</inertia-link>
    <span @click="beforeVisitPreventGlobalInertia" id="before-prevent-global-inertia">Before Event - Prevent globally
      using Inertia Event Listener</span>
    <span @click="beforeVisitPreventGlobalNative" id="before-prevent-global-native">Before Event - Prevent globally
      using Native Event Listeners</span>

    <!-- Events: CancelToken -->
    <span @click="cancelTokenVisit" id="canceltoken">Cancel Token Event</span>
    <inertia-link :href="$page.url" method="post" @cancelToken="(event) => alert('linkOnCancelToken', event)"
      id="link-canceltoken">Cancel Token Event Link</inertia-link>

    <!-- Events: Cancel -->
    <span @click="cancelVisit" id="cancel">Cancel Event</span>
    <inertia-link :href="$page.url" method="post" @cancelToken="(token) => token.cancel()"
      @cancel="(event) => alert('linkOnCancel', event)" id="link-cancel">Cancel Event Link</inertia-link>

    <!-- Events: Start -->
    <span @click="startVisit" id="start">Start Event</span>
    <inertia-link :href="$page.url" method="post" @start="(event) => alert('linkOnStart', event)" id="link-start">Start
      Event Link</inertia-link>

    <!-- Events: Progress -->
    <span @click="progressVisit" id="progress">Progress Event</span>
    <span @click="progressNoFilesVisit" id="progress-no-files">Missing Progress Event (no files)</span>
    <inertia-link :href="$page.url" method="post" :data="payloadWithFile"
      @progress="(event) => alert('linkOnProgress', event)" id="link-progress">Progress Event Link</inertia-link>
    <inertia-link :href="$page.url" method="post" @before="() => alert('linkProgressNoFilesOnBefore')"
      @progress="(event) => alert('linkOnProgress', event)" id="link-progress-no-files">Progress Event Link (no
      files)</inertia-link>

    <!-- Events: Error -->
    <span @click="errorVisit" id="error">Error Event</span>
    <span @click="errorPromiseVisit" id="error-promise">Error Event (delaying onFinish w/ Promise)</span>
    <inertia-link href="/events/errors" method="post" @error="(errors) => alert('linkOnError', errors)"
      @success="() => alert('This listener should not have been called')" id="link-error">Error Event
      Link</inertia-link>
    <inertia-link href="/events/errors" method="post" @error="() => callbackSuccessErrorPromise('linkOnError')"
      @success="() => alert('This listener should not have been called')" @finish="() => alert('linkOnFinish')"
      id="link-error-promise">Error Event Link (delaying onFinish w/ Promise)</inertia-link>

    <!-- Events: Success -->
    <span @click="successVisit" id="success">Success Event</span>
    <span @click="successPromiseVisit" id="success-promise">Success Event (delaying onFinish w/ Promise)</span>
    <inertia-link :href="$page.url" method="post" @error="() => alert('This listener should not have been called')"
      @success="(event) => alert('linkOnSuccess', event)" id="link-success">Success Event Link</inertia-link>
    <inertia-link :href="$page.url" method="post" @error="() => alert('This listener should not have been called')"
      @success="() => callbackSuccessErrorPromise('linkOnSuccess')" @finish="() => alert('linkOnFinish')"
      id="link-success-promise">Success Event Link (delaying onFinish w/ Promise)</inertia-link>

    <!-- Events: Invalid -->
    <span @click="invalidVisit" id="invalid">Finish Event</span>

    <!-- Events: Exception -->
    <span @click="exceptionVisit" id="exception">Exception Event</span>

    <!-- Events: Finish -->
    <span @click="finishVisit" id="finish">Finish Event</span>
    <inertia-link :href="$page.url" method="post" @finish="(event) => alert('linkOnFinish', event)"
      id="link-finish">Finish Event Link</inertia-link>

    <!-- Events: Navigate -->
    <span @click="navigateVisit" id="navigate">Navigate Event</span>

    <!-- Lifecycles -->
    <span @click="lifecycleSuccess" id="lifecycle-success">Lifecycle Success</span>
    <span @click="lifecycleError" id="lifecycle-error">Lifecycle Error</span>
    <span @click="lifecycleCancel" id="lifecycle-cancel">Lifecycle Cancel</span>
    <span @click="lifecycleCancelAfterFinish" id="lifecycle-cancel-after-finish">Lifecycle Cancel - After
      Finish</span>
  </div>
</template>

<script lang="ts">
import { router } from '@inertiajs-revamped/vue'

export default {
  data: () => ({
    payloadWithFile: {
      file: new File(['foobar'], 'example.bin'),
    },
  }),
  methods: {
    alert(...args) {
      args.forEach((arg) => alert(arg))
    },
    withoutEventListeners() {
      this.$inertia.post(this.$page.url, {})
    },
    removeInertiaListener() {
      const removeEventListener = router.on('before', () =>
        alert('Inertia.on(before)')
      )

      alert('Removing Inertia.on Listener')
      removeEventListener()

      this.$inertia.post(
        this.$page.url,
        {},
        {
          onBefore: () => alert('onBefore'),
          onStart: () => alert('onStart'),
        }
      )
    },
    beforeVisit() {
      router.on('before', (event) => {
        alert('Inertia.on(before)')
        alert(event)
      })

      document.addEventListener('inertia:before', (event) => {
        alert('addEventListener(inertia:before)')
        alert(event)
      })

      this.$inertia.post(
        this.$page.url,
        {},
        {
          onBefore: (event) => {
            alert('onBefore')
            alert(event)
          },
          onStart: () => alert('onStart'),
        }
      )
    },
    beforeVisitPreventLocal() {
      document.addEventListener('inertia:before', () =>
        alert('addEventListener(inertia:before)')
      )
      router.on('before', () => alert('Inertia.on(before)'))

      this.$inertia.post(
        this.$page.url,
        {},
        {
          onBefore: () => {
            alert('onBefore')
            return false
          },
          onStart: () => alert('This listener should not have been called.'),
        }
      )
    },
    beforeVisitPreventGlobalInertia() {
      document.addEventListener('inertia:before', () =>
        alert('addEventListener(inertia:before)')
      )
      router.on('before', (visit) => {
        alert('Inertia.on(before)')
        return false
      })

      this.$inertia.post(
        this.$page.url,
        {},
        {
          onBefore: () => alert('onBefore'),
          onStart: () => alert('This listener should not have been called.'),
        }
      )
    },
    beforeVisitPreventGlobalNative() {
      router.on('before', () => alert('Inertia.on(before)'))
      document.addEventListener('inertia:before', (event) => {
        alert('addEventListener(inertia:before)')
        event.preventDefault()
      })

      this.$inertia.post(
        this.$page.url,
        {},
        {
          onBefore: () => alert('onBefore'),
          onStart: () => alert('This listener should not have been called.'),
        }
      )
    },
    cancelTokenVisit() {
      router.on('cancelToken', () =>
        alert('This listener should not have been called.')
      )
      document.addEventListener('inertia:cancelToken', () =>
        alert('This listener should not have been called.')
      )

      this.$inertia.post(
        this.$page.url,
        {},
        {
          onCancelToken: (event) => {
            alert('onCancelToken')
            alert(event)
          },
        }
      )
    },
    startVisit() {
      router.on('start', (event) => {
        alert('Inertia.on(start)')
        alert(event)
      })

      document.addEventListener('inertia:start', (event) => {
        alert('addEventListener(inertia:start)')
        alert(event)
      })

      this.$inertia.post(
        this.$page.url,
        {},
        {
          onStart: (event) => {
            alert('onStart')
            alert(event)
          },
        }
      )
    },
    progressVisit() {
      router.on('progress', (event) => {
        alert('Inertia.on(progress)')
        alert(event)
      })

      document.addEventListener('inertia:progress', (event) => {
        alert('addEventListener(inertia:progress)')
        alert(event)
      })

      this.$inertia.post(this.$page.url, this.payloadWithFile, {
        onProgress: (event) => {
          alert('onProgress')
          alert(event)
        },
      })
    },
    progressNoFilesVisit() {
      router.on('progress', (event) => {
        alert('Inertia.on(progress)')
        alert(event)
      })

      document.addEventListener('inertia:progress', (event) => {
        alert('addEventListener(inertia:progress)')
        alert(event)
      })

      this.$inertia.post(
        this.$page.url,
        {},
        {
          onBefore: () => alert('progressNoFilesOnBefore'),
          onProgress: (event) => {
            alert('onProgress')
            alert(event)
          },
        }
      )
    },
    cancelVisit() {
      router.on('cancel', (event) => {
        alert('Inertia.on(cancel)')
        alert(event)
      })

      document.addEventListener('inertia:cancel', (event) => {
        alert('addEventListener(inertia:cancel)')
        alert(event)
      })

      this.$inertia.post(
        this.$page.url,
        {},
        {
          onCancelToken: (token) => token.cancel(),
          onCancel: (event) => {
            alert('onCancel')
            alert(event)
          },
        }
      )
    },
    errorVisit() {
      router.on('error', (event) => {
        alert('Inertia.on(error)')
        alert(event)
      })

      document.addEventListener('inertia:error', (event) => {
        alert('addEventListener(inertia:error)')
        alert(event)
      })

      this.$inertia.post(
        '/events/errors',
        {},
        {
          onError: (errors) => {
            alert('onError')
            alert(errors)
          },
        }
      )
    },
    errorPromiseVisit() {
      this.$inertia.post(
        '/events/errors',
        {},
        {
          onError: () => this.callbackSuccessErrorPromise('onError'),
          onSuccess: () => alert('This listener should not have been called'),
          onFinish: () => alert('onFinish'),
        }
      )
    },
    successVisit() {
      router.on('success', (event) => {
        alert('Inertia.on(success)')
        alert(event)
      })

      document.addEventListener('inertia:success', (event) => {
        alert('addEventListener(inertia:success)')
        alert(event)
      })

      this.$inertia.post(
        this.$page.url,
        {},
        {
          onError: () => alert('This listener should not have been called'),
          onSuccess: (page) => {
            alert('onSuccess')
            alert(page)
          },
        }
      )
    },
    successPromiseVisit() {
      this.$inertia.post(
        this.$page.url,
        {},
        {
          onSuccess: () => this.callbackSuccessErrorPromise('onSuccess'),
          onError: () => alert('This listener should not have been called'),
          onFinish: () => alert('onFinish'),
        }
      )
    },
    finishVisit() {
      router.on('finish', (event) => {
        alert('Inertia.on(finish)')
        alert(event)
      })

      document.addEventListener('inertia:finish', (event) => {
        alert('addEventListener(inertia:finish)')
        alert(event)
      })

      this.$inertia.post(
        this.$page.url,
        {},
        {
          onFinish: (event) => {
            alert('onFinish')
            alert(event)
          },
        }
      )
    },
    invalidVisit() {
      router.on('invalid', (event) => {
        alert('Inertia.on(invalid)')
        alert(event)
      })

      document.addEventListener('inertia:invalid', (event) => {
        alert('addEventListener(inertia:invalid)')
        alert(event)
      })

      this.$inertia.post(
        '/non-inertia',
        {},
        {
          onInvalid: () => alert('This listener should not have been called.'),
        }
      )
    },
    exceptionVisit() {
      router.on('exception', (event) => {
        alert('Inertia.on(exception)')
        alert(event)
      })

      document.addEventListener('inertia:exception', (event) => {
        alert('addEventListener(inertia:exception)')
        alert(event)
      })

      try {
        this.$inertia.post(
          '/disconnect',
          {},
          {
            onException: () =>
              alert('This listener should not have been called.'),
          }
        )
      } catch (error) {}
    },
    navigateVisit() {
      router.on('navigate', (event) => {
        alert('Inertia.on(navigate)')
        alert(event)
      })

      document.addEventListener('inertia:navigate', (event) => {
        alert('addEventListener(inertia:navigate)')
        alert(event)
      })

      this.$inertia.get(
        '/',
        {},
        {
          onNavigate: () => alert('This listener should not have been called.'),
        }
      )
    },
    registerAllListeners() {
      router.on('before', () => alert('Inertia.on(before)'))
      router.on('cancelToken', () => alert('Inertia.on(cancelToken)'))
      router.on('cancel', () => alert('Inertia.on(cancel)'))
      router.on('start', () => alert('Inertia.on(start)'))
      router.on('progress', () => alert('Inertia.on(progress)'))
      router.on('error', () => alert('Inertia.on(error)'))
      router.on('success', () => alert('Inertia.on(success)'))
      router.on('invalid', () => alert('Inertia.on(invalid)'))
      router.on('exception', () => alert('Inertia.on(exception)'))
      router.on('finish', () => alert('Inertia.on(finish)'))
      router.on('navigate', () => alert('Inertia.on(navigate)'))
      document.addEventListener('inertia:before', () =>
        alert('addEventListener(inertia:before)')
      )
      document.addEventListener('inertia:cancelToken', () =>
        alert('addEventListener(inertia:cancelToken)')
      )
      document.addEventListener('inertia:cancel', () =>
        alert('addEventListener(inertia:cancel)')
      )
      document.addEventListener('inertia:start', () =>
        alert('addEventListener(inertia:start)')
      )
      document.addEventListener('inertia:progress', () =>
        alert('addEventListener(inertia:progress)')
      )
      document.addEventListener('inertia:error', () =>
        alert('addEventListener(inertia:error)')
      )
      document.addEventListener('inertia:success', () =>
        alert('addEventListener(inertia:success)')
      )
      document.addEventListener('inertia:invalid', () =>
        alert('addEventListener(inertia:invalid)')
      )
      document.addEventListener('inertia:exception', () =>
        alert('addEventListener(inertia:exception)')
      )
      document.addEventListener('inertia:finish', () =>
        alert('addEventListener(inertia:finish)')
      )
      document.addEventListener('inertia:navigate', () =>
        alert('addEventListener(inertia:navigate)')
      )

      return {
        onBefore: () => alert('onBefore'),
        onCancelToken: () => alert('onCancelToken'),
        onCancel: () => alert('onCancel'),
        onStart: () => alert('onStart'),
        onProgress: () => alert('onProgress'),
        onError: () => alert('onError'),
        onSuccess: () => alert('onSuccess'),
        onInvalid: () => alert('onInvalid'), // Does not exist.
        onException: () => alert('onException'), // Does not exist.
        onFinish: () => alert('onFinish'),
        onNavigate: () => alert('onNavigate'), // Does not exist.
      }
    },
    lifecycleSuccess() {
      this.$inertia.post(
        this.$page.url,
        this.payloadWithFile,
        this.registerAllListeners()
      )
    },
    lifecycleError() {
      this.$inertia.post(
        '/events/errors',
        this.payloadWithFile,
        this.registerAllListeners()
      )
    },
    lifecycleCancel() {
      this.$inertia.post('/sleep', this.payloadWithFile, {
        ...this.registerAllListeners(),
        onCancelToken: (token) => {
          alert('onCancelToken')

          setTimeout(() => {
            alert('CANCELLING!')
            token.cancel()
          }, 10)
        },
      })
    },
    lifecycleCancelAfterFinish() {
      let cancelToken = null

      this.$inertia.post(this.$page.url, this.payloadWithFile, {
        ...this.registerAllListeners(),
        onCancelToken: (token) => {
          alert('onCancelToken')
          cancelToken = token
        },
        onFinish: () => {
          alert('onFinish')
          alert('CANCELLING!')
          cancelToken.cancel()
        },
      })
    },
    callbackSuccessErrorPromise(eventName) {
      alert(eventName)
      setTimeout(
        () =>
          alert(
            'onFinish should have been fired by now if Promise functionality did not work'
          ),
        5
      )
      return new Promise((resolve) => setTimeout(resolve, 20))
    },
  },
}
</script>
