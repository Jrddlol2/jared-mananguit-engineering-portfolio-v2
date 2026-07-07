# Deployment

Two static hosts are configured: **GitHub Pages** (automatic, via GitHub Actions) and **Vercel** (via `vercel.json`, either CLI or dashboard-triggered). Both deploy the exact same `npm run build` output — there's no host-specific branching in the build itself.

## GitHub Pages — how it works

This site deploys to **GitHub Pages** via GitHub Actions — not the older "push to a branch and let Pages build it with Jekyll" method. The workflow at [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) runs on every push to `main`:

1. **`build` job:** checks out the repo, installs dependencies, runs `npm run lint` and `npm run test:links` (fast checks only — see [below](#why-the-deploy-workflow-doesnt-run-the-full-e2e-suite)), then `npm run build` to assemble `dist/`, then uploads `dist/` as a Pages artifact via `actions/upload-pages-artifact`.
2. **`deploy` job:** takes that artifact and publishes it via `actions/deploy-pages`, targeting the repository's `github-pages` environment.

Because this is the Actions-based deployment method, GitHub does **not** run Jekyll over the output — `dist/` is served exactly as built, so no `.nojekyll` file or Jekyll front-matter concerns apply.

## One-time repository setup

Before the workflow can deploy, GitHub Pages needs to be pointed at "GitHub Actions" as its source (this is a one-time, per-repository setting, not something the workflow file can set for you):

1. Repository → **Settings** → **Pages**
2. Under **Build and deployment** → **Source**, select **GitHub Actions**

Once set, every push to `main` deploys automatically — no further manual steps.

## Vercel

Configured via [`vercel.json`](../vercel.json):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": false
}
```

**Why an explicit `outputDirectory` is needed here, unlike some Vercel projects.** Vercel's zero-config static detection assumes conventions tied to a recognized framework (Vite → `dist`, CRA → `build`, etc.). This project has no framework dependency for Vercel to detect, and — critically — the repo root itself contains valid-looking static files (`index.html`, `css/`, `js/`, `assets/`) *alongside* directories that must never be served publicly: `project_documents/` (raw coursework PDFs), `docs/` (this documentation), `CV/`, and `tests/`. Without `outputDirectory: "dist"`, a zero-config deploy would serve the repo root as-is, publishing all of those. Pointing at `dist/` — the same build output GitHub Pages uses — guarantees only the intended public files ship.

**Why `cleanUrls: false` is explicit rather than left at Vercel's default.** The site's internal links use literal `.html` extensions (e.g. `../index.html#sec-projects`). Vercel's default for `cleanUrls` is already `false`, so this doesn't change behavior — it documents the reasoning, since this exact class of bug (a static-file server silently rewriting `/index.html` → `/`) already caused false test failures once during local E2E testing when the `serve` npm package was briefly used as the test web server (see [TESTING.md](TESTING.md)). Making it explicit here is a deliberate guard against the same mistake recurring on this host.

**No environment variables or secrets are required** — same as GitHub Pages, this is a static site with no backend.

### Deploying to Vercel

**Option A — CLI:**

```bash
npm install -g vercel
vercel          # first run: authenticates, links the project, deploys a preview
vercel --prod   # promotes to the production domain
```

**Option B — Dashboard / GitHub integration:** import the repository at [vercel.com/new](https://vercel.com/new). Vercel detects `vercel.json` automatically and applies the same build command and output directory; every push to the connected branch then deploys automatically, the same way GitHub Actions does for Pages.

Either path requires your Vercel account (and, for Option B, granting Vercel access to the GitHub repo) — this is not something that can be done without you present.

## Why no base-path / Vite configuration is needed

This site has no build tool with a "base path" concept — every asset reference in the HTML/CSS is a **relative path** (`css/tokens.css`, `../assets/fonts/...`, `Jared_Mananguit_Resume.pdf`, etc.), never root-absolute (`/css/tokens.css`). This was verified directly:

```bash
grep -rn 'href="/\|src="/' index.html projects/*.html css/*.css js/*.js
# (no matches)
```

Because GitHub Pages project sites are served from a subpath (`https://USERNAME.github.io/REPOSITORY_NAME/`), root-absolute paths would resolve to the domain root and break. Since every reference here is relative, the site works correctly at that subpath with zero configuration — no `base` setting, no path rewriting, nothing to get wrong.

## Local preview of the production build

```bash
npm run build              # writes dist/
cd dist && python -m http.server 8080
# open http://localhost:8080
```

This serves the *exact* files that ship — a more faithful check than `npm run dev` (which serves the source tree directly) if you specifically want to verify the build step itself.

## Manual deployment (without the GitHub Actions workflow)

Not normally needed — the workflow handles this — but if GitHub Actions is unavailable:

```bash
npm run build
# then push the contents of dist/ to a `gh-pages` branch, or upload
# them to any static host — dist/ is a complete, self-contained
# static site with no server dependency. For Vercel specifically,
# see the dedicated section above.
```

## Troubleshooting

**Deployment succeeded but the site 404s.** Confirm Pages' source is set to "GitHub Actions" (see [setup](#one-time-repository-setup) above) — if it's still set to "Deploy from a branch," the Actions-based deploy has nowhere to publish to.

**Assets 404 in production but work locally.** This almost always means a path was accidentally written as root-absolute (`/assets/...`) instead of relative. Re-run the grep in [the base-path section](#why-no-base-path--vite-configuration-is-needed) — it should return nothing.

**The deploy workflow is green but I don't see my latest change.** GitHub Pages' CDN can take a minute or two to reflect a new deployment; also confirm the `deploy` job (not just `build`) completed, and check the deployment URL shown in the job's summary matches what you're visiting.

**CI's Playwright step fails but the site itself looks fine.** See [TESTING.md](TESTING.md) — check whether the failure is browser/environment-specific (e.g. a missing `channel: 'chrome'` install step) versus an actual regression, using `playwright-report` uploaded as a CI artifact.

## Why the deploy workflow doesn't run the full E2E suite

`deploy.yml` intentionally runs only `lint` and the link-checker (fast, deterministic, seconds) before building and shipping — the full 84-test Playwright suite (~2 minutes) already runs on every push/PR via [`ci.yml`](../.github/workflows/ci.yml). Splitting them keeps deploys fast while still gating merges to `main` on the full suite passing; by the time a commit reaches `main` and triggers a deploy, it has already passed the heavier gate in CI.
