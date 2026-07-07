# Prompt Engineering & AI-Assisted Development

This document is deliberately specific rather than a generic "AI was used responsibly" disclaimer. It describes what was actually asked for, what was actually decided by the author, and where AI assistance actually helped.

## The two phases

**Phase 1 — original build (Google AI Studio / Gemini).** The initial site — HTML structure, the datasheet-style design system, and all content — was built with AI assistance under explicit constraints set by the author: no SaaS/Tailwind/Framer aesthetics, no frameworks, vanilla HTML/CSS/JS only, and an explicit design test ("would this be believable inside official documentation from Texas Instruments, Analog Devices, Keysight, or IEEE?"). AI was directed to implement decisions the author had already made, and to flag when a request would violate one of those constraints rather than silently complying.

**Phase 2 — migration and this redesign (Claude Code).** The project was migrated out of AI Studio into a standalone repository, cleaned up, and then forked into this V2 for an editorial redesign. This phase used a structured, checkpoint-driven prompting style rather than one large open-ended instruction — see below.

## The prompting pattern used for the V2 redesign

Rather than "redesign this site," the actual brief given was long and structured, and — importantly — included an explicit collaboration contract:

> *"Do not make assumptions when there are multiple reasonable design choices. Before proceeding with any significant decision, stop and ask for my approval. \[...\] Whenever there are multiple good approaches: present 2–3 options, explain the pros and cons of each, recommend one, wait for my approval before implementing it."*

In practice, this meant every irreversible-feeling decision — background/color direction, typography pairing, hero composition — was presented as 2–3 concrete, named options with tradeoffs and a recommendation, and implementation only started after an explicit choice was made. For example, the hero layout was not built until "magazine masthead + standfirst" was chosen over "full-bleed typographic statement" and "asymmetric split with a spot illustration."

This is the core difference between this project's AI usage and autonomous code generation: **the design space was narrowed by the author at each decision point, not by the model.**

## Where AI contributed directly

- **Architecture inspection** — reading the existing CSS/token layer before proposing changes (e.g., discovering that `tokens.css` already had an unfinished "v2 Editorial Instrument" naming and structure, which made the color/type swap cheaper than a rebuild).
- **Implementation** — writing the actual HTML/CSS changes once a direction was approved.
- **Verification, not just generation** — every visual change was checked in an actual rendered browser (screenshots, computed-style inspection, console/network checks) before being reported as done, not assumed correct from reading the diff.
- **Regression detection** — writing the Playwright E2E suite surfaced real, pre-existing defects (a missing `tabindex` on the skip-link target, a heading-hierarchy skip, and — caught during that same testing pass — CSS rules accidentally deleted in an earlier redesign commit that had left every project page unstyled). These were found *because* tests were written against real interactions, not asserted to exist.

## Where AI was explicitly constrained

- **No content invention.** Bio copy, project descriptions, and credentials were reused verbatim from the existing site; the author was asked before any project-selection or asset-selection decision (e.g. which coursework PDFs to feature) rather than the model choosing.
- **No unrequested redesign.** This document itself exists because of a production-readiness pass that explicitly said "do not redesign the website" — the constraint was followed: this pass added documentation, tests, and deployment configuration without changing the visual design.
- **No irreversible action without confirmation.** Git history for the original (V1) repository was never touched while building V2; a GitHub Pages source-setting change, a force-push, or a repository creation were each confirmed with the author before happening.

## What this is not

This is not a claim that AI "wrote the portfolio." It's a record that AI was used the way a capable pair-programmer or junior engineer might be: given clear constraints, asked to propose options rather than decide unilaterally, and to verify its own work rather than assert it. The author directed every structural, aesthetic, and content decision; see [`CHANGELOG.md`](../CHANGELOG.md) for the dated, specific record of what changed in each step.
