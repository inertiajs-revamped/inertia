<template>
  <div>
    <span @click="submit" id="submit">Submit form</span>

    <span @click="successfulRequest" id="successful-request">Successful request</span>
    <span @click="cancelledVisit" id="cancel">Cancellable Visit</span>

    <span @click="onBeforeVisit" id="before">onBefore</span>
    <span @click="onBeforeVisitCancelled" id="before-cancel">onBefore cancellation</span>
    <span @click="onStartVisit" id="start">onStart</span>
    <span @click="onProgressVisit" id="progress">onProgress</span>

    <span @click="onSuccessVisit" id="success">onSuccess</span>
    <span @click="onSuccessProgress" id="success-progress">onSuccess progress property</span>
    <span @click="onSuccessProcessing" id="success-processing">onSuccess resets processing</span>
    <span @click="onSuccessResetErrors" id="success-reset-errors">onSuccess resets errors</span>
    <span @click="onSuccessPromiseVisit" id="success-promise">onSuccess promise</span>

    <span @click="onErrorVisit" id="error">onError</span>
    <span @click="onErrorProgress" id="error-progress">onError progress property</span>
    <span @click="onErrorProcessing" id="error-processing">onError resets processing</span>
    <span @click="errorsSetOnError" id="errors-set-on-error">Errors set on error</span>
    <span @click="onErrorPromiseVisit" id="error-promise">onError promise</span>

    <span @click="progressNoFiles" id="no-progress">progress no files</span>

    <span id="success-status">Form was {{ form.wasSuccessful ? '' : 'not ' }}successful</span>
    <span id="recently-status">Form was {{ form.recentlySuccessful ? '' : 'not ' }}recently successful</span>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
