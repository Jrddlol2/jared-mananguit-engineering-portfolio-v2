# Jared Asher Mananguit — Engineering Portfolio (V2)

> An engineering portfolio built and read like a technical publication, not a résumé site.

[![CI](https://github.com/Jrddlol2/jared-mananguit-engineering-portfolio-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/Jrddlol2/jared-mananguit-engineering-portfolio-v2/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/Jrddlol2/jared-mananguit-engineering-portfolio-v2/actions/workflows/deploy.yml/badge.svg)](https://github.com/Jrddlol2/jared-mananguit-engineering-portfolio-v2/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-444444?style=flat-square)](LICENSE)
![No framework](https://img.shields.io/badge/frontend-vanilla%20HTML%2FCSS%2FJS-444444?style=flat-square)

![Homepage](docs/images/desktop/homepage.png)

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Testing](#testing)
- [Documentation Images](#documentation-images)
- [Performance](#performance)
- [Accessibility](#accessibility)
- [Future Improvements](#future-improvements)
- [Author](#author)
- [License](#license)

---

## Overview

### Purpose

This is the personal engineering portfolio of **Jared Asher Mananguit**, a BS Electronics Engineering student at the University of Santo Tomas. Its job is to let an engineering manager, a technical recruiter, or a peer evaluate *how someone thinks*, not just skim a list of what they built.

### Design Philosophy

A screenshot and a one-line caption don't communicate engineering competence — the reasoning behind a design does. So the site rejects the conventional portfolio layout (hero photo, skills cloud, project thumbnails) in favor of one built like a piece of technical documentation: numbered sections (`§1.0`, `§2.0`, …), a sidebar bookmark rail in place of a nav bar, and document-control metadata borrowed from IEEE papers and semiconductor application notes.

Every layout decision is checked against one question: *would this be believable inside official documentation from an IEEE journal or a semiconductor datasheet?* CSS is layered by responsibility (`tokens` → `base` → `layout` → `components` → `utilities` → `motion` → `print`), so a color or spacing change is safe to make in one place instead of hunting through component files. Full rationale, token values, and the color/type system live in [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md).

### Editorial Approach

Each of the five projects under [`projects/`](projects/) is written and laid out as a full **Application Note** — problem statement, design decisions, validation, lessons learned — not a portfolio blurb. The homepage itself reads as a chapter-by-chapter publication: scrolling promotes the active section in the Contents rail (heavier weight, larger size, an animated indicator line), each `§` section fades and settles into place like a chapter opening, and the page background shifts almost imperceptibly between warm and cool neutral tones to mark the transition — motion that supports reading rather than competing with it. It respects `prefers-reduced-motion` throughout.

## Live Demo

| Host | URL | Status |
| :--- | :--- | :--- |
| **GitHub Pages** | [jrddlol2.github.io/jared-mananguit-engineering-portfolio-v2](https://jrddlol2.github.io/jared-mananguit-engineering-portfolio-v2/) | Live — auto-deploys from `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) |
| **Vercel** | Not published under this repository yet | Fully configured via [`vercel.json`](vercel.json) — see [Installation → Deploy](#deploy) to stand up your own instance in one command |

## Features

| Feature | What it actually does |
| :--- | :--- |
| **Responsive Design** | A two-column bookmark-rail-and-reading-column layout above ~1080px collapses to a single column with a `<details>`-based mobile Contents menu below it. Fluid `clamp()` type scaling — not fixed breakpoint jumps — verified from 320px through ultrawide by [`tests/e2e/responsive.spec.ts`](tests/e2e/responsive.spec.ts). |
| **Editorial UI** | Numbered `§` sections, alternating warm/cool section backgrounds, split layouts, pull quotes, and full-bleed diagram moments create visual rhythm across the page instead of one repeating card pattern. |
| **Dark Mode** | A minimalist icon toggle (moon/sun) in the utility bar — `aria-label`, `aria-pressed`, and full keyboard support — persisted per-browser via `localStorage` and respecting the OS `prefers-color-scheme` on first visit. |
| **Accessibility** | A working skip link with a focusable target, correct heading hierarchy, `prefers-reduced-motion` support throughout, and automated `axe-core` scans in CI. See [Accessibility](#accessibility). |
| **Animations** | Scroll-triggered `.reveal` fades/motion, a scroll-progress bar, an active-chapter indicator that settles-then-arrives on each section change, and a subtle blueprint-grid background — all built with plain CSS transitions and one shared `IntersectionObserver`, no animation library. |
| **Project Showcase** | Five in-depth Application Note pages under [`projects/`](projects/), each a self-contained case study with its own local masthead, mobile Contents menu, and section-by-section write-up. |
| **Engineering Timeline** | A structured Professional Experience & Involvement table (§5) — role, organization, dates, description — covering academic distinctions and applied work, not just job titles. |
| **Resume** | Presented as a curated publication: a real cover-image thumbnail (generated from the PDF's first page) linking straight to the current résumé PDF, not a blind download link. |
| **Certificates** | Both CCNA certificates (Cisco Networking Academy) presented the same way — cover-image card, issuer, status, year — linking to the real certificate PDFs. |

## Technology Stack

| Layer | Choice | Why |
| :--- | :--- | :--- |
| **Framework** | None — semantic HTML5 | No virtual DOM, no hydration, no build step required to run the site at all. |
| **Language** | Vanilla JavaScript (ES modules) | Progressive enhancement only — [`js/`](js/) holds `theme.js`, `nav.js`, `search.js`, `reveal.js`, `engineering-fx.js`, `main.js`. Every module starts with an early-return guard and no-ops safely if its markup is absent. |
| **Styling** | Modular CSS3, ITCSS-inspired | Seven layers loaded in a deliberate order — `tokens` → `base` → `layout` → `components` → `utilities` → `motion` → `print` — so a global token change is safe to make in one file. See [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md). |
| **Typography** | Newsreader (variable) + Inter + IBM Plex Mono | Self-hosted `woff2`; serif for editorial headings, sans for high-density body copy, mono for anything that reads as data (kickers, specs, table headers). |
| **Icons** | Hand-authored inline SVG | Every diagram and header icon (search, dark-mode toggle) is real DOM SVG using `currentColor` strokes, so it inverts automatically between themes with no duplicate dark-mode asset and `vector-effect="non-scaling-stroke"` keeps line weight constant at any size. |
| **Deployment** | GitHub Pages (automatic) + Vercel (configured) | Both serve the exact same `npm run build` output — see [Live Demo](#live-demo) and [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md). |
| **Testing** | Playwright + axe-core | 84 end-to-end tests across two browser projects (Desktop Chrome, Pixel 7), plus automated accessibility scans. See [Testing](#testing). |
| **Automation** | GitHub Actions, npm scripts, Node.js | CI (lint → build → test) on every push/PR ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)), automatic Pages deploy on `main` ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)), and local npm scripts for dev/lint/build/link-checking — no bundler anywhere in the chain. |

## Folder Structure

```text
(repo root)
├── index.html               # Homepage: hero + six numbered document sections
├── css/                      # ITCSS-inspired layers, loaded in this exact order
│   ├── tokens.css              # 1. color / type / spacing custom properties
│   ├── base.css                 # 2. element resets, base typography, .reveal/.sr-only
│   ├── layout.css                # 3. .page-shell grid, .doc-section rhythm
│   ├── components.css             # 4. masthead, bookmark rail, search panel, cards
│   ├── utilities.css               # 5. small single-purpose helper classes
│   ├── motion.css                   # 6. all @keyframes and transition rules
│   └── print.css                     # 7. print-only overrides
├── js/                       # Vanilla ES modules, each independent and defensive
│   ├── theme.js                # dark/light toggle + localStorage persistence
│   ├── nav.js                   # bookmark-rail scroll-spy (IntersectionObserver)
│   ├── search.js                  # command palette (index.html only)
│   ├── reveal.js                    # scroll-triggered .reveal animations
│   ├── engineering-fx.js             # scroll-progress bar, console-footer rotator
│   └── main.js                        # print button wiring
├── projects/                # Five Application Note case-study pages (AN-001..AN-005)
├── assets/
│   ├── fonts/                  # self-hosted woff2 (Newsreader, Inter, IBM Plex Mono)
│   ├── certificates/             # published certificate PDFs
│   └── previews/                  # generated cover images for résumé/certificates
├── Jared_Mananguit_Resume.pdf # published résumé, linked from the hero and §6
├── scripts/                  # build.mjs, check-links.mjs, screenshot/preview generators
├── tests/e2e/                # Playwright end-to-end test suite (see Testing)
├── playwright.config.ts
├── docs/                     # extended documentation + docs/images/ screenshot library
└── CV/, project_documents/   # source material, not linked from the published site
```

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for what each directory is responsible for, the CSS/JS load order, and why it's organized this way.

## Installation

**Prerequisites:** Python 3 (simplest static server) or Node.js 18+ (for lint/test/dev/build scripts).

### Clone

```bash
git clone https://github.com/Jrddlol2/jared-mananguit-engineering-portfolio-v2.git
cd jared-mananguit-engineering-portfolio-v2
```

### Install

```bash
npm install
```

### Run

```bash
# Option A — zero dependencies
python -m http.server 8080

# Option B — via npm scripts
npm run dev      # serves the site on http://localhost:3000
```

### Build

```bash
npm run build     # assembles a deployable copy in dist/ (no bundling — a plain file copy)
npm run lint       # HTML + CSS linting (htmlhint + stylelint)
```

### Deploy

```bash
# GitHub Pages — automatic on every push to main, no action needed
# (one-time repo setting: Settings → Pages → Source → "GitHub Actions")

# Vercel
npm install -g vercel
vercel                   # first run: links the project, deploys a preview
vercel --prod            # promotes to the production URL
```

> [!NOTE]
> **No environment variables required.** This is a static site with no backend. Full deployment mechanics, troubleshooting, and why `vercel.json` sets an explicit `outputDirectory` are in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Testing

### Why Playwright

The site has no server and no application logic to unit-test — its risk lives entirely in the browser: does the hero render, does search actually filter, does the theme toggle persist, does a certificate link resolve to a real PDF. **[Playwright](https://playwright.dev/)** (`@playwright/test`, configured in [`playwright.config.ts`](playwright.config.ts)) exercises those things directly in a real, installed **Google Chrome** (`channel: 'chrome'`, not Playwright's bundled Chromium) across two projects: `chromium` (Desktop Chrome viewport) and `mobile-chrome` (Pixel 7 device emulation).

### Running Tests

```bash
npm install                                  # installs @playwright/test and @axe-core/playwright
npx playwright install --with-deps chrome    # only needed if Google Chrome isn't already installed

npm test                                     # link-check + the full Playwright suite
npm run test:e2e                             # Playwright suite only, both browser projects
npx playwright test tests/e2e/search.spec.ts # a single test file
npx playwright test --headed                 # visible-browser mode
npx playwright test --project=chromium       # a single browser project
npm run test:e2e:ui                          # Playwright's interactive UI mode
npm run test:e2e:report                      # opens the last HTML report
```

### Coverage

**84 tests across 8 spec files**, verified live against this repository (`npx playwright test --list`):

| Spec file | Covers |
| :--- | :--- |
| `navigation.spec.ts` | Every bookmark-rail link scrolls its target into view, skip link keyboard focus, project-page back-links, and a full crawl of every internal link across all 6 pages for 404s. |
| `homepage.spec.ts` | Page title, zero console errors, hero content, presence of all six document sections, load-time smoke test. |
| `projects.spec.ts` | Each of the 5 Application Note pages — title/heading, SVG diagram accessible name, zero console errors. |
| `certificates.spec.ts` | Certificate and résumé link `target`/`rel` correctness, and a real fetch of the linked PDF asserting `200` + PDF content type. |
| `responsive.spec.ts` | Rail vs. mobile-ToC visibility at desktop/tablet/mobile widths, mobile ToC opens on click, zero horizontal overflow, hero name never overflows from 375px–1600px. |
| `search.spec.ts` | `Ctrl+K` and trigger-button open, live filtering, empty-results state, `Enter`-to-navigate, `Escape`-to-close with focus restoration, backdrop-click-to-close. |
| `theme.spec.ts` | OS `prefers-color-scheme` on first visit, toggle flips `data-theme` + visible state, persistence across reload and across page navigation. |
| `accessibility.spec.ts` | `@axe-core/playwright` scans (fails on `serious`/`critical`), every diagram has an accessible name, heading hierarchy, keyboard reachability. |

**Not yet covered**, stated plainly rather than left ambiguous: cross-browser testing beyond Chrome (no Firefox/WebKit projects), a dedicated performance budget beyond the CI smoke assertion, and visual regression (screenshot-diff) testing.

**CI:** [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs `npm run lint`, `npm run build`, and `npm run test` on every push/PR to `main`; the HTML report uploads as an artifact even on failure. See [`docs/TESTING.md`](docs/TESTING.md) for debugging tips and the reasoning behind specific configuration choices.

## Documentation Images

Generated with Playwright at high resolution, capturing the site as it currently stands. Source script: [`scripts/generate-doc-screenshots.mjs`](scripts/generate-doc-screenshots.mjs).

### Desktop (1440×900)

| | |
| :---: | :---: |
| **Homepage** <br> ![Homepage](docs/images/desktop/homepage.png) | **Full Page** <br> ![Full page](docs/images/desktop/full-page.png) |
| **Dark Mode** <br> ![Dark mode](docs/images/desktop/dark-mode.png) | **Navigation (Contents rail)** <br> ![Navigation](docs/images/desktop/navigation.png) |
| **About (§1 Introduction)** <br> ![About](docs/images/desktop/about.png) | **Skills (§3 Technical Competencies)** <br> ![Skills](docs/images/desktop/skills.png) |
| **Projects (§4 Engineering Projects)** <br> ![Projects](docs/images/desktop/projects.png) | **Project Cards** <br> ![Project cards](docs/images/desktop/project-cards.png) |
| **Experience (§5)** <br> ![Experience](docs/images/desktop/experience.png) | **Timeline (Experience table)** <br> ![Timeline](docs/images/desktop/timeline.png) |
| **Résumé Preview (§6)** <br> ![Resume preview](docs/images/desktop/resume-preview.png) | **Certificate Preview (§6)** <br> ![Certificate preview](docs/images/desktop/certificate-preview.png) |
| **Contact (hero action row)** <br> ![Contact](docs/images/desktop/contact.png) | **Editorial Scrolling (mid-scroll state)** <br> ![Editorial scrolling](docs/images/desktop/editorial-scrolling.png) |
| **Research (Application Note case study)** <br> ![Research](docs/images/desktop/research.png) | |

### Tablet (834×1194)

| | | |
| :---: | :---: | :---: |
| **Homepage** <br> ![Tablet homepage](docs/images/tablet/homepage.png) | **Projects** <br> ![Tablet projects](docs/images/tablet/projects.png) | **Contact** <br> ![Tablet contact](docs/images/tablet/contact.png) |

### Mobile (iPhone 15 Pro, 393×852)

| | | |
| :---: | :---: | :---: |
| **Homepage** <br> ![Mobile homepage](docs/images/mobile/homepage.png) | **About** <br> ![Mobile about](docs/images/mobile/about.png) | **Projects** <br> ![Mobile projects](docs/images/mobile/projects.png) |
| **Contact** <br> ![Mobile contact](docs/images/mobile/contact.png) | **Navigation menu (expanded)** <br> ![Mobile navigation](docs/images/mobile/navigation.png) | **Dark Mode** <br> ![Mobile dark mode](docs/images/mobile/dark-mode.png) |

## Performance

Measured with **Lighthouse 13.4.0** against a local production-equivalent server (`python -m http.server`), 2026-07-08 — reproducible with:

```bash
npx lighthouse http://localhost:8080/index.html --preset=desktop --chrome-flags="--headless"
npx lighthouse http://localhost:8080/index.html --chrome-flags="--headless"   # mobile preset (default)
```

| Metric | Desktop | Mobile |
| :--- | :---: | :---: |
| **Performance score** | 99 | 91 |
| **First Contentful Paint** | 0.7 s | 2.4 s |
| **Largest Contentful Paint** | 0.8 s | 3.1 s |
| **Total Blocking Time** | 0 ms | 0 ms |
| **Cumulative Layout Shift** | 0 | 0.006 |
| **Speed Index** | 0.7 s | 2.4 s |
| **Total page weight** | 298 KiB | 298 KiB |

The gap between desktop and mobile scores is entirely simulated network/CPU throttling in Lighthouse's mobile preset, not a heavier page — total byte weight is identical on both. No framework runtime, no render-blocking JS bundle, and no unused CSS shipped to the client (every stylesheet is hand-written and used) are the main reasons the page loads this fast without any dedicated performance-tuning work.

## Accessibility

- **Score: 100/100** on Lighthouse's Accessibility category (see [Performance](#performance) for how it was measured), on both desktop and mobile.
- **Skip link** to `#main-content` that is actually keyboard-reachable and moves focus, not just a visually-hidden anchor.
- **Correct heading hierarchy** verified by [`tests/e2e/accessibility.spec.ts`](tests/e2e/accessibility.spec.ts), not just eyeballed.
- **Automated `@axe-core/playwright` scans** of the homepage and a project page in the E2E suite, failing the build on any `serious`/`critical` violation.
- **Every SVG diagram has an accessible name** (`<title>` + `role="img"`/`aria-labelledby`), asserted per-project by the test suite.
- **`prefers-reduced-motion` respected throughout** — every scroll-reveal, chapter-indicator transition, and background shift either shortens or disables itself for users who request less motion.
- **Dark mode toggle and search trigger** are real `<button>` elements with `aria-label`/`aria-pressed`/`aria-haspopup` as appropriate, keyboard-operable, and screen-reader-labeled — not `<div>`s with click handlers.
- **Keyboard reachability** of the skip link and all utility-bar controls is asserted directly, not assumed.

## Future Improvements

- Content backlog: several raw coursework reports in [`project_documents/`](project_documents/) aren't yet written up as Application Notes, including a Multi-Agent Reinforcement Learning thesis manuscript — a strong candidate for a future featured project.
- Cross-browser E2E coverage beyond Chrome (Firefox/WebKit Playwright projects).
- Visual regression (screenshot-diff) testing, now that a documented baseline set exists under [`docs/images/`](docs/images/).
- Interactive diagrams — hover states on SVG nodes revealing detailed tooltips.
- Automated résumé PDF generation from the live HTML, so the two can't drift out of sync.
- A published Vercel deployment alongside the existing GitHub Pages one, once account access is available to complete the one-time link/import step.

## Author

**Jared Asher Mananguit** — BS Electronics Engineering (ECE), University of Santo Tomas
[jaredasher.mananguit.eng@ust.edu.ph](mailto:jaredasher.mananguit.eng@ust.edu.ph) · [GitHub @Jrddlol2](https://github.com/Jrddlol2)

## License

The code (HTML/CSS/JS) is licensed under [MIT](LICENSE). Personal content — résumé, certificates, project write-ups, and biographical text — is not covered by this license and should not be reused without permission.
