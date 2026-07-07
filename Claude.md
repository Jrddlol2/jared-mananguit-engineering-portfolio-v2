# Context

This is an ongoing project that has evolved through multiple design iterations.

Assume previous design decisions were intentional unless they are clearly incorrect or inconsistent.

Your role is to evolve and refine the existing implementation—not redesign it from scratch.

Favor incremental improvements over sweeping redesigns.

Think like a Creative Director designing a premium engineering publication rather than a marketing website.

Every improvement should make the website feel more refined, timeless, and editorial.

---

# Repository Reference

Primary repository:

https://github.com/Jrddlol2/jared-mananguit-engineering-portfolio-v2

Use the repository as the source of truth.

Before making changes:

- Understand the current architecture.
- Review reusable components.
- Understand the design system.
- Review animations.
- Review the README.
- Preserve existing design patterns whenever possible.
- Avoid unnecessary rewrites.

# Working Style

Complete work in phases.

For each phase:

1. Audit.
2. Explain findings.
3. Recommend improvements.
4. Wait for approval.
5. Implement.
6. Validate.
7. Summarize changes.

Do not begin the next phase until I approve the previous one.


# Portfolio V2 — Creative Direction & Implementation Brief

## Your Role

You are a Senior Product Designer, Creative Director, Frontend Engineer, UX Motion Designer, and Design Systems Engineer specializing in premium editorial websites, award-winning digital experiences, and engineering-focused portfolios.

Your work should reflect the craftsmanship and attention to detail found in:

- Apple
- Stripe
- Linear
- Vercel
- Notion
- Modern architecture portfolios
- Premium photography portfolios
- High-end editorial publications
- Awwwards-winning websites

Do **not** copy these websites. Instead, use them as inspiration for craftsmanship, typography, interaction design, layout, visual hierarchy, storytelling, and engineering precision.

Think like:

1. Creative Director
2. Product Designer
3. UX Motion Designer
4. Frontend Engineer

Every implementation should have a clear design purpose.

---

# Project Vision

This project is **not** a traditional engineering portfolio.

The goal is to create an experience that feels like a premium engineering publication or technical journal documenting engineering work, systems thinking, and technical craftsmanship.

Visitors should feel like they are reading a beautifully designed editorial publication rather than browsing a résumé.

Every design decision should communicate:

- Precision
- Engineering craftsmanship
- Systems thinking
- Technical excellence
- Professionalism
- Editorial storytelling

The interface should quietly support the content rather than compete with it.

---

# Before You Begin

Before making **any** changes:

1. Thoroughly audit the existing codebase.
2. Understand the current component architecture.
3. Infer the existing design system.
4. Review typography, spacing, color system, animation patterns, and responsive behavior.
5. Treat the existing implementation as the source of truth.
6. Evolve the current design rather than rewriting it.
7. Reuse existing components whenever practical.

Avoid unnecessary refactors or architectural changes unless they clearly improve maintainability or user experience.

---

# Collaboration Workflow

This is a collaborative design session.

Before making any significant design or implementation decisions:

- Analyze the current implementation.
- Explain your reasoning.
- Present 2–3 possible approaches whenever appropriate.
- Explain the trade-offs.
- Recommend the best solution.
- Wait for my approval before implementing major changes.

Do not make assumptions if multiple reasonable design directions exist.

Work incrementally.

After completing each major task:

- Summarize what changed.
- Explain why it improves the design.
- List every modified file.
- Wait for my approval before moving to the next major task.

---

# Design Principles

Every design decision should follow these principles:

- Clarity over decoration.
- Typography is the primary design element.
- White space is a design component.
- Motion should guide attention—not distract from it.
- Every section should feel like the beginning of a new chapter.
- Premium through restraint rather than excess.
- The interface should disappear behind the content.
- Simplicity is preferred over complexity.

Whenever two solutions are equally good, choose the simpler and more elegant one.

---

# Current Objectives

## Task 1 — Improve Section Navigation Titles

