# Jared Asher Mananguit — Engineering Portfolio (V2)

> An engineering portfolio built and read like a technical publication, not a résumé site.

[![CI](https://github.com/Jrddlol2/jared-mananguit-engineering-portfolio-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/Jrddlol2/jared-mananguit-engineering-portfolio-v2/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/Jrddlol2/jared-mananguit-engineering-portfolio-v2/actions/workflows/deploy.yml/badge.svg)](https://github.com/Jrddlol2/jared-mananguit-engineering-portfolio-v2/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-444444?style=flat-square)](LICENSE)
![No framework](https://img.shields.io/badge/frontend-vanilla%20HTML%2FCSS%2FJS-444444?style=flat-square)

![Homepage screenshot](docs/screenshot-homepage.png)

## Table of Contents

- [Overview](#overview)
- [Status: this is V2, in progress](#status-this-is-v2-in-progress)
- [Features](#features)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Design Philosophy](#design-philosophy)
- [AI-Assisted Development](#ai-assisted-development)
- [Local Development](#local-development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Author](#author)
- [License](#license)

---

## Overview

This is the personal engineering portfolio of **Jared Asher Mananguit**, a BS Electronics Engineering student at the University of Santo Tomas.

The site is built on a simple premise: a screenshot and a one-line caption don't communicate engineering competence — the reasoning behind a design does. So instead of a conventional portfolio layout (hero photo, skills cloud, project thumbnails), content is organized like a technical publication: each project is a full case study — problem, objectives, design decisions, validation, lessons learned — not a portfolio blurb.

**Intended audience:** engineering managers, technical recruiters, and peers evaluating how someone thinks, not just what they built.

The site is a **dependency-free static site** — semantic HTML5, modular hand-written CSS, and vanilla ES modules. No framework, no backend, no database, no build step required to run it.

## Status: this is V2, in progress

This repository is a deliberate fork of [`jared-mananguit-engineering-portfolio`](https://github.com/Jrddlol2/jared-mananguit-engineering-portfolio) (V1 — a stable, complete "engineering datasheet" styled site), created to host a ground-up editorial redesign without touching or risking the original.

**Redesigned so far:** the color system, typography, and the homepage hero.
**Not yet redesigned:** everything below the hero (Features, Characteristics, Projects, Experience, Certifications) still uses V1's document/datasheet structure — it automatically inherited the new color palette and typography (both are set via shared CSS custom properties), but its layout hasn't been rebuilt yet.

This README, the documentation in [`docs/`](docs/), the CI pipeline, the GitHub Pages deployment, and the Playwright test suite all describe and verify the site **as it exists right now** — a valid, tested, deployable state — not a finished vision of the full redesign.

## Features

- **Engineering-documentation-inspired UI** — numbered sections (`§1.0`, `§2.0`, …), a sidebar bookmark rail instead of a nav bar, and document-control metadata, borrowed from IEEE papers and semiconductor application notes rather than conventional portfolio templates.
- **Responsive design** — a two-column bookmark-rail-and-reading-column layout above ~1080px that collapses to a single column with a `<details>`-based mobile table of contents below it; verified from 320px through ultrawide.
- **Engineering illustrations** — every diagram (block diagrams, control loops, CPU architecture, network topology) is a hand-authored inline SVG, not a raster image or embedded drawing tool export.
- **Technical project pages** — five in-depth Application Note pages under [`projects/`](projects/), each a self-contained case study with its own local masthead, table of contents, and section-by-section write-up.
- **Certificate management** — certifications are listed with issuer, status, and year, linking directly to the real PDF, opened in a new tab rather than forced to download.
- **Dark mode** ("night reading") — persisted per-browser via `localStorage`, respects the OS `prefers-color-scheme` on first visit, and is contrast-checked independently rather than just inverted.
- **Command palette search** (`Ctrl+K` / `Cmd+K`) — a keyboard-driven overlay indexing every section, project, and named technology, with arrow-key navigation and `Enter` to jump.
- **Responsive SVG diagrams** — `vector-effect="non-scaling-stroke"` keeps line weight constant as diagrams shrink, and `currentColor` strokes mean every diagram inverts automatically between themes with no duplicate dark-mode asset.
- **Accessibility considerations** — a working skip link (with a focusable target — see [Design Philosophy](#design-philosophy)), correct heading hierarchy, `prefers-reduced-motion` support throughout, and automated `axe-core` scans in the test suite.

## Screenshots

<table>
<tr>
<td width="50%">

**Hero**
![Hero](docs/screenshot-hero.png)

</td>
<td width="50%">

**Dark mode**
![Dark mode](docs/screenshot-dark-mode.png)

</td>
</tr>
<tr>
<td width="50%">

**Engineering Projects section**
![Projects section](docs/screenshot-projects-section.png)

</td>
<td width="50%">

**Certifications**
![Certifications](docs/screenshot-certifications.png)

</td>
</tr>
<tr>
<td width="50%">

**Project detail page**
![Project detail page](docs/screenshot-project-detail.png)

</td>
<td width="50%">

**Engineering illustration** (AN-004, SAP-2 CPU architecture)
![Engineering illustration](docs/screenshot-illustration.png)

</td>
</tr>
</table>

**Mobile**

<img src="docs/screenshot-mobile.png" alt="Mobile responsive layout" width="360">

## Project Structure

```text
(repo root)
├── index.html              # Homepage
├── css/                     # tokens, base, layout, components, utilities, motion, print
├── js/                      # theme, nav, search, reveal, engineering-fx, main
├── projects/                # AN-00x Application Note case-study pages
├── assets/                  # fonts/, certificates/
├── Jared_Mananguit_Resume.pdf
├── scripts/                 # build.mjs, check-links.mjs
├── tests/e2e/               # Playwright end-to-end test suite
├── playwright.config.ts
├── docs/                    # extended documentation, screenshots
└── CV/                      # source material not published on the site
    ├── READ/ProjectCV.md    # original V1 design brief
    └── Resume/, Certificates/ # source copies of published PDFs

project_documents/           # raw coursework PDFs — content backlog for
                              # future Application Notes (see docs/ARCHITECTURE.md)
```

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for what each directory is responsible for and why it's organized this way.

## Technologies

| Technology | Role |
| :--- | :--- |
| **Semantic HTML5** | Document structure and content — no JS framework mounts a virtual DOM over it. |
| **Modular CSS3** (ITCSS-inspired) | The entire visual design system: color/type/spacing tokens, then base, layout, components, utilities, motion, and print, layered by responsibility. |
| **Vanilla JavaScript** (ES modules) | Progressive enhancement only — search, theme toggle, scroll-spy nav, scroll reveal. Every script no-ops safely if its markup is absent. |
| **Newsreader + Inter + IBM Plex Mono** | Self-hosted `woff2` type system — serif display, sans body, mono for data/labels. |
| **Node.js + npm scripts** | Local dev server, linting, link-checking, build packaging — no bundler, because none is needed. |
| **htmlhint / stylelint** | Static analysis for HTML validity and real CSS defects (duplicate selectors, invalid rules). |
| **Playwright + axe-core** | End-to-end and automated accessibility testing — see [Testing](#testing). |
| **GitHub Actions** | CI (lint, build, test) on every push/PR, plus automatic GitHub Pages deployment on `main`. |

## Design Philosophy

- **Engineering-publication aesthetic.** Every layout decision is checked against one question: *would this be believable inside official documentation from an IEEE journal or a semiconductor application note?*
- **Modular architecture.** CSS is layered by responsibility (`tokens` → `base` → `layout` → `components` → `utilities` → `motion` → `print`), so a color or spacing change is safe to make in one place instead of hunting through component files.
- **Responsive layout.** The bookmark-rail-plus-reading-column structure only makes sense above ~1080px; every breakpoint decision is driven by content legibility, not device categories.
- **Illustration system.** Diagrams are real DOM SVG, not images — see [Features](#features) above for why that matters technically. Full rationale in [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md).
- **Typography.** *Newsreader* (serif) carries headings and standfirst copy with an editorial, literary register; *Inter* (sans) carries body copy for legibility at high information density; *IBM Plex Mono* is reserved for anything that reads as data.
- **Color system.** A warm ivory/graphite palette with a single muted forest-green accent, used sparingly — chosen deliberately over the more common "SaaS/dashboard" cool-gray-plus-bright-accent palette. Full palette values and rationale in [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md).

## AI-Assisted Development

AI was used as an engineering assistant at two points in this project's history — architecture inspection, implementation planning, refactoring, and QA support, with every change reviewed, tested, and directed by the author. It was not used to autonomously generate the design or content.

See [`docs/PROMPT_ENGINEERING.md`](docs/PROMPT_ENGINEERING.md) for the detailed, structured-prompting workflow used, and [`CHANGELOG.md`](CHANGELOG.md) for the specific, dated record of what changed and why.

## Local Development

**Prerequisites:** Python 3 (simplest static server) or Node.js 18+ (for lint/test/dev/build scripts).

```bash
git clone https://github.com/Jrddlol2/jared-mananguit-engineering-portfolio-v2.git
cd jared-mananguit-engineering-portfolio-v2
npm install
```

```bash
# Option A — zero dependencies
python -m http.server 8080

# Option B — via npm scripts
npm run dev      # serves the site on http://localhost:3000
npm run lint     # HTML + CSS linting
npm run build    # assembles a deployable copy in dist/
```

> [!NOTE]
> **No environment variables required.** This is a static site with no backend.

## Testing

```bash
npm test              # link-check + full Playwright E2E suite
npm run test:e2e      # Playwright only
npm run test:e2e:ui   # Playwright's interactive UI mode
```

84 end-to-end tests across navigation, homepage, project pages, certificates, responsive layout, search, theme persistence, and accessibility (including automated `axe-core` scans). Full breakdown in [`docs/TESTING.md`](docs/TESTING.md).

## Deployment

Pushes to `main` automatically build and deploy to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for how it works, manual deployment steps, and troubleshooting.

## Future Improvements

- Redesign the remaining sections (Features, Characteristics, Projects grid, Experience, Certifications) to match the new editorial hero.
- Content backlog: several raw coursework reports in `project_documents/` aren't yet written up as Application Notes, including a Multi-Agent Reinforcement Learning thesis manuscript — a strong candidate for a future "Featured Project."
- Interactive diagrams — hover states on SVG nodes revealing detailed tooltips.
- Automated résumé PDF generation from the live HTML, so the two can't drift out of sync.

## Author

**Jared Asher Mananguit** — BS Electronics Engineering (ECE), University of Santo Tomas
[jaredasher.mananguit.eng@ust.edu.ph](mailto:jaredasher.mananguit.eng@ust.edu.ph) · [GitHub @Jrddlol2](https://github.com/Jrddlol2)

## License

The code (HTML/CSS/JS) is licensed under [MIT](LICENSE). Personal content — résumé, certificates, project write-ups, and biographical text — is not covered by this license and should not be reused without permission.
