// @ts-nocheck
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Page } from '@inertiajs-revamped/react'
import bodyParser from 'body-parser'
import express, { type Response, type Request } from 'express'
import multer from 'multer'
import { createServer as createViteServer } from 'vite'

const port = process.env.PORT || 13714

const app = express()
const upload = multer()

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'custom',
})

app.use(vite.middlewares)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.all('/non-inertia', (_req, res) =>
  res.send('This is a page that does not have the Inertia app loaded.')
)

app.get('/', async (req, res) => {
  await inertia(req, res, {
    component: 'home',
    props: {
      example: 'FooBar',
    },
  })
})

app.get(
  '/links/partial-reloads',
  async (req, res) =>
    await inertia(req, res, {
      component: 'links/partial-reloads',
      props: {
        headers: req.headers,
        foo: Number.parseInt(req.query.foo || 0) + 1,
        bar: (props) => props.foo + 1,
        baz: (props) => props.foo + 2,
      },
    })
)
app.all(
  '/links/preserve-state-page-two',
  async (req, res) =>
    await inertia(req, res, {
      component: 'links/preserve-state',
      props: { foo: req.query.foo },
    })
)
app.all(
  '/links/preserve-scroll-page-two',
  async (req, res) =>
    await inertia(req, res, {
      component: 'links/preserve-scroll',
      props: { foo: req.query.foo },
    })
)
app.all(
  '/links/preserve-scroll-false-page-two',
  async (req, res) =>
    await inertia(req, res, {
      component: 'links/preserve-scroll-false',
      props: { foo: req.query.foo },
    })
)
app.get(
  '/links/as-warning/:method',
  async (req, res) =>
    await inertia(req, res, {
      component: 'links/as-warning',
      props: { method: req.params.method },
    })
)
app.get(
  '/links/as-warning-false/:method',
  async (req, res) =>
    await inertia(req, res, {
      component: 'links/as-warning-false',
      props: { method: req.params.method },
    })
)
app.get(
  '/links/headers/version',
  async (req, res) =>
    await inertia(req, res, {
      component: 'links/headers',
      version: 'example-version-header',
    })
)

app.get(
  '/visits/partial-reloads',
  async (req, res) =>
    await inertia(req, res, {
      component: 'visits/partial-reloads',
      props: {
        headers: req.headers,
        foo: Number.parseInt(req.query.foo || 0) + 1,
        bar: (props) => props.foo + 1,
        baz: (props) => props.foo + 2,
      },
    })
)
app.all(
  '/visits/preserve-state-page-two',
  async (req, res) =>
    await inertia(req, res, {
      component: 'visits/preserve-state',
      props: { foo: req.query.foo },
    })
)
app.all(
  '/visits/preserve-scroll-page-two',
  async (req, res) =>
    await inertia(req, res, {
      component: 'visits/preserve-scroll',
      props: { foo: req.query.foo },
    })
)
app.all(
  '/visits/preserve-scroll-false-page-two',
  async (req, res) =>
    await inertia(req, res, {
      component: 'visits/preserve-scroll-false',
      props: { foo: req.query.foo },
    })
)
app.post(
  '/visits/events-errors',
  async (req, res) =>
    await inertia(req, res, {
      component: 'visits/events',
      props: { errors: { foo: 'bar' } },
    })
)
app.get(
  '/visits/headers/version',
  async (req, res) =>
    await inertia(req, res, {
      component: 'visits/headers',
      version: 'example-version-header',
    })
)

app.post(
  '/remember/form-helper/default',
  async (req, res) =>
    await inertia(req, res, {
      component: 'remember/form-helper/default',
      props: {
        errors: { name: 'Some name error', handle: 'The Handle was invalid' },
      },
    })
)
app.post(
  '/remember/form-helper/remember',
  async (req, res) =>
    await inertia(req, res, {
      component: 'remember/form-helper/remember',
      props: {
        errors: { name: 'Some name error', handle: 'The Handle was invalid' },
      },
    })
)

app.post(
  '/form-helper/data',
  async (req, res) =>
    await inertia(req, res, {
      component: 'form-helper/data',
      props: {
        errors: { name: 'Some name error', handle: 'The Handle was invalid' },
      },
    })
)
app.post(
  '/form-helper/errors',
  async (req, res) =>
    await inertia(req, res, {
      component: 'form-helper/errors',
      props: {
        errors: { name: 'Some name error', handle: 'The Handle was invalid' },
      },
    })
)
app.post(
  '/form-helper/events/errors',
  async (req, res) =>
    await inertia(req, res, {
      component: 'form-helper/events',
      props: {
        errors: { name: 'Some name error', handle: 'The Handle was invalid' },
      },
    })
)

