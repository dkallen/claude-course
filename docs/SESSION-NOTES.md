# Course Build Session Notes

**Course:** From Concept to Delivery with Claude Code — A Practitioner's Course
**Author:** David
**Session date:** March 21, 2026
**Status:** Modules 1–2 complete. Modules 3–13 + Capstone not yet started.

---

## Key Files

### Course infrastructure
- `claude-code-course-syllabus.md` — The full 13-module + capstone syllabus. This is the source of truth for module topics, key concepts, exercises, and checks.
- `Structured Business Analysis.md` — David's framework (Goals, Problems, Solutions, Risks, Scope). Referenced throughout the syllabus, especially Module 4. Read this before building Module 4.
- `course.html` — The course shell with collapsible sidebar, module TOC with checkboxes, and localStorage persistence for progress tracking. Has export/import for backup. This is the main entry point for the course.
- `enterprise-search.plugin` — A plugin file David has in the folder. Not related to course content.

### Module 1: Orientation — What Claude Code Actually Is
All files follow the naming pattern `module-1-[type].[ext]`:

| File | Type | Format | Purpose |
|------|------|--------|---------|
| `module-1-lesson.md` | Passive | Markdown | Core written lesson — all four concepts in depth |
| `module-1-diagram.svg` | Passive | SVG | Visual concept map of all four concepts |
| `module-1-slides.html` | Passive | HTML | 16-slide presentation with keyboard navigation |
| `module-1-reference.html` | Passive | HTML | One-page quick reference card, printable |
| `module-1-capabilities.html` | Passive | HTML | Filterable capability matrix (22 task types with reliability ratings) |
| `module-1-explorer.html` | Interactive | HTML+React | Tabbed concept explorer with expandable sections and self-test questions |
| `module-1-quiz.html` | Interactive | HTML+React | 8 scenario-based questions with explanations and scoring |
| `module-1-flashcards.html` | Interactive | HTML+React | 15 flashcards with index view, filter tabs (All/Review/Known/Unseen), localStorage persistence |
| `module-1-exercise.md` | Interactive | Markdown | Guided hands-on exercise walkthrough with checkpoints |
| `module-1-index.html` | Navigation | HTML | Module-level index organizing resources into 5 phases (superseded by course.html but still functional standalone) |

### Module 2: CLAUDE.md — Teaching Claude Who You Are
All files follow the naming pattern `module-2-[type].[ext]`:

| File | Type | Format | Purpose |
|------|------|--------|---------|
| `module-2-lesson.md` | Passive | Markdown | Core written lesson — hierarchy, effective instructions, anti-patterns |
| `module-2-diagram.svg` | Passive | SVG | Visual map of global → project → folder cascade |
| `module-2-builder.html` | Interactive | HTML+React | Guided CLAUDE.md template builder with live preview and copy-to-clipboard |
| `module-2-quiz.html` | Interactive | HTML+React | 8 scenario-based questions with explanations and scoring |
| `module-2-flashcards.html` | Interactive | HTML+React | 12 flashcards with index view, filter tabs, localStorage persistence |
| `module-2-exercise.md` | Interactive | Markdown | Guided hands-on exercise — write, test, and refine a CLAUDE.md |
| `module-2-reference.html` | Passive | HTML | One-page CLAUDE.md cheat sheet, printable |
| `module-2-index.html` | Navigation | HTML | Module-level index organizing resources into 5 phases |

**Note:** Module 2 has 7 resources vs. Module 1's 9. The capability matrix and slides were dropped (not relevant); the CLAUDE.md Builder is a new interactive type unique to this module.

---

## David's Preferences

### Format
- **No Microsoft Office formats** (no .docx, .pptx, .xlsx) and **no PDF**. David finds them clumsy to load and view.
- Preferred formats: **Markdown (.md), HTML, SVG, JSX→HTML**. Anything that opens directly in a browser.
- David uses a **Markdown Viewer Chrome extension** (recommended: simov's Markdown Viewer) for rendering .md files with navigation.

### Design
- **Clean & minimal** — white background, good typography, no flashy colors. Content-first.
- **Conversational tone** — casual, direct, like a smart colleague explaining things. Matches the syllabus voice.

### Workflow
- David prefers to **review all materials at once** rather than iterating on individual pieces first.
- He values being able to **step away for days** and pick up where he left off — hence the localStorage persistence and the checkbox tracking in course.html.

---

## Technical Decisions

### React interactive pieces
- All interactive components (explorer, quiz, flashcards) are **self-contained HTML files** that load React 18 and Babel Standalone from cdnjs.cloudflare.com CDN.
- No build tools, no npm, no bundler. Just open in browser.
- Originally created as .jsx files but these don't render in browsers. All were converted to HTML wrappers. The old .jsx files were deleted.

### Persistence
- **localStorage** is used for both course progress (checkboxes in course.html) and flashcard state (known/review/unseen markings).
- Storage keys: `"claude-code-course-progress"` for course checkboxes, `"module-1-flashcard-state"` for Module 1 flashcards.
- Export/import buttons in course.html allow backing up progress to a JSON file.
- Browsers can't write to local files from HTML, so localStorage is the pragmatic choice. It survives across sessions and restarts; only lost if browser data is cleared.

### Navigation architecture
- `course.html` has a **left sidebar** with the full course TOC (all 13 modules + capstone), organized into three sections: "At Your Desk (1–9)", "On Autopilot (10–12)", "Ship It".
- Clicking a module with content shows its resources in the main panel with direct links (target="_blank"). No iframes — Chrome blocks local file:// iframes.
- Modules without content yet show "Coming soon."
- The sidebar is collapsible via a hamburger toggle button.
- **Updated in Module 2 build:** Each module in the `modules` array now supports its own `phases` array (defining phase labels, titles, descriptions, and resource indices) and a `check` string (the module self-check text). This replaced the hardcoded phases/check from Module 1. A `defaultPhases` fallback is available for modules without custom phases defined.

### File naming convention
- `module-[N]-[type].[ext]` — e.g., `module-2-lesson.md`, `module-2-quiz.html`
- Types used: `lesson`, `diagram`, `slides`, `reference`, `capabilities`, `explorer`, `quiz`, `flashcards`, `exercise`, `index`

---

## Pedagogical Approach

### No rigid framework
- We explicitly decided **not** to adopt an existing learning framework (ADDIE, Gagné, Bloom's, etc.). They constrain more than they help for this course.
- Instead, we borrow **principles**: activation before presentation, practice with increasing autonomy, spaced retrieval.
- Each module should **feel different** based on what it needs. Module 1 is conceptual/mental-model. Module 6 (TDD) should be almost entirely exercise-driven. Module 4 (Idea Refinement) should lean on interactive tools. Don't make them structurally identical.

### Conventions (not a framework)
- Every module has an **index page** and is registered in `course.html`.
- Every module has at least one **passive** and one **interactive** element.
- Every module ends with a **self-check** question.
- The specific mix, order, and emphasis of materials **varies per module** based on what it needs.
- The 9-material structure from Module 1 (lesson, diagram, slides, reference, capabilities matrix, explorer, quiz, flashcards, exercise) is a **starting template, not a requirement**. Some modules may need fewer materials, some may need different ones entirely.

### Material types that worked well in Module 1
- The **scenario-based quiz** (not just factual recall — presenting realistic situations and asking for judgment) was effective for a practitioner audience.
- The **flashcard redesign** with index-first, filter tabs, and persistent state was a significant UX improvement. Apply this pattern to future module flashcards.
- The **capability matrix** with filterable categories and reliability ratings is a reference tool with ongoing value. Future modules might have their own reference tools.

---

## David's Background and Goals

- David has been pairing with AI to build software for approximately **5 weeks** — a beginner by calendar time but with intensive experience.
- He previously attempted to build tools to compensate for LLM limitations (context window, compaction, forgetting). He iterated from deterministic logic → AI-fronted with structured frameworks. Both were learning experiences but he's concluded that **the AI labs are solving these problems faster than he can engineer around them**.
- His **primary goal**: improve his ability to develop software reliably with AI as a partner. He believes the human-AI partnership can produce amazing results and wants to find the optimal path to building that capability.
- His **current strategy**: instead of building tools to work around LLM limitations, invest time in **learning the tool's capabilities and ecosystem** deeply. This course is the vehicle for that.
- He has a strong background in **structured business analysis** (his framework: Goals, Problems, Solutions, Risks, Scope) which he uses as a thinking tool and wants integrated throughout the course.

---

## What to Build Next

Module 3: **The Art of the Prompt — From Ramble to Precision** is the next module to build. Refer to the syllabus for key concepts, exercise, and check. When building it:

1. Read the syllabus entry for Module 3 (lines 88–104 of `claude-code-course-syllabus.md`).
2. Follow the file naming convention: `module-3-[type].[ext]`.
3. Register the module's resources in `course.html` (update the modules array — now supports per-module `phases` and `check` properties).
4. Consider what materials Module 3 actually needs. Module 3 is about prompt calibration — it might benefit from a "prompt comparison" interactive tool (side-by-side vague vs. precise prompts) or a "prompt playground" concept.
5. Keep the tone conversational, design clean & minimal.
6. All interactive pieces as self-contained HTML with React from CDN.
