import { defineConfig, devices } from '@playwright/test'

const baseURL = `http://localhost:${process.env.UI === 'react' ? 13714 : 13715}/`

export default defineConfig({
  testDir: './tests',
  // Run all tests in parallel.
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: `report-${process.env.UI || 'react'}` }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  // Run your local dev server before starting the tests.
  webServer: {
    command: `pnpm --filter=e2e-${process.env.UI || 'react'} serve`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
})