app.get(
  '/dump/get',
  upload.any(),
  async (req, res) =>
    await inertia(req, res, {
      component: 'dump',
      props: {
        headers: req.headers,
        method: 'get',
        form: req.body,
        query: req.query,
        files: req.files,
      },
    })
)
app.post(
  '/dump/post',
  upload.any(),
  async (req, res) =>
    await inertia(req, res, {
      component: 'dump',
      props: {
        headers: req.headers,
        method: 'post',
        form: req.body,
        query: req.query,
        files: req.files,
      },
    })
)
app.put(
  '/dump/put',
  upload.any(),
  async (req, res) =>
    await inertia(req, res, {
      component: 'dump',
      props: {
        headers: req.headers,
        method: 'put',
        form: req.body,
        query: req.query,
        files: req.files,
      },
    })
)
app.patch(
  '/dump/patch',
  upload.any(),
  async (req, res) =>
    await inertia(req, res, {
      component: 'dump',
      props: {
        headers: req.headers,
        method: 'patch',
        form: req.body,
        query: req.query,
        files: req.files,
      },
    })
)
app.delete(
  '/dump/delete',
  upload.any(),
  async (req, res) =>
    await inertia(req, res, {
      component: 'dump',
      props: {
        headers: req.headers,
        method: 'delete',
        form: req.body,
        query: req.query,
        files: req.files,
      },
    })
)

app.get(
  '/persistent-layouts/shorthand/simple/page-a',
  async (req, res) =>
    await inertia(req, res, { props: { foo: 'bar', baz: 'example' } })
)
app.get(
  '/persistent-layouts/shorthand/nested/page-a',
  async (req, res) =>
    await inertia(req, res, { props: { foo: 'bar', baz: 'example' } })
)

app.post(
  '/events/errors',
  async (req, res) =>
    await inertia(req, res, {
      component: 'events',
      props: { errors: { foo: 'bar' } },
    })
)

app.all('/sleep', (_req, res) => setTimeout(() => res.send(''), 2000))
app.post('/redirect', (_req, res) => res.redirect(303, '/dump/get'))
app.get('/location', (_req, res) => location(res, '/dump/get'))
app.post('/redirect-external', (_req, res) => location(res, '/non-inertia'))
app.post('/disconnect', (_req, res) => res.socket?.destroy())
app.post('/json', (_req, res) => res.json({ foo: 'bar' }))

app.all('*', async (req, res) => await inertia(req, res))

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})

async function inertia(req: Request, res: Response, data?: Partial<Page>) {
  try {
    const url = req.originalUrl

    let template = readFileSync(resolve('./index.html'), 'utf-8')
    template = await vite.transformIndexHtml(url, template)

    const page = {
      component: req.path.slice(1).split('/').join('/'),
      props: {},
      url: req.path,
      version: null,
      ...data,
    }

    const partialDataHeader = req.headers['x-inertia-partial-data'] || ''
    const partialExceptHeader = req.headers['x-inertia-partial-except'] || ''
    const partialComponentHeader =
      req.headers['x-inertia-partial-component'] || ''

    const isPartial =
      partialComponentHeader && partialComponentHeader === page.component

    page.props = Object.keys(page.props)
      .filter(
        (key) =>
          !isPartial ||
          !partialDataHeader ||
          (typeof partialDataHeader === 'string' &&
            partialDataHeader.split(',').indexOf(key) > -1)
      )
      .filter(
        (key) =>
          !isPartial ||
          !partialExceptHeader ||
          (typeof partialExceptHeader === 'string' &&
            partialExceptHeader.split(',').indexOf(key) === -1)
      )
      .reduce((carry, key) => {
        carry[key] =
          typeof page.props[key] === 'function'
            ? page.props[key](page.props)
            : page.props[key]

        return carry
      }, {})

    // xhr request
    if (req.get('X-Inertia')) {
      res.header('Vary', 'Accept')
      res.header('X-Inertia', 'true')

      return res.json(page)
    }

    // add props to `data-page` on initial load
    const html = template
      .toString()
      .replace(
        "'{{ placeholder }}'",
        JSON.stringify(page, null).replace(/\"/g, '&quot;')
      )

    return res.send(html)
  } catch (e) {
    if (e instanceof Error) {
      console.log(e)
    }
  }
}

function location(res: Response, href: string) {
  return res.status(409).header('X-Inertia-Location', href).send('')
}

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeFullReload', async () => {
    await vite.close()
  })
}
