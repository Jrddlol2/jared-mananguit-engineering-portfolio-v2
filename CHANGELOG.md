# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased] — V2 fork

This repository forked from [`jared-mananguit-engineering-portfolio`](https://github.com/Jrddlol2/jared-mananguit-engineering-portfolio) (V1) to host an editorial redesign without risking the original. Entries below this point are V2-specific; entries further down predate the fork and are shared history.

### Production readiness pass

- **Documentation:** rewrote `README.md` for V2's actual current state (design system + hero redesigned, remaining sections unchanged from V1), and added `docs/ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md`, `docs/CONTRIBUTING.md`, `docs/TESTING.md`, `docs/DEPLOYMENT.md`, and `docs/PROMPT_ENGINEERING.md`.
- **Screenshots:** replaced the stale pre-redesign screenshot set with 8 fresh captures (homepage, hero, dark mode, projects section, certifications, project detail page, an engineering illustration, and mobile) reflecting the current palette/typography.
- **GitHub Pages deployment:** added `.github/workflows/deploy.yml` (build → `actions/upload-pages-artifact` → `actions/deploy-pages`, triggered on push to `main`). No base-path configuration was needed — every asset reference in the codebase is already relative, verified by grep.
- **SEO/production basics:** added `assets/favicon.svg`, Open Graph + Twitter Card meta tags, a `<link rel="canonical">`, `theme-color` meta for both themes, `robots.txt`, and `sitemap.xml` (all wired into `scripts/build.mjs`'s copy list).
- **Repository cleanup:** removed `CV/Projects/` (confirmed byte-identical duplicate of `project_documents/`, which is what the V2 brief's own asset references point to).
- **CI:** `.github/workflows/ci.yml` now installs Playwright's Chrome channel and runs the full test suite (`npm run test`, which is link-check + Playwright), uploading the HTML report as an artifact on every run.

### Testing

- Added a full Playwright E2E suite (`tests/e2e/`, `playwright.config.ts`) — 84 tests across desktop Chrome and a mobile Chrome device profile: navigation (incl. a full internal-link crawl), homepage, project pages, certificates/résumé (real PDF fetches, not just href-string checks), responsive layout, search, theme persistence, and accessibility (`@axe-core/playwright` scans plus manual heading-hierarchy and keyboard-reachability checks).
- Uses the machine's installed Google Chrome (`channel: 'chrome'`) rather than downloading Playwright's bundled browser, and `python -m http.server` rather than the `serve` npm package as the test web server, since `serve`'s clean-URL rewriting (`/index.html` → `/`) doesn't match GitHub Pages' literal static-file behavior and produced false test failures.
- Capped `workers: 4` with `retries: 1` after the full suite occasionally hit `ECONNREFUSED` against the local dev server under unlimited parallelism.

### Fixed (real bugs the new tests/docs pass surfaced)

- `scripts/build.mjs` never copied `Jared_Mananguit_Resume.pdf` into `dist/` — every production build was silently missing the résumé. Also removed a stale `public/` entry from the same list.
- Removing the old homepage hero's classes (`.masthead__eyebrow`, `.status-stamp`, `.masthead__tagline`, `.masthead__meta-table`) in the hero-redesign commit had also deleted their CSS rules — but all 5 project pages still use those exact classes for their own local masthead. Every project page had been rendering unstyled since that commit; rules restored.
- "Technical Competencies" subheadings were `<h4>`, skipping `<h3>` in the document's heading hierarchy — a real accessibility defect, unrelated to the V2 redesign. Retagged to `<h3>` with zero visual change (they already carried a `.kicker` utility class for all their styling).
- The skip-link's target (`<main id="main-content">`) had no `tabindex`, so activating it never actually moved keyboard/screen-reader focus there — only scrolled. Added `tabindex="-1"` across `index.html` and all 5 project pages.

### Added (design/redesign milestones)

- V2 baseline: forked from V1 with full git history via local clone; brought `project_documents/` (previously untracked in V1) under version control.
- Design foundation: new warm ivory/graphite/forest-green color palette (light + dark) and Newsreader serif replacing Fraunces, reusing V1's existing (partially unfinished) "Editorial Instrument" token architecture rather than rebuilding it.
- Hero rebuilt as a "magazine masthead + standfirst": kicker → name → italic standfirst → thin rule → byline → actions, replacing the bordered status-stamp/meta-table/telemetry-strip datasheet treatment. All copy reused verbatim from the existing bio.

## [Unreleased — pre-fork] (V1)

### Added

- Real screenshot of the site (`docs/screenshot.png`) in place of the placeholder README preview image.
- Five additional real screenshots (desktop, mobile, engineering illustration, projects, certifications) replacing the README's screenshot placeholders.
- Expanded `README.md`: table of contents, Design Philosophy, expanded Key Features (what/why/benefit), a rationale-driven Technology Stack table, Engineering Illustrations, AI-Assisted Development, and Quality Assurance sections.

## [1.0.0] - 2026-07-07

### Changed

- Migrated the project out of Google AI Studio into a standalone repository.
- Promoted the static site from `CV/portfolio/` to the repository root, which is now the single source of truth.
- Flattened `public/` (résumé + certificate PDFs) to match the paths the HTML actually references, fixing broken links that were previously masked by Vite's dev-only `public/` convention.

### Removed

- Unused React/Vite/Tailwind scaffold (`src/`, `vite.config.ts`, `tsconfig.json`) that was never wired into the real site.
- 18 one-off `patch*.cjs` migration scripts; their effects were already applied to the site's CSS/HTML.
- Unused dependencies (`@google/genai`, `express`, `dotenv`, `lucide-react`, `motion`, `react`, `react-dom`, `tailwindcss`) and the now-unnecessary `.env.example`.

### Added

- `scripts/check-links.mjs` — verifies every local `href`/`src` in the site resolves to a real file; wired up as `npm test`.
- `scripts/build.mjs` — assembles a deployable static copy in `dist/`.
- Lint tooling (`htmlhint`, `stylelint`) and CI workflow for lint/build/test.
- `LICENSE` (MIT), `CONTRIBUTING.md`, this changelog, and GitHub issue/PR templates.