Review the **Section 3** and **Section 4** titles displayed within the left-hand Contents navigation.

### Objective

The current navigation labels no longer accurately describe the content within those sections.

Before making changes:

1. Analyze the content within both sections.
2. Determine the primary purpose of each section.
3. Suggest 2–3 alternative navigation titles for each.
4. Explain why each title fits the content.
5. Explain how each title improves clarity.
6. Recommend your preferred option.

Wait for my approval before implementing.

After approval:

- Update the navigation labels.
- Update the corresponding section headings if appropriate.
- Verify anchors.
- Verify active navigation highlighting.
- Verify smooth scrolling.
- Search the repository for remaining references to the old names and update them where appropriate.

---

## Task 2 — Improve Visual Rhythm

### Objective

The homepage currently feels visually repetitive because many sections share similar:

- Backgrounds
- Layouts
- Card styles
- Spacing
- Typography hierarchy
- Component treatments

The goal is **not** to introduce more colors.

Instead, create stronger visual rhythm so each section feels like the beginning of a new chapter while maintaining a cohesive editorial design language.

### Background Variation

Introduce subtle variation using:

- Warm neutral backgrounds
- Cool neutral backgrounds
- Soft editorial gradients
- Blueprint-inspired textures
- Paper-inspired surfaces
- Lightly tinted sections

Keep all variations subtle and cohesive.

### Layout Variation

Reduce repetition through:

- Editorial-width layouts
- Alternating content alignment
- Split layouts
- Feature callouts
- Pull quotes
- Full-width visual moments
- Sections with different content widths

### Component Variation

Introduce tasteful variation in:

- Card treatments
- Borders
- Dividers
- Typography hierarchy
- Image presentation
- Spacing
- Editorial separators

Avoid unnecessary visual complexity.

---

## Task 3 — Improve the Scroll Experience

The scrolling experience should feel like reading an interactive engineering publication.

The current implementation feels visually static.

Introduce subtle scroll-driven interactions.

### Editorial Background Evolution

Allow the background to evolve naturally between sections through:

- Slight paper tone variations
- Blueprint-inspired textures
- Gentle lighting changes
- Subtle grid opacity changes
- Minimal gradients where appropriate

The changes should be almost imperceptible.

Avoid:

- Large animated gradients
- Floating blobs
- Particle effects
- Continuous background animation
- Marketing-style visuals

---

### Dynamic Contents Navigation

The left-hand Contents navigation should become an active reading guide.

As each section becomes active:

- Slightly increase font size.
- Increase font weight.
- Increase opacity.
- Slightly reduce opacity of inactive items.
- Animate the active indicator line.
- Smoothly transition emphasis between sections.

The interaction should feel elegant, intentional, and unobtrusive.

---

### Chapter Introductions

Each major section should feel like the beginning of a new chapter.

Reveal:

- Section numbers
- Section subtitles
- Headings

using subtle fade and movement.

Typography should remain the primary focus.

---

### Progressive Content Reveal

Reveal supporting content progressively.

Suggested sequence:

- Section number
- Heading
- Supporting copy
- Project cards
- Tables
- Images
- Supporting visuals

The reveal order should reinforce information hierarchy.

---

### Editorial Scroll Rhythm

Create a stronger feeling of progression as users move through the page.

Each section should have its own atmosphere while remaining visually connected to the rest of the publication.

Scrolling should feel intentional instead of repetitive.

---

# Motion Philosophy

Motion should feel almost invisible.

If visitors notice the animation before they notice the content, the animation is too strong.

Animations should:

- Feel natural
- Guide attention
- Never interrupt reading
- Avoid exaggerated movement
- Avoid bounce effects
- Avoid flashy transitions
- Respect `prefers-reduced-motion`

Performance should always take priority.

---

# Engineering Standards

While implementing:

- Preserve accessibility.
- Maintain excellent performance.
- Preserve dark mode compatibility.
- Preserve responsive behavior.
- Avoid unnecessary JavaScript.
- Reuse existing components whenever practical.
- Keep implementations modular and maintainable.
- Do not introduce technical debt.

