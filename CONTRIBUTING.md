# Contributing

This is a personal engineering portfolio. External contributions to content (résumé, project write-ups, biography) aren't accepted, but fixes to code — accessibility, broken links, CSS/JS bugs, tooling — are welcome.

## Getting Started

```bash
npm install
npm run dev     # http://localhost:3000
```

## Before Opening a Pull Request

```bash
npm run lint    # HTML + CSS linting
npm run test    # verifies all local href/src references resolve
```

Both must pass — this is also enforced in CI.

## Code Style

- No frameworks, no build step for the site itself. Keep it dependency-free HTML/CSS/JS.
- CSS follows the existing ITCSS-inspired layering: `tokens.css` → `base.css` → `layout.css` → `components.css` → `utilities.css` → `motion.css` → `print.css`. Put new rules in the layer that matches their purpose.
- JavaScript is plain ES modules, one responsibility per file (see `js/`).
- Preserve accessibility: semantic HTML, `aria-*` attributes, and keyboard navigability must not regress.

## Commit Messages

Use short, imperative subject lines (e.g. `Fix broken certificate link`, `Add AN-006 application note`).

## Reporting Issues

Use the issue templates under `.github/ISSUE_TEMPLATE/` for bug reports or content suggestions.
