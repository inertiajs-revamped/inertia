import {
  type Errors,
  type Page,
  type Progress,
  type Visit,
  useForm,
  usePage,
} from '@inertiajs-revamped/react'

export default function () {
  const { url } = usePage()

  /* const wasSubmittedPreviously = false */

  const form = useForm({
    name: 'foo',
    remember: false,
  })

  const callbacks = (overrides = {}) => {
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
  }

  const submit = () => {
    form.post(url)
  }

  const successfulRequest = () => {
    form.post(url, {
      ...callbacks(),
    })
  }

  const onSuccessResetErrors = () => {
    form.post('/form-helper/events/errors', {
      onBefore: () => {
        alert('onBefore')
        alert(form.hasErrors)
      },
      onError: () => {
        alert('onError')
        alert(form.hasErrors)

        form.post('/form-helper/events', {
          onStart: () => {
            alert('onStart')
            alert(form.hasErrors)
            alert(form.errors)
          },
          onSuccess: () => {
            alert('onSuccess')
            alert(form.hasErrors)
            alert(form.errors)
          },
        })
      },
    })
  }

  const errorsSetOnError = () => {
    form.post('/form-helper/events/errors', {
      ...callbacks({
        onStart: () => {
          alert('onStart')
          alert(form.errors)
        },
        onError: () => {
          alert('onError')
          alert(form.errors)
        },
      }),
    })
  }

  const onBeforeVisit = () => {
    form.post('/sleep', {
      ...callbacks({
        onBefore: (visit: Visit) => {
          alert('onBefore')
          alert(visit)
        },
      }),
    })
  }

  const onBeforeVisitCancelled = () => {
    form.post('/sleep', {
      ...callbacks({
        onBefore: () => {
          alert('onBefore')
          return false
        },
      }),
    })
  }

  const onStartVisit = () => {
    form.post('/form-helper/events', {
      ...callbacks({
        onStart: (visit: Visit) => {
          alert('onStart')
          alert(visit)
        },
      }),
    })
  }

  const onProgressVisit = () => {
    form.transform((data) => ({
      ...data,
      file: new File(['foobar'], 'example.bin'),
    }))

    form.post('/dump/post', {
      ...callbacks({
        onProgress: (event: Progress) => {
          alert('onProgress')
          alert(event)
        },
      }),
    })
  }

  const cancelledVisit = () => {
    form.post('/sleep', {
      ...callbacks({
        onCancelToken: (token: any) => {
          alert('onCancelToken')

          setTimeout(() => {
            alert('CANCELLING!')
            token.cancel()
          }, 10)
        },
      }),
    })
  }

  const onSuccessVisit = () => {
    form.post('/dump/post', {
      ...callbacks({
        onSuccess: (page: Page) => {
          alert('onSuccess')
          alert(page)
        },
      }),
    })
  }

  const onSuccessPromiseVisit = () => {
    form.post('/dump/post', {
      ...callbacks({
        onSuccess: () => {
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
  }

  const onErrorVisit = () => {
    form.post('/form-helper/events/errors', {
      ...callbacks({
        onError: (errors: Errors) => {
          alert('onError')
          alert(errors)
        },
      }),
    })
  }

  const onErrorPromiseVisit = () => {
    form.post('/form-helper/events/errors', {
      ...callbacks({
        onError: () => {
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
  }

  const onSuccessProcessing = () => {
    form.post(url, {
      ...callbacks({
        onBefore: () => {
          alert('onBefore')
          alert(form.processing)
        },
        onCancelToken: () => {
          alert('onCancelToken')
          alert(form.processing)
        },
        onStart: () => {
          alert('onStart')
          alert(form.processing)
        },
        onSuccess: () => {
          alert('onSuccess')
          alert(form.processing)
        },
        onFinish: () => {
          alert('onFinish')
          alert(form.processing)
        },
      }),
    })
  }

  const onErrorProcessing = () => {
    form.post('/form-helper/events/errors', {
      ...callbacks({
        onBefore: () => {
          alert('onBefore')
          alert(form.processing)
        },
        onCancelToken: () => {
          alert('onCancelToken')
          alert(form.processing)
        },
        onStart: () => {
          alert('onStart')
          alert(form.processing)
        },
        onError: () => {
          alert('onError')
          alert(form.processing)
        },
        onFinish: () => {
          alert('onFinish')
          alert(form.processing)
        },
      }),
    })
  }

  const onSuccessProgress = () => {
    form.transform((data) => ({
      ...data,
      file: new File(['foobar'], 'example.bin'),
    }))

    form.post(url, {
      ...callbacks({
        onBefore: () => {
          alert('onBefore')
          alert(form.progress)
        },
        onCancelToken: () => {
          alert('onCancelToken')
          alert(form.progress)
        },
        onStart: () => {
          alert('onStart')
          alert(form.progress)
        },
        onProgress: () => {
          alert('onProgress')
          alert(form.progress)
        },
        onSuccess: () => {
          alert('onSuccess')
          alert(form.progress)
        },
        onFinish: () => {
          alert('onFinish')
          alert(form.progress)
        },
      }),
    })
  }

  const onErrorProgress = () => {
    form.transform((data) => ({
      ...data,
      file: new File(['foobar'], 'example.bin'),
    }))
    form.post('/form-helper/events/errors', {
      ...callbacks({
        onBefore: () => {
          alert('onBefore')
          alert(form.progress)
        },
        onCancelToken: () => {
          alert('onCancelToken')
          alert(form.progress)
        },
        onStart: () => {
          alert('onStart')
          alert(form.progress)
        },
        onProgress: () => {
          alert('onProgress')
          alert(form.progress)
        },
        onError: () => {
          alert('onError')
          alert(form.progress)
        },
        onFinish: () => {
          alert('onFinish')
          alert(form.progress)
        },
      }),
    })
  }

  const progressNoFiles = () => {
    form.post(url, {
      ...callbacks({
        onBefore: () => {
          alert('onBefore')
          alert(form.progress)
        },
        onCancelToken: () => {
          alert('onCancelToken')
          alert(form.progress)
        },
        onStart: () => {
          alert('onStart')
          alert(form.progress)
        },
        onProgress: () => {
          alert('onProgress')
          alert(form.progress)
        },
        onSuccess: () => {
          alert('onSuccess')
          alert(form.progress)
        },
        onFinish: () => {
          alert('onFinish')
          alert(form.progress)
        },
      }),
    })
  }

  return (
    <>
      <span onClick={submit} id="submit">
        Submit form
      </span>

      <span onClick={successfulRequest} id="successful-request">
        Successful request
      </span>
      <span onClick={cancelledVisit} id="cancel">
        Cancellable Visit
      </span>

      <span onClick={onBeforeVisit} id="before">
        onBefore
      </span>
      <span onClick={onBeforeVisitCancelled} id="before-cancel">
        onBefore cancellation
      </span>
      <span onClick={onStartVisit} id="start">
        onStart
      </span>
      <span onClick={onProgressVisit} id="progress">
        onProgress
      </span>

      <span onClick={onSuccessVisit} id="success">
        onSuccess
      </span>
      <span onClick={onSuccessProgress} id="success-progress">
        onSuccess progress property
      </span>
      <span onClick={onSuccessProcessing} id="success-processing">
        onSuccess resets processing
      </span>
      <span onClick={onSuccessResetErrors} id="success-reset-errors">
        onSuccess resets errors
      </span>
      <span onClick={onSuccessPromiseVisit} id="success-promise">
        onSuccess promise
      </span>

      <span onClick={onErrorVisit} id="error">
        onError
      </span>
      <span onClick={onErrorProgress} id="error-progress">
        onError progress property
      </span>
      <span onClick={onErrorProcessing} id="error-processing">
        onError resets processing
      </span>
      <span onClick={errorsSetOnError} id="errors-set-on-error">
        Errors set on error
      </span>
      <span onClick={onErrorPromiseVisit} id="error-promise">
        onError promise
      </span>

      <span onClick={progressNoFiles} id="no-progress">
        progress no files
      </span>

      <span id="success-status">
        Form was {form.wasSuccessful ? '' : 'not '}successful
      </span>
      <span id="recently-status">
        Form was {form.recentlySuccessful ? '' : 'not '}recently successful
      </span>
    </>
  )
}