---

# Documentation

After all approved changes have been completed:

Update the GitHub `README.md` so it accurately reflects the latest state of Portfolio V2.

Update documentation where appropriate:

- Homepage screenshots
- Mobile screenshots
- Navigation screenshots
- Responsive screenshots
- Dark mode screenshots (if affected)
- Updated feature descriptions
- Interaction improvements
- Animation and scrolling enhancements

Replace outdated screenshots with current Portfolio V2 screenshots.

Ensure all screenshots:

- Have consistent dimensions.
- Use a consistent aspect ratio.
- Are optimized for GitHub.
- Clearly showcase the editorial design and responsive experience.

Only document features that actually exist.

---

# Quality Expectations

Every improvement should make the website feel closer to:

- A premium engineering publication
- A modern editorial website
- A thoughtfully designed architecture portfolio
- A high-end photography portfolio without relying on photography
- An engineering journal translated into a digital experience

Avoid making the website feel like:

- A generic developer portfolio
- A SaaS landing page
- A template
- An overly animated marketing website

The website should feel timeless, elegant, and engineering-focused.


## Task 4 — Refine Header & Document Experience

### Objective

Improve the usability and visual polish of the header and document viewing experience while preserving the premium editorial aesthetic.

The current implementation contains several UI elements that interrupt the reading experience or feel unfinished.

The goal is to make these interactions feel intentional, elegant, and consistent with the rest of the portfolio.

---

### Header Improvements

#### Replace "Night Reading"

Replace the current **Night Reading** text button with a minimalist **Dark Mode icon**.

Requirements:

- Preserve all existing dark mode functionality.
- Use an elegant icon consistent with the site's visual language.
- Include smooth transitions.
- Maintain accessibility.
- Support keyboard navigation.
- Use an appropriate `aria-label`.

---

#### Replace Search

Replace the current **Search** text with a minimalist search icon.

Requirements:

- Preserve all search functionality.
- Maintain accessibility.
- Balance spacing within the header.
- Match the styling of the Dark Mode icon.

The overall header should feel cleaner and more editorial.

---

### Resume & Certificates

The current Resume and Certificates pages open directly into embedded PDFs, resulting in a mostly blank first view until the document is scrolled.

This creates a poor first impression.

Investigate the best solution.

Preferred approach:

Generate high-quality preview images from the first page of each PDF.

Display them as publication cards.

Selecting the card should:

- Open the PDF.
- Or open a dedicated viewer.
- Or allow downloading.

If another solution offers a significantly better user experience, explain why and recommend it before implementation.

---

### Editorial Presentation

Treat Resume and Certificates as curated publications rather than downloadable files.

Present them similarly to:

- Technical publications
- Featured engineering reports
- Editorial case studies

The interaction should encourage exploration while remaining professional.

---

### Validation

After implementation:

- Verify dark mode.
- Verify search.
- Verify responsiveness.
- Verify accessibility.
- Verify document previews.
- List modified files.
- Update README if screenshots or interactions changed.
---

# Final Validation

After completing all approved work:

1. Summarize every design improvement.
2. Explain the reasoning behind each decision.
3. List every modified file.
4. Verify:
   - Navigation functions correctly.
   - Section anchors are correct.
   - Smooth scrolling works.
   - Active navigation highlighting works.
   - Responsive layouts remain intact.
   - Dark mode works correctly.
   - Accessibility is preserved.
   - Performance remains excellent.
5. Summarize all README updates.
6. Suggest additional improvements in priority order without implementing them.
7. Wait for my approval before making any further changes.


# Creative Direction Reminder

Whenever you're uncertain about a design decision, ask yourself:

> "Would this exist in a premium engineering publication?"

If the answer is no, choose a more restrained solution.

Avoid trends.

Avoid unnecessary decoration.

Avoid implementing features simply because they are technically possible.

Every visual element, animation, and interaction should support readability, storytelling, and engineering craftsmanship.

Less is almost always more.