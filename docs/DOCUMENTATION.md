# Technical Documentation: Engineering Portfolio Website

## 1. Introduction
This document outlines the architecture, design philosophy, and development methodology of a professional engineering portfolio website. Designed for a systems and electronics engineering student, the portfolio serves as both a showcase of technical projects and a demonstration of software engineering capabilities. The target audience includes recruiters, engineering managers, and technical peers.

The guiding concept is an "engineering documentation aesthetic"—treating the portfolio itself as a technical datasheet or application note. This philosophy eschews typical marketing fluff in favor of precision, clarity, and information density, reflecting the author's background in analog/digital circuits, firmware, and network infrastructure.

## 2. Development Methodology
The project was developed using an iterative, AI-assisted methodology:
1.  **Requirement Analysis & Project Inspection:** Initial understanding of the folder structure, HTML semantics, and CSS architecture (ITCSS-inspired).
2.  **Implementation Planning:** Structuring the modifications to respect the existing `base`, `layout`, `components`, and `utilities` stylesheets.
3.  **AI-Assisted Development & Refinement:** Using structured prompt engineering to iteratively enhance typography, layout, and responsive behaviors. AI served to automate repetitive tasks and propose structural improvements based on technical constraints.
4.  **Quality Assurance & Validation:** Rigorous passes for broken links, responsive layout integrity, SVG scaling issues, and print stylesheet fidelity.

## 3. Project Architecture
The project utilizes a modular, dependency-free frontend architecture:
*   **HTML Organization:** Semantic HTML5, divided into modular application notes (e.g., `an-001-ball-and-beam-pid.html`) and the main index.
*   **CSS Architecture:** Follows a strict separation of concerns:
    *   `tokens.css`: CSS variables for colors, typography, and spacing.
    *   `base.css`: Resets and typography defaults.
    *   `layout.css`: Structural grids, columns, and section rhythm.
    *   `components.css`: Buttons, utility bars, and modular UI cards.
    *   `utilities.css`: Single-purpose helper classes.
    *   `motion.css`: Animation and transition definitions.
    *   `print.css`: Dedicated print media query styling for PDF export.
*   **JavaScript:** Vanilla JS, modularized into small files (`search.js`, `theme.js`, `nav.js`, `reveal.js`, `engineering-fx.js`) handling specific progressive enhancements. No heavy frameworks are used, ensuring maximal performance.

## 4. Design System
The visual system is engineered for readability and professional restraint:
*   **Typography:** A robust pairing of *Fraunces* (editorial serif for headings) and *Inter* (clean sans-serif for body), complemented by *Plex Mono* for technical data and telemetry.
*   **Color Palette:** A high-contrast "slate" theme, utilizing deep off-blacks and stark whites to mimic printed documentation, with a single accent color for interactive elements and highlights.
*   **Spacing & Layout:** Built on a fluid typographic scale and a CSS Grid-based asymmetric layout (`l-split`). Generous whitespace is used to guide the eye and establish hierarchy without relying on heavy borders or drop shadows.

## 5. Major Features
*   **Hero Section:** A minimalist, highly scannable introduction featuring document metadata and telemetry, instantly establishing the datasheet aesthetic.
*   **Professional Experience & Projects:** Presented as "Application Notes" (e.g., AN-001), reinforcing the engineering theme.
*   **Certifications:** A grid-based gallery for credentials, featuring integrated thumbnails.
*   **Client-Side Search:** A lightweight, vanilla JS search overlay (`search.js`) allowing quick navigation across all projects and sections.
*   **Night Reading Mode:** A meticulously crafted dark mode (`theme.js`) that inverts the palette while preserving contrast ratios and SVG legibility.

## 6. Engineering Illustrations
All diagrams (block diagrams, circuit topologies, networking layouts) are implemented as inline SVGs.
*   **Design Philosophy:** SVG was chosen for infinite scalability, precise control over stroke widths (`vector-effect: non-scaling-stroke`), and seamless integration with the dark mode theme via `currentColor` fills.
*   **Integration:** Figures are woven directly into the HTML, allowing CSS to animate signal flows and respond to user interaction, turning static diagrams into dynamic storytelling elements.

## 7. Certificate Management
Certificates are managed via a structured grid of cards (`.cert-entry`). The layout is intrinsically responsive, wrapping fluidly on smaller screens. Each card links directly to a high-resolution PDF or verification URL, accompanied by a clean, consistent vector thumbnail that aligns with the overarching design system.

## 8. AI-Assisted Development
AI (specifically the Gemini / Antigravity agent) was utilized as a force multiplier for rapid prototyping and codebase refactoring.
*   **Code Understanding:** The agent analyzed the multi-file architecture to ensure changes were globally consistent.
*   **Incremental Refinement:** Complex SVG modifications (e.g., standardizing stroke widths, fixing coordinate overlaps) were executed via targeted scripting (`node -e`).
*   **Prompt Engineering:** Strict constraints were provided via prompts to ensure the AI maintained the "engineering datasheet" aesthetic rather than reverting to generic web design tropes.

## 9. Quality Assurance
The QA process encompassed multiple dimensions:
*   **Visual & Functional:** Verifying SVG stroke widths, alignment, and hover states. Ensuring the client-side search index correctly mapped to all Application Notes.
*   **Responsive:** Testing the `grid-template-columns` behavior on mobile breakpoints to ensure the sidebar and content columns collapsed elegantly.
*   **Performance & Print:** Validating that the `print.css` stripped all screen-only chrome (nav rails, utility bars) and forced page breaks appropriately for clean PDF generation.

## 10. Technologies Used
*   **HTML5 / CSS3:** Semantic structure and modern CSS Grid/Flexbox layout.
*   **Vanilla JavaScript (ES6):** Lightweight, progressive enhancement scripts without dependencies.
*   **SVG:** Inline vector graphics for all technical diagrams and icons.
*   **Vite:** Build tool for bundling and asset optimization.
*   **Google AI Studio / Claude Code:** AI assistants utilized for code generation and refactoring.

## 11. Challenges Encountered
*   **SVG Scaling and Overlaps:** Ensuring that complex engineering diagrams scaled down to mobile sizes without strokes becoming excessively thick or elements overlapping. *Solution:* Implementing `vector-effect: non-scaling-stroke` and standardizing stroke widths via regex replacement scripts.
*   **Preserving the Aesthetic:** Balancing the desire for interactive elements with the strict, minimalist constraints of a technical datasheet. *Solution:* Confining animations to subtle micro-interactions (e.g., `stroke-dashoffset` for signal flows) rather than heavy UI transitions.

## 12. Lessons Learned
*   **Modular CSS is Critical:** Maintaining separate files for layout, components, and utilities made global refactoring significantly safer and faster.
*   **Inline SVG is Powerful but Verbose:** While inline SVG allows for incredible styling control, it clutters the HTML. Future iterations might benefit from an SVG sprite system or a lightweight templating engine.
*   **Prompt Engineering is Software Engineering:** Directing AI tools effectively requires the same level of architectural foresight and precise communication as managing a human engineering team.

## 13. Conclusion
The resulting portfolio website successfully bridges the gap between a standard resume and a deep-dive engineering showcase. Through meticulous attention to typography, responsive behavior, and technical illustration, the project stands as a testament to both the author's systems engineering background and their commitment to high-quality software craftsmanship.
