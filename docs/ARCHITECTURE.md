# Architecture

## Summary

This is a static, multi-page site: six real HTML documents (`index.html` plus five `projects/an-00x-*.html` pages), each a self-contained document that loads the same shared CSS and JS. There is no client-side router, no virtual DOM, and no build-time templating — every page is the actual HTML that ships.

## Directory responsibilities

```text
(repo root)
├── index.html              # Homepage: hero + six document sections
├── projects/                # Five Application Note pages, one per project
│   └── an-00x-*.html         #   each: local masthead, mobile ToC, numbered sections
├── css/                     # ITCSS-inspired layers, loaded in this exact order:
│   ├── tokens.css            #   1. custom properties: color, type, spacing (see DESIGN_SYSTEM.md)
│   ├── base.css               #   2. element resets, base typography, .reveal/.sr-only utilities
│   ├── layout.css             #   3. .page-shell grid, .doc-section rhythm, structural objects
│   ├── components.css         #   4. masthead, bookmark rail, search panel, cards, badges
│   ├── utilities.css          #   5. small single-purpose helper classes
│   ├── motion.css             #   6. all @keyframes and animated/transitioning rules
│   └── print.css              #   7. print-only overrides (media="print", loaded last)
├── js/                      # Vanilla ES modules, each independent and defensive
│   ├── theme.js               #   dark/light toggle + localStorage persistence
│   ├── nav.js                  #   bookmark-rail scroll-spy (IntersectionObserver)
│   ├── search.js               #   command palette (index.html only)
│   ├── reveal.js               #   scroll-triggered .reveal animations
│   ├── engineering-fx.js       #   scroll-progress bar, console-footer rotator, mouse coords
│   └── main.js                 #   print button wiring
├── assets/
│   ├── fonts/                 # self-hosted woff2 (Newsreader, Inter, IBM Plex Mono)
│   └── certificates/          # published certificate PDFs
├── Jared_Mananguit_Resume.pdf # published résumé (linked from the hero)
├── scripts/
│   ├── build.mjs               # assembles a deployable copy in dist/ (no bundling)
│   └── check-links.mjs         # verifies every local href/src resolves to a real file
├── tests/e2e/                # Playwright suite — see TESTING.md
├── docs/                     # this documentation + screenshots
└── CV/, project_documents/   # source material, not linked from the published site
```

## Why this layout

**One responsibility per directory.** `css/` never contains markup logic, `js/` never contains styling, `projects/` never contains anything that isn't a self-contained Application Note. Adding a sixth project or a new homepage section shouldn't require touching unrelated files.

**CSS load order is deliberate, not alphabetical.** Each layer only knows about the layer before it — `components.css` can rely on `tokens.css` variables and `base.css` resets, but `tokens.css` never references a component class. This is what makes a global palette or type-scale change (see [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)) safe to make in one file.

**Every JS module is independent and defensive.** Each file in `js/` starts with `if (!element) return;` for its own DOM hooks. `search.js` and `nav.js` are `index.html`-only features and correctly no-op on project pages; `theme.js`, `reveal.js`, and `engineering-fx.js` run everywhere. This means a page missing some markup (e.g. a project page has no bookmark rail) never throws — it's confirmed by the E2E suite's zero-console-error assertions.

**No bundler because none is needed.** `scripts/build.mjs` does not transform anything — it copies `index.html`, `css/`, `js/`, `projects/`, `assets/`, and the résumé PDF into `dist/`, which is what gets deployed. There's no JS to transpile (it already targets evergreen browsers) and no CSS to preprocess (custom properties and modern selectors are used directly).

## Data flow: how a page renders

1. An inline `<script>` in `<head>` reads `localStorage.theme` (or falls back to `prefers-color-scheme`) and sets `data-theme` on `<html>` *synchronously*, before any CSS paints — this is what prevents a flash of the wrong theme.
2. CSS loads in the seven-layer order above. Nothing renders until `tokens.css` has defined the custom properties every later layer depends on.
3. The body markup renders: bookmark rail (or mobile ToC below 1080px) + masthead + numbered `<section>`s.
4. JS modules attach at the end of `<body>`, each independently, in this order: `theme.js`, `nav.js`, `search.js`, `reveal.js`, `engineering-fx.js`, `main.js`. Order matters only in that `theme.js` should sync its toggle button state before a user can interact with it, but none of the others have ordering dependencies on each other.

## `project_documents/` and content backlog

`project_documents/` holds raw, ungraded coursework PDFs (lab reports, a design project write-up, a thesis manuscript) that are the *source material* some Application Notes were written from, plus material for Application Notes that don't exist yet. It is intentionally not linked from any published page — see [README.md § Future Improvements](../README.md#future-improvements) for the content backlog this represents.
