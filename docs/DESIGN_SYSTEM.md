# Design System

All values below are the actual current contents of [`css/tokens.css`](../css/tokens.css) — this document explains the *why*; the file is the source of truth for the *what*.

## Color — "Ink, Paper & Pine"

| Token | Light | Dark | Use |
| :--- | :--- | :--- | :--- |
| `--c-paper` | `#F7F3EA` warm ivory | `#201B16` warm espresso | Page background |
| `--c-paper-alt` | `#EEE7D8` warm parchment | `#2B2419` | Alternating panels |
| `--c-ink` | `#24211C` warm graphite | `#F3EEE3` | Primary text |
| `--c-ink-secondary` | `#625C4E` | `#B5AC98` | Captions, metadata |
| `--c-accent` | `#3F5D48` muted forest green | `#7FA88C` sage | Links, kickers — used sparingly |
| `--c-border-subtle` | `#DDD6C4` | `#3D362B` | Hairline rules |

**Why warm, not cool.** A cool blue-gray-plus-bright-accent palette reads as "SaaS dashboard." Every color here is warm-cast, including the near-black (`#24211C`, not a cool `#0F172A` slate) and the dark-mode background (a warm espresso `#201B16`, not cool charcoal) — deliberately closer to paper and ink than to a screen.

**Why one accent, used sparingly.** The forest green (`--c-accent`) appears in kickers, links, and small status indicators — never as a background fill for large areas. This keeps it meaningful: when it appears, it's marking something (a link, a status), not decorating.

**Signal colors** (`--color-signal-primary` through `-quaternary`) are a separate four-color palette used only for oscilloscope/Bode-plot style figures, where multiple distinguishable trace colors are needed — bronze, rust, instrument blue, plum. These are intentionally more varied than the single UI accent, since their job is differentiation, not brand consistency.

## Typography

Three families, three jobs:

| Family | Token | Role |
| :--- | :--- | :--- |
| **Newsreader** (variable, 400–700 + italic) | `--font-display`, `--font-heading` | Headings and the hero standfirst — an editorial, literary register |
| **Inter** (400/500/600/700) | `--font-body` | Body copy — optimized for legibility at high information density |
| **IBM Plex Mono** (400/500) | `--font-mono` | Anything that reads as *data*: kickers, telemetry, table headers, spec labels |

All three are self-hosted `woff2` (no third-party font-host requests). Newsreader is loaded as a single variable-font file per style (normal, italic) covering the full 400–700 weight range via `font-weight: 400 700` in its `@font-face` — not four separate static files — which is both smaller and lets the browser interpolate any weight in between.

**Fluid type scale.** Headings use `clamp()` (e.g. `--fs-display: clamp(3rem, 2rem + 5.5vw, 6.5rem)`) rather than fixed breakpoint jumps, so the hero name scales continuously with viewport width instead of snapping between two or three fixed sizes.

## Spacing

An air-first scale from `--space-1` (0.25rem) to `--space-9` (10rem), each step roughly 1.5× the last. Section padding uses the largest steps (`--space-7`/`--space-8`), so vertical rhythm — not borders — is what separates sections. This is a deliberate rejection of "card everywhere" styling: see [README § Design Philosophy](../README.md#design-philosophy).

## Illustration system

Every diagram on the site is an inline `<svg>`, never a raster image or an embedded drawing-tool export. Three CSS/markup conventions make this work:

1. **`stroke="currentColor"`** on diagram strokes means a diagram inherits its container's text color — so it inverts automatically between light and dark mode with zero duplicate assets.
2. **`vector-effect="non-scaling-stroke"`** keeps line weight visually constant as a diagram's viewBox scales down for mobile, instead of strokes either disappearing or becoming disproportionately thick.
3. **`<title>` + `role="img"` + `aria-labelledby`** on every non-decorative diagram gives it a real accessible name (verified in the E2E suite — see [TESTING.md](TESTING.md)). Purely decorative SVGs (e.g. certificate thumbnail icons) are explicitly `aria-hidden="true"` instead.

## What changed from V1 (for anyone comparing)

V1 used a cool "blueprint" palette (Fraunces serif, copper/rust accent, cooler paper tones) throughout, styled consistently as a datasheet end-to-end. V2's token layer replaces the accent (copper → forest green) and display face (Fraunces → Newsreader) and corrects the paper/ink hues to be genuinely warm rather than cool-tinted, then applies that new system to a rebuilt hero. See [README § Status](../README.md#status-this-is-v2-in-progress) for exactly how much of the rest of the page has (and hasn't) been rebuilt to match.
