# Testing

## Overview

Two independent checks make up `npm test`:

1. **`scripts/check-links.mjs`** (`npm run test:links`) — a ~60-line Node script with no dependencies. It scans `index.html` and every `projects/*.html` for local `href`/`src` attributes and asserts each one resolves to a real file on disk. This is the fast, zero-browser sanity check that catches the most common regression in a static site: a moved or renamed file breaking a reference to it. (This is exactly the class of bug that shipped once already — see the V1 [`CHANGELOG.md`](../CHANGELOG.md) entry about the `public/` asset path.)
2. **Playwright** (`npm run test:e2e`) — 84 end-to-end tests across two browser profiles (desktop Chrome, mobile Chrome via the Pixel 7 device profile), covering real user interactions in a real browser.

## Running the suite

```bash
npm test                 # both checks, matches CI exactly
npm run test:e2e          # Playwright only
npm run test:e2e:ui       # Playwright's interactive UI mode — best for debugging
npx playwright test tests/e2e/search.spec.ts   # a single file
npx playwright test --project=chromium          # a single browser profile
```

On first run, `npm install` also needs Playwright's browser: this project uses the machine's actual installed Google Chrome (`channel: 'chrome'` in `playwright.config.ts`) rather than downloading Playwright's bundled Chromium, so nothing extra is needed locally if Chrome is already installed. In CI, `.github/workflows/ci.yml` runs `npx playwright install --with-deps chrome` first.

## What each spec file covers

| File | Covers |
| :--- | :--- |
| `navigation.spec.ts` | Bookmark rail completeness and scroll targeting, skip-link keyboard behavior, project-page back-links, and a full internal-link crawl across all 6 pages (every unique local link is fetched and asserted non-error) |
| `homepage.spec.ts` | Page title, zero console errors, hero content (name/standfirst/byline/actions), presence of all 6 document sections, and a basic load-time smoke check |
| `projects.spec.ts` | Each of the 5 Application Note pages: correct title, correct heading, its SVG diagram is visible with an accessible name, zero console errors, theme/print controls present |
| `certificates.spec.ts` | Both certificate links and the résumé link: correct `target`/`rel`, and the actual PDF is fetched and asserted to return `200` with a `pdf` content type — not just that the `href` string looks right |
| `responsive.spec.ts` | Bookmark rail vs. mobile ToC visibility at desktop/tablet/mobile widths, mobile ToC actually opens on click, no horizontal overflow, and the hero name never overflows its container from 375px to 1600px |
| `search.spec.ts` | Opening via `Ctrl+K` and via the trigger button, filtering, the empty-results state, `Enter`-to-navigate, `Escape`-to-close with focus restoration, and backdrop-click-to-close |
| `theme.spec.ts` | Respecting `prefers-color-scheme` on first visit, the toggle actually flipping `data-theme` and its visible label, and persistence across both a reload and a navigation to a different page |
| `accessibility.spec.ts` | Automated `@axe-core/playwright` scans (homepage + a project page, failing on `serious`/`critical` violations), every diagram has an accessible name, correct heading hierarchy, and keyboard reachability of the skip link and utility-bar controls |

## Design decisions worth knowing about

**Why plain `python -m http.server` instead of the `serve` npm package for the test web server.** `serve` silently rewrites "clean URLs" — `/index.html` redirects to `/`, `/projects/foo.html` redirects to `/projects/foo`. GitHub Pages does not do this; it serves the literal file. Testing against `serve` produced failures that looked like site bugs (a back-link's asserted URL never matched) but were actually artifacts of the dev tool, not the site. Switching the test server to a literal static-file server removed that entire class of false result.

**Why `channel: 'chrome'` instead of Playwright's bundled Chromium.** Purely a local-dev convenience — it reuses an already-installed browser instead of downloading a second one. CI installs real Chrome explicitly for the same reason: consistency between what's tested locally and in CI.

**Why axe-core failures are filtered to `serious`/`critical`.** `moderate`/`minor` axe findings often include subjective or context-dependent rules; gating merges on `serious`/`critical` only keeps the check meaningful (a real barrier to some users) without becoming noisy enough to get ignored.

**Why `workers` is capped at 4 with 1 retry, rather than unlimited/0.** Running the full 84-test suite with Playwright's default (CPU-core-count) worker count occasionally produced an `ECONNREFUSED` against the local `python -m http.server` — it handles concurrent requests via threading but can still drop a connection under a sudden burst from many parallel workers. A modest worker cap plus a single retry absorbs this without giving up meaningful parallelism or masking a real failure (a genuinely broken assertion still fails on retry). In practice this means `homepage.spec.ts`'s load-time smoke test (which asserts a generous but real 5-second budget) can occasionally need its one retry when the machine is under heavy load from the rest of the suite running in parallel — that's expected behavior for a timing-sensitive test, not a regression.

## Debugging a failure

```bash
npx playwright test --project=chromium --debug     # step through in a headed browser
npx playwright show-report                          # open the last HTML report
```

Failures capture a screenshot and (on retry) a trace automatically — see `playwright.config.ts`'s `use.screenshot` / `use.trace` settings. `test-results/` and `playwright-report/` are gitignored; they're local/CI artifacts, not something to commit.

## A real bug this suite has already caught

While first writing this suite, it caught: a `<main>` element that the skip-link pointed at but that had no `tabindex`, so activating the skip-link never actually moved keyboard focus there (only scrolled) — and a set of CSS rules for the project pages' local masthead that had been accidentally deleted in an earlier commit, leaving all 5 project pages rendering without their intended badge/metadata styling. Both are fixed; see the `git log` for the exact commit. This is the kind of regression a link-checker or manual spot-check would not have found, but an interaction-level E2E test did.
