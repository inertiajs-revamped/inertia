import { defineConfig, devices } from '@playwright/test'

// Base URL to use in actions like `await page.goto('/')`.
const baseURL = `http://localhost:${process.env.UI === 'react' ? 13714 : 13715}/`

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  maxFailures: process.env.CI ? 10 : undefined,
  reporter: [['html', { outputFolder: `report-${process.env.UI || 'react'}` }]],
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
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
  // todo: refactor server.ts to work dynamic
  webServer: {
    command: `pnpm --filter=e2e-${process.env.UI || 'react'} serve`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
})
