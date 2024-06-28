import { Link, router, usePage } from '@inertiajs-revamped/react'

export const tap = (value: any, callback: (value: any) => void) => {
  callback(value)
  return value
}

export default function () {
  const { url } = usePage()

  const payloadWithFile = {
    file: new File(['foobar'], 'example.bin'),
  }

  const alert = (...args: any[]) => {
    args.forEach((arg) => alert(arg))
  }

  const withoutEventListeners = () => {
    router.post(url, {})
  }

  const removeInertiaListener = () => {
    const removeEventListener = router.on('before', () =>
      alert('Inertia.on(before)')
    )

    alert('Removing Inertia.on Listener')
    removeEventListener()

    router.post(
      url,
      {},
      {
        onBefore: () => alert('onBefore'),
        onStart: () => alert('onStart'),
      }
    )
  }

  const beforeVisit = () => {
    router.on('before', (event) => {
      alert('Inertia.on(before)')
      alert(event)
    })

    document.addEventListener('inertia:before', (event) => {
      alert('addEventListener(inertia:before)')
      alert(event)
    })

    router.post(
      url,
      {},
      {
        onBefore: (event) => {
          alert('onBefore')
          alert(event)
        },
        onStart: () => alert('onStart'),
      }
    )
  }

  const beforeVisitPreventLocal = () => {
    document.addEventListener('inertia:before', () =>
      alert('addEventListener(inertia:before)')
    )
    router.on('before', () => alert('Inertia.on(before)'))

    router.post(
      url,
      {},
      {
        onBefore: () => {
          alert('onBefore')
          return false
        },
        onStart: () => alert('This listener should not have been called.'),
      }
    )
  }

  const beforeVisitPreventGlobalInertia = () => {
    document.addEventListener('inertia:before', () =>
      alert('addEventListener(inertia:before)')
    )
    router.on('before', (visit) => {
      alert('Inertia.on(before)')
      return false
    })

    router.post(
      url,
      {},
      {
        onBefore: () => alert('onBefore'),
        onStart: () => alert('This listener should not have been called.'),
      }
    )
  }

  const beforeVisitPreventGlobalNative = () => {
    router.on('before', () => alert('Inertia.on(before)'))
    document.addEventListener('inertia:before', (event) => {
      alert('addEventListener(inertia:before)')
      event.preventDefault()
    })

    router.post(
      url,
      {},
      {
        onBefore: () => alert('onBefore'),
        onStart: () => alert('This listener should not have been called.'),
      }
    )
  }

  const cancelTokenVisit = () => {
    router.on('cancel', () =>
      alert('This listener should not have been called.')
    )
    document.addEventListener('inertia:cancelToken', () =>
      alert('This listener should not have been called.')
    )

    router.post(
      url,
      {},
      {
        onCancelToken: (event) => {
          alert('onCancelToken')
          alert(event)
        },
      }
    )
  }

  const startVisit = () => {
    router.on('start', (event) => {
      alert('Inertia.on(start)')
      alert(event)
    })

    document.addEventListener('inertia:start', (event) => {
      alert('addEventListener(inertia:start)')
      alert(event)
    })

    router.post(
      url,
      {},
      {
        onStart: (event) => {
          alert('onStart')
          alert(event)
        },
      }
    )
  }

  const progressVisit = () => {
    router.on('progress', (event) => {
      alert('Inertia.on(progress)')
      alert(event)
    })

    document.addEventListener('inertia:progress', (event) => {
      alert('addEventListener(inertia:progress)')
      alert(event)
    })

    router.post(url, payloadWithFile, {
      onProgress: (event) => {
        alert('onProgress')
        alert(event)
      },
    })
  }

  const progressNoFilesVisit = () => {
    router.on('progress', (event) => {
      alert('Inertia.on(progress)')
      alert(event)
    })

    document.addEventListener('inertia:progress', (event) => {
      alert('addEventListener(inertia:progress)')
      alert(event)
    })

    router.post(
      url,
      {},
      {
        onBefore: () => alert('progressNoFilesOnBefore'),
        onProgress: (event) => {
          alert('onProgress')
          alert(event)
        },
      }
    )
  }

  const cancelVisit = () => {
    router.on('cancel', (event) => {
      alert('Inertia.on(cancel)')
      alert(event)
    })

    document.addEventListener('inertia:cancel', (event) => {
      alert('addEventListener(inertia:cancel)')
      alert(event)
    })

    router.post(
      url,
      {},
      {
        onCancelToken: (token) => token.cancel(),
        // @ts-expect-error
        onCancel: (event) => {
          alert('onCancel')
          alert(event)
        },
      }
    )
  }

  const errorVisit = () => {
    router.on('error', (event) => {
      alert('Inertia.on(error)')
      alert(event)
    })

    document.addEventListener('inertia:error', (event) => {
      alert('addEventListener(inertia:error)')
      alert(event)
    })

    router.post(
      '/events/errors',
      {},
      {
        onError: (errors) => {
          alert('onError')
          alert(errors)
        },
      }
    )
  }

  const errorPromiseVisit = () => {
    router.post(
      '/events/errors',
      {},
      {
        onError: () => callbackSuccessErrorPromise('onError'),
        onSuccess: () => alert('This listener should not have been called'),
        onFinish: () => alert('onFinish'),
      }
    )
  }

  const successVisit = () => {
    router.on('success', (event) => {
      alert('Inertia.on(success)')
      alert(event)
    })

    document.addEventListener('inertia:success', (event) => {
      alert('addEventListener(inertia:success)')
      alert(event)
    })

    router.post(
      url,
      {},
      {
        onError: () => alert('This listener should not have been called'),
        onSuccess: (page) => {
          alert('onSuccess')
          alert(page)
        },
      }
    )
  }

  const successPromiseVisit = () => {
    router.post(
      url,
      {},
      {
        onSuccess: () => callbackSuccessErrorPromise('onSuccess'),
        onError: () => alert('This listener should not have been called'),
        onFinish: () => alert('onFinish'),
      }
    )
  }

  const finishVisit = () => {
    router.on('finish', (event) => {
      alert('Inertia.on(finish)')
      alert(event)
    })

    document.addEventListener('inertia:finish', (event) => {
      alert('addEventListener(inertia:finish)')
      alert(event)
    })

    router.post(
      url,
      {},
      {
        onFinish: (event) => {
          alert('onFinish')
          alert(event)
        },
      }
    )
  }

  const invalidVisit = () => {
    router.on('invalid', (event) => {
      alert('Inertia.on(invalid)')
      alert(event)
    })

    document.addEventListener('inertia:invalid', (event) => {
      alert('addEventListener(inertia:invalid)')
      alert(event)
    })

    router.post(
      '/non-inertia',
      {},
      {
        // @ts-expect-error
        onInvalid: () => alert('This listener should not have been called.'),
      }
    )
  }

  const exceptionVisit = () => {
    router.on('exception', (event) => {
      alert('Inertia.on(exception)')
      alert(event)
    })

    document.addEventListener('inertia:exception', (event) => {
      alert('addEventListener(inertia:exception)')
      alert(event)
    })

    try {
      router.post(
        '/disconnect',
        {},
        {
          // @ts-expect-error
          onException: () =>
            alert('This listener should not have been called.'),
        }
      )
    } catch (error) {}
  }

  const navigateVisit = () => {
    router.on('navigate', (event) => {
      alert('Inertia.on(navigate)')
      alert(event)
    })

    document.addEventListener('inertia:navigate', (event) => {
      alert('addEventListener(inertia:navigate)')
      alert(event)
    })

    router.get(
      '/',
      {},
      {
        // @ts-expect-error
        onNavigate: () => alert('This listener should not have been called.'),
      }
    )
  }

  const registerAllListeners = () => {
    router.on('before', () => alert('Inertia.on(before)'))
    // @ts-expect-error
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
  }

  const lifecycleSuccess = () => {
    router.post(url, payloadWithFile, registerAllListeners())
  }

  const lifecycleError = () => {
    router.post('/events/errors', payloadWithFile, registerAllListeners())
  }

  const lifecycleCancel = () => {
    router.post('/sleep', payloadWithFile, {
      ...registerAllListeners(),
      onCancelToken: (token) => {
        alert('onCancelToken')

        setTimeout(() => {
          alert('CANCELLING!')
          token.cancel()
        }, 10)
      },
    })
  }

  const lifecycleCancelAfterFinish = () => {
    let cancelToken: any = null

    router.post(url, payloadWithFile, {
      ...registerAllListeners(),
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
  }

  const callbackSuccessErrorPromise = (eventName: string) => {
    alert(eventName)
    setTimeout(
      () =>
        alert(
          'onFinish should have been fired by now if Promise functionality did not work'
        ),
      5
    )
    return new Promise((resolve) => setTimeout(resolve, 20))
  }

  return (
    <>
      <span onClick={withoutEventListeners} className="without-listeners">
        Basic Visit
      </span>
      <span onClick={removeInertiaListener} className="remove-inertia-listener">
        Remove Inertia Listener
      </span>

      <span onClick={beforeVisit} className="before">
        Before Event
      </span>
      <span onClick={beforeVisitPreventLocal} className="before-prevent-local">
        Before Event
      </span>
      <Link
        href={url}
        method="post"
        /* onBefore={(visit) => alert('linkOnBefore', visit)} */
        onBefore={() => alert('linkOnBefore')}
        onStart={() => alert('linkOnStart')}
        className="link-before"
      >
        Before Event Link
      </Link>
      <Link
        href={url}
        method="post"
        /* onBefore="(visit) => tap(false, alert('linkOnBefore'))" */
        onBefore={() => tap(false, () => alert('linkOnBefore'))}
        onStart={() => alert('This listener should not have been called.')}
        className="link-before-prevent-local"
      >
        Before Event Link
      </Link>
      <span
        onClick={beforeVisitPreventGlobalInertia}
        className="before-prevent-global-inertia"
      >
        Before Event - Prevent globally using Inertia Event Listener
      </span>
      <span
        onClick={beforeVisitPreventGlobalNative}
        className="before-prevent-global-native"
      >
        Before Event - Prevent globally using Native Event Listeners
      </span>

      <span onClick={cancelTokenVisit} className="canceltoken">
        Cancel Token Event
      </span>
      <Link
        href={url}
        method="post"
        onCancelToken={(event) => alert('linkOnCancelToken', event)}
        className="link-canceltoken"
      >
        Cancel Token Event Link
      </Link>

      <span onClick={cancelVisit} className="cancel">
        Cancel Event
      </span>
      <Link
        href={url}
        method="post"
        onCancelToken={(token) => token.cancel()}
        /* onCancel={(event) => alert('linkOnCancel', event)} */
        onCancel={() => alert('linkOnCancel')}
        className="link-cancel"
      >
        Cancel Event Link
      </Link>

      <span onClick={startVisit} className="start">
        Start Event
      </span>
      <Link
        href={url}
        method="post"
        /* onStart={(event) => alert('linkOnStart', event)} */
        onStart={() => alert('linkOnStart')}
        className="link-start"
      >
        Start Event Link
      </Link>

      <span onClick={progressVisit} className="progress">
        Progress Event
      </span>
      <span onClick={progressNoFilesVisit} className="progress-no-files">
        Missing Progress Event (no files)
      </span>
      <Link
        href={url}
        method="post"
        data={payloadWithFile}
        onProgress={(event) => alert('linkOnProgress', event)}
        className="link-progress"
      >
        Progress Event Link
      </Link>
      <Link
        href={url}
        method="post"
        onBefore={() => alert('linkProgressNoFilesOnBefore')}
        onProgress={(event) => alert('linkOnProgress', event)}
        className="link-progress-no-files"
      >
        Progress Event Link (no files)
      </Link>

      <span onClick={errorVisit} className="error">
        Error Event
      </span>
      <span onClick={errorPromiseVisit} className="error-promise">
        Error Event (delaying onFinish w/ Promise)
      </span>
      <Link
        href="/events/errors"
        method="post"
        /* error={(errors) => alert('linkOnError', errors)} */
        onError={() => alert('linkOnError')}
        onSuccess={() => alert('This listener should not have been called')}
        className="link-error"
      >
        Error Event Link
      </Link>
      <Link
        href="/events/errors"
        method="post"
        onError={() => callbackSuccessErrorPromise('linkOnError')}
        onSuccess={() => alert('This listener should not have been called')}
        onFinish={() => alert('linkOnFinish')}
        className="link-error-promise"
      >
        Error Event Link (delaying onFinish w/ Promise)
      </Link>

      <span onClick={successVisit} className="success">
        Success Event
      </span>
      <span onClick={successPromiseVisit} className="success-promise">
        Success Event (delaying onFinish w/ Promise)
      </span>
      <Link
        href={url}
        method="post"
        onError={() => alert('This listener should not have been called')}
        /* onSuccess={(event) => alert('linkOnSuccess', event)} */
        onSuccess={() => alert('linkOnSuccess')}
        className="link-success"
      >
        Success Event Link
      </Link>
      <Link
        href={url}
        method="post"
        onError={() => alert('This listener should not have been called')}
        onSuccess={() => callbackSuccessErrorPromise('linkOnSuccess')}
        onFinish={() => alert('linkOnFinish')}
        className="link-success-promise"
      >
        Success Event Link (delaying onFinish w/ Promise)
      </Link>

      <span onClick={invalidVisit} className="invalid">
        Finish Event
      </span>

      <span onClick={exceptionVisit} className="exception">
        Exception Event
      </span>

      <span onClick={finishVisit} className="finish">
        Finish Event
      </span>
      <Link
        href={url}
        method="post"
        /* onFinish={(event) => alert('linkOnFinish', event)} */
        onFinish={() => alert('linkOnFinish')}
        className="link-finish"
      >
        Finish Event Link
      </Link>

      <span onClick={navigateVisit} className="navigate">
        Navigate Event
      </span>

      <span onClick={lifecycleSuccess} className="lifecycle-success">
        Lifecycle Success
      </span>
      <span onClick={lifecycleError} className="lifecycle-error">
        Lifecycle Error
      </span>
      <span onClick={lifecycleCancel} className="lifecycle-cancel">
        Lifecycle Cancel
      </span>
      <span
        onClick={lifecycleCancelAfterFinish}
        className="lifecycle-cancel-after-finish"
      >
        Lifecycle Cancel - After Finish
      </span>
    </>
  )
}