export default {
  data() {
    return {
      wasSubmittedPreviously: false,
      form: this.$inertia.form({
        name: 'foo',
        remember: false,
      }),
    }
  },
  methods: {
    callbacks(overrides = {}) {
      const defaults = {
        onBefore: () => alert('onBefore'),
        onCancelToken: () => alert('onCancelToken'),
        onStart: () => alert('onStart'),
        onProgress: () => alert('onProgress'),
        onFinish: () => alert('onFinish'),
        onCancel: () => alert('onCancel'),
        onSuccess: () => alert('onSuccess'),
        onError: () => alert('onError'),
      }

      return {
        ...defaults,
        ...overrides,
      }
    },
    submit() {
      this.form.post(this.$page.url)
    },
    successfulRequest() {
      this.form.post(this.$page.url, {
        ...this.callbacks(),
      })
    },
    onSuccessResetErrors() {
      this.form.post('/form-helper/events/errors', {
        onBefore: () => {
          alert('onBefore')
          alert(this.form.hasErrors)
        },
        onError: () => {
          alert('onError')
          alert(this.form.hasErrors)

          this.form.post('/form-helper/events', {
            onStart: () => {
              alert('onStart')
              alert(this.form.hasErrors)
              alert(this.form.errors)
            },
            onSuccess: () => {
              alert('onSuccess')
              alert(this.form.hasErrors)
              alert(this.form.errors)
            },
          })
        },
      })
    },
    errorsSetOnError() {
      this.form.post('/form-helper/events/errors', {
        ...this.callbacks({
          onStart: () => {
            alert('onStart')
            alert(this.form.errors)
          },
          onError: () => {
            alert('onError')
            alert(this.form.errors)
          },
        }),
      })
    },
    onBeforeVisit() {
      this.form.post('/sleep', {
        ...this.callbacks({
          onBefore: (visit) => {
            alert('onBefore')
            alert(visit)
          },
        }),
      })
    },
    onBeforeVisitCancelled() {
      this.form.post('/sleep', {
        ...this.callbacks({
          onBefore: (visit) => {
            alert('onBefore')
            return false
          },
        }),
      })
    },
    onStartVisit() {
      this.form.post('/form-helper/events', {
        ...this.callbacks({
          onStart: (visit) => {
            alert('onStart')
            alert(visit)
          },
        }),
      })
    },
    onProgressVisit() {
      this.form
        .transform((data) => ({
          ...data,
          file: new File(['foobar'], 'example.bin'),
        }))
        .post('/dump/post', {
          ...this.callbacks({
            onProgress: (event) => {
              alert('onProgress')
              alert(event)
            },
          }),
        })
    },
    cancelledVisit() {
      this.form.post('/sleep', {
        ...this.callbacks({
          onCancelToken: (token) => {
            alert('onCancelToken')

            setTimeout(() => {
              alert('CANCELLING!')
              token.cancel()
            }, 10)
          },
        }),
      })
    },
    onSuccessVisit() {
      this.form.post('/dump/post', {
        ...this.callbacks({
          onSuccess: (page) => {
            alert('onSuccess')
            alert(page)
          },
        }),
      })
    },
    onSuccessPromiseVisit() {
      this.form.post('/dump/post', {
        ...this.callbacks({
          onSuccess: (page) => {
            alert('onSuccess')

            setTimeout(
              () =>
                alert(
                  'onFinish should have been fired by now if Promise functionality did not work'
                ),
              5
            )
            return new Promise((resolve) => setTimeout(resolve, 20))
          },
        }),
      })
    },
    onErrorVisit() {
      this.form.post('/form-helper/events/errors', {
        ...this.callbacks({
          onError: (errors) => {
            alert('onError')
            alert(errors)
          },
        }),
      })
    },
    onErrorPromiseVisit() {
      this.form.post('/form-helper/events/errors', {
        ...this.callbacks({
          onError: (errors) => {
            alert('onError')

            setTimeout(
              () =>
                alert(
                  'onFinish should have been fired by now if Promise functionality did not work'
                ),
              5
            )
            return new Promise((resolve) => setTimeout(resolve, 20))
          },
        }),
      })
    },
    onSuccessProcessing() {
      this.form.post(this.$page.url, {
        ...this.callbacks({
          onBefore: () => {
            alert('onBefore')
            alert(this.form.processing)
          },
          onCancelToken: () => {
            alert('onCancelToken')
            alert(this.form.processing)
          },
          onStart: () => {
            alert('onStart')
            alert(this.form.processing)
          },
          onSuccess: () => {
            alert('onSuccess')
            alert(this.form.processing)
          },
          onFinish: () => {
            alert('onFinish')
            alert(this.form.processing)
          },
        }),
      })
    },
    onErrorProcessing() {
      this.form.post('/form-helper/events/errors', {
        ...this.callbacks({
          onBefore: () => {
            alert('onBefore')
            alert(this.form.processing)
          },
          onCancelToken: () => {
            alert('onCancelToken')
            alert(this.form.processing)
          },
          onStart: () => {
            alert('onStart')
            alert(this.form.processing)
          },
          onError: () => {
            alert('onError')
            alert(this.form.processing)
          },
          onFinish: () => {
            alert('onFinish')
            alert(this.form.processing)
          },
        }),
      })
    },
    onSuccessProgress() {
      this.form
        .transform((data) => ({
          ...data,
          file: new File(['foobar'], 'example.bin'),
        }))
        .post(this.$page.url, {
          ...this.callbacks({
            onBefore: () => {
              alert('onBefore')
              alert(this.form.progress)
            },
            onCancelToken: () => {
              alert('onCancelToken')
              alert(this.form.progress)
            },
            onStart: () => {
              alert('onStart')
              alert(this.form.progress)
            },
            onProgress: () => {
              alert('onProgress')
              alert(this.form.progress)
            },
            onSuccess: () => {
              alert('onSuccess')
              alert(this.form.progress)
            },
            onFinish: () => {
              alert('onFinish')
              alert(this.form.progress)
            },
          }),
        })
    },
    onErrorProgress() {
      this.form
        .transform((data) => ({
          ...data,
          file: new File(['foobar'], 'example.bin'),
        }))
        .post('/form-helper/events/errors', {
          ...this.callbacks({
            onBefore: () => {
              alert('onBefore')
              alert(this.form.progress)
            },
            onCancelToken: () => {
              alert('onCancelToken')
              alert(this.form.progress)
            },
            onStart: () => {
              alert('onStart')
              alert(this.form.progress)
            },
            onProgress: () => {
              alert('onProgress')
              alert(this.form.progress)
            },
            onError: () => {
              alert('onError')
              alert(this.form.progress)
            },
            onFinish: () => {
              alert('onFinish')
              alert(this.form.progress)
            },
          }),
        })
    },
    progressNoFiles() {
      this.form.post(this.$page.url, {
        ...this.callbacks({
          onBefore: () => {
            alert('onBefore')
            alert(this.form.progress)
          },
          onCancelToken: () => {
            alert('onCancelToken')
            alert(this.form.progress)
          },
          onStart: () => {
            alert('onStart')
            alert(this.form.progress)
          },
          onProgress: () => {
            alert('onProgress')
            alert(this.form.progress)
          },
          onSuccess: () => {
            alert('onSuccess')
            alert(this.form.progress)
          },
          onFinish: () => {
            alert('onFinish')
            alert(this.form.progress)
          },
        }),
      })
    },
  },
}
</script>
