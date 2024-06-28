import { expect, test } from '@playwright/test'

test.describe('"as" warning', () => {
  test('shows no warning when using GET inertia-links', async ({ page }) => {
    page.on('console', (msg) => {
      if (msg.type() === 'warning') {
        expect(msg.text()).not.toContain('Creating POST/PUT/PATCH/DELETE')
      }
    })

    await page.goto('/links/as-warning/get')
  })

  test('shows a warning when using POST inertia-links using the anchor tag', async ({
    page,
  }) => {
    page.on('console', (msg) => {
      if (msg.type() === 'warning') {
        expect(msg.text()).toEqual(
          'Creating POST/PUT/PATCH/DELETE <a> links is discouraged as it causes "Open Link in New Tab/Window" accessibility issues. Please specify a more appropriate element using the "as" attribute. For example: <Link href="/example" method="post" as="button">...</Link>'
        )
      }
    })

    await page.goto('/links/as-warning/post')
  })

  test('shows no warning when using POST inertia-links "as" a non-anchor tag', async ({
    page,
  }) => {
    page.on('console', (msg) => {
      if (msg.type() === 'warning') {
        expect(msg.text()).not.toContain('Creating POST/PUT/PATCH/DELETE')
      }
    })

    await page.goto('/links/as-warning-false/post')
  })

  test('shows a warning when using PUT inertia-links using the anchor tag', async ({
    page,
  }) => {
    page.on('console', (msg) => {
      if (msg.type() === 'warning') {
        expect(msg.text()).toEqual(
          'Creating POST/PUT/PATCH/DELETE <a> links is discouraged as it causes "Open Link in New Tab/Window" accessibility issues. Please specify a more appropriate element using the "as" attribute. For example: <Link href="/example" method="put" as="button">...</Link>'
        )
      }
    })

    await page.goto('/links/as-warning/put')
  })

  test('shows no warning when using PUT inertia-links "as" a non-anchor tag', async ({
    page,
  }) => {
    page.on('console', (msg) => {
      if (msg.type() === 'warning') {
        expect(msg.text()).not.toContain('Creating POST/PUT/PATCH/DELETE')
      }
    })

    await page.goto('/links/as-warning-false/put')
  })

  test('shows a warning when using PATCH inertia-links using the anchor tag', async ({
    page,
  }) => {
    page.on('console', (msg) => {
      if (msg.type() === 'warning') {
        expect(msg.text()).toEqual(
          'Creating POST/PUT/PATCH/DELETE <a> links is discouraged as it causes "Open Link in New Tab/Window" accessibility issues. Please specify a more appropriate element using the "as" attribute. For example: <Link href="/example" method="patch" as="button">...</Link>'
        )
      }
    })

    await page.goto('/links/as-warning/patch')
  })

  test('shows no warning when using PATCH inertia-links "as" a non-anchor tag', async ({
    page,
  }) => {
    page.on('console', (msg) => {
      if (msg.type() === 'warning') {
        expect(msg.text()).not.toContain('Creating POST/PUT/PATCH/DELETE')
      }
    })

    await page.goto('/links/as-warning-false/patch')
  })

  test('shows a warning when using DELETE inertia-links using the anchor tag', async ({
    page,
  }) => {
    page.on('console', (msg) => {
      if (msg.type() === 'warning') {
        expect(msg.text()).toEqual(
          'Creating POST/PUT/PATCH/DELETE <a> links is discouraged as it causes "Open Link in New Tab/Window" accessibility issues. Please specify a more appropriate element using the "as" attribute. For example: <Link href="/example" method="delete" as="button">...</Link>'
        )
      }
    })

    await page.goto('/links/as-warning/delete')
  })

  test('shows no warning when using DELETE inertia-links "as" a non-anchor tag', async ({
    page,
  }) => {
    page.on('console', (msg) => {
      if (msg.type() === 'warning') {
        expect(msg.text()).not.toContain('Creating POST/PUT/PATCH/DELETE')
      }
    })

    await page.goto('/links/as-warning-false/delete')
  })
})
