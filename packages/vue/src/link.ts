import {
  type FormDataConvertible,
  type Method,
  type PreserveStateOption,
  mergeDataIntoQueryString,
  router,
  shouldIntercept,
} from '@inertiajs-revamped/core'
import { type PropType, defineComponent, h } from 'vue'

export type BaseInertiaLinkProps = InstanceType<typeof Link>['$props']

export const Link = defineComponent({
  name: 'Link',
  props: {
    as: {
      type: String,
      default: 'a',
    },
    data: {
      type: Object as PropType<Record<string, FormDataConvertible>>,
      default: () => ({}),
    },
    href: {
      type: String,
      required: true,
    },
    method: {
      type: String as PropType<Method>,
      default: 'get' as const,
    },
    headers: {
      type: Object as PropType<Record<string, string>>,
      default: () => ({}),
    },
    preserveScroll: {
      type: [String, Boolean, Function] as PropType<PreserveStateOption>,
      default: false,
    },
    preserveState: {
      type: [String, Boolean, Function] as PropType<PreserveStateOption>,
      default: null,
    },
    replace: {
      type: Boolean,
      default: false,
    },
    only: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    except: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    queryStringArrayFormat: {
      type: String as PropType<'indices' | 'brackets'>,
      default: 'brackets',
    },
  },
  emits: [
    'before',
    'start',
    'progress',
    'finish',
    'cancel',
    'success',
    'error',
    'cancel-token',
  ],
  setup(props, { slots, attrs, emit }) {
    return () => {
      const as =
        typeof props.as === 'string' ? props.as.toLowerCase() : props.as
      const method = props.method.toLowerCase() as Method
      const [href, data] = mergeDataIntoQueryString(
        method,
        props.href || '',
        props.data,
        props.queryStringArrayFormat
      )

      if (as === 'a' && method !== 'get') {
        console.warn(
          `Creating POST/PUT/PATCH/DELETE <a> links is discouraged as it causes "Open Link in New Tab/Window" accessibility issues. Please specify a more appropriate element using the "as" attribute. For example: <Link href="${href}" method="${method}" as="button">...</Link>`
        )
      }

      return h(
        props.as,
        {
          ...attrs,
          ...(as === 'a' ? { href } : { role: 'link' }),
          onClick: (event: MouseEvent | KeyboardEvent) => {
            if (shouldIntercept(event)) {
              event.preventDefault()

              router.visit(href, {
                data: data,
                method: method,

                headers: props.headers,
                preserveScroll: props.preserveScroll,
                preserveState: props.preserveState ?? method !== 'get',
                replace: props.replace,
                only: props.only,
                except: props.except,
                onCancelToken: (...args) => emit('cancel-token', ...args),
                onBefore: (...args) => emit('before', ...args),
                onStart: (...args) => emit('start', ...args),
                onProgress: (...args) => emit('progress', ...args),
                onFinish: (...args) => emit('finish', ...args),
                onCancel: (...args) => emit('cancel', ...args),
                onSuccess: (...args) => emit('success', ...args),
                onError: (...args) => emit('error', ...args),
              })
            }
          },
        },
        slots
      )
    }
  },
})
