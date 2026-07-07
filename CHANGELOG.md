# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

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
