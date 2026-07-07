import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  // Capped rather than unlimited: `python -m http.server` (chosen over `serve`
  // to match GitHub Pages' literal static-file behavior — see below) can
  // occasionally refuse a connection under very high parallel request load.
  // A modest worker cap plus a single retry makes the suite reliable without
  // giving up meaningful parallelism.
  workers: 4,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    // Plain python http.server rather than `serve` (npm) — `serve` silently
    // rewrites clean URLs (e.g. /projects/x.html -> /projects/x, /index.html
    // -> /), which GitHub Pages does NOT do. Matching production's literal
    // static-file behavior avoids false positives/negatives in the suite.
    command: 'python -m http.server 4173',
    url: 'http://127.0.0.1:4173/index.html',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'], channel: 'chrome' },
    },
  ],
});
