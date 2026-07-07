# Contributing (detailed workflow)

This expands on the root [`CONTRIBUTING.md`](../CONTRIBUTING.md) with the specifics of working in this codebase day-to-day.

## Branching and commits

- Branch off `main`; there's no separate `develop` branch.
- Commit messages: short imperative subject line, then a blank line, then a body explaining *why* if the change isn't self-evident from the diff. Look at `git log` for the house style — commit bodies here document real bugs found and fixed, not just what changed.
- Keep commits scoped to one logical change. A milestone-sized change (e.g. "redesign the hero") is fine as one commit if it's genuinely one unit of work; unrelated fixes belong in their own commit.

## Before opening a pull request

```bash
npm install         # first time only, or after package.json changes
npm run lint         # htmlhint + stylelint
npm run build        # confirms dist/ assembles cleanly
npm test             # link-check + full Playwright suite (84 tests)
```

All four must succeed locally before pushing — CI re-runs the same four and will block merge otherwise (see [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)).

## Adding a new Application Note (project page)

1. Copy the closest existing page under `projects/` as a starting point rather than writing one from scratch — the local masthead, mobile ToC, and section numbering pattern should match the others exactly.
2. Register it in three places:
   - `js/search.js`'s `INDEX` array (so it's findable via `Ctrl+K`)
   - The homepage's `#sec-projects` section (an `<article class="app-circuit-row">` card linking to it)
   - The homepage bookmark rail / mobile ToC do **not** need a new entry — those link to homepage sections, not individual projects.
3. Every diagram should follow the [illustration system conventions](DESIGN_SYSTEM.md#illustration-system): `currentColor` strokes, `vector-effect="non-scaling-stroke"`, and a real `<title>` + `aria-labelledby` (or `aria-hidden="true"` if purely decorative).
4. Run `npm test` — `tests/e2e/projects.spec.ts` and `tests/e2e/navigation.spec.ts`'s broken-link crawl will both need updating if you add a 6th project (they currently hardcode the five `AN-00x` pages by design, to catch accidental omissions).

## Working on the CSS

Put new rules in the layer that matches their purpose — see [ARCHITECTURE.md](ARCHITECTURE.md#directory-responsibilities) for what belongs in each of the seven `css/` files. Before adding a new color or spacing value, check [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) first; almost everything should be expressible with an existing token.

`stylelint` is configured to catch real defects (duplicate selectors, invalid values) rather than enforce a specific formatting style — see `.stylelintrc.json` for the full list of intentionally-disabled purely-stylistic rules, and don't re-enable them without a reason; they were disabled because they fought this codebase's existing, consistent hand-written style.

## Working on the JS

Every module in `js/` is a self-contained IIFE that grabs its own DOM hooks and returns early if they're absent (`if (!el) return;`). Keep new scripts in that pattern — it's what lets `search.js`/`nav.js` be homepage-only while `theme.js`/`reveal.js` run everywhere, with zero coordination needed between files and zero console errors on pages missing some markup.

## Reporting issues

Use the templates under `.github/ISSUE_TEMPLATE/`.
