# From Concept to Delivery with Claude Code

**A Practitioner's Course by David (with Claude)**
**Version:** Draft 1.3 — March 2026
**Format:** Self-paced, exercise-driven, interactive, browser-first

---

## Course Overview

This course teaches you how to use Claude Code as a **thinking and building partner** across the full product lifecycle — from loosely-formed ideas to delivered, working products. It's grounded in a structured business analysis framework built on five interconnected concepts:

- **Goals** — the desired state
- **Problems** — obstacles blocking those goals
- **Solutions** — actions that resolve problems or advance goals
- **Risks** — forecasted problems arising from solutions
- **Scope** — boundaries determining what's in and what's out

Solutions targeting Risks are simply Solutions pointed at a different kind of problem.

Claude Code's capabilities are jagged. This course teaches you where they're strong, where they're weak, and how to work *with* the grain rather than against it.

This repository is also evolving from a single-subject Claude course into a **multi-subject course platform**. The next subject being prototyped is **OpenAI Codex**, starting with its own syllabus and first module.

---

## Prerequisites

- A Claude subscription (Pro or Max) with Claude Code access
- Basic comfort with a terminal or VS Code
- No prior Claude Code experience required — we start from zero

---

## Course Structure

The course spans 13 modules plus a capstone project:

| # | Module | Focus |
|---|--------|-------|
| 1 | Orientation — What Claude Code Actually Is | Mental model, environments, jagged capabilities |
| 2 | CLAUDE.md — Teaching Claude Who You Are | Persistent context, project conventions |
| 3 | The Art of the Prompt — From Ramble to Precision | Prompt calibration, Director Mode, effort levels |
| 4 | Idea Refinement — Using Claude Code to Think | Business analysis framework, scope, alignment checks, diagramming |
| 5 | Architecture — Designing Before Building | Trade-off analysis, scaffolding, ADRs |
| 6 | Test-Driven Development with Claude Code | Tests as specification, red-green-refactor |
| 7 | Skills — Reusable Intelligence | SKILL.md files, triggers, testing, composition |
| 8 | MCP — Connecting Claude Code to the World | External tools, data sources, security |
| 9 | Multi-Agent Workflows — Orchestration at Scale | Subagents, worktrees, parallel development |
| 10 | Scheduled Tasks — Putting Claude on Autopilot | /loop, Desktop scheduling, recurring automation |
| 11 | Remote Control — Claude Code from Your Pocket | `claude rc`, mobile control, local execution |
| 12 | Channels — Claude Code Meets You Where You Are | Telegram, Discord, event-driven workflows |
| 13 | Delivery — From Working Code to Shipped Product | Docs, release notes, CI/CD, shipping |
| — | **Capstone** | **Build Something Real** — Full pipeline on a real project |

**Modules 1–9:** Working with Claude Code at your desk.
**Modules 10–12:** Claude Code working for you when you're not.
**Module 13:** Shipping.

---

## What's in This Folder

### Core Course Materials

- **claude-code-course-syllabus.md** — Full course syllabus with learning objectives, key concepts, exercises, and checks for each module
- **SESSION-NOTES.md** — Running notes on course development, decisions, and implementation details
- **Structured Business Analysis.md** — Deep dive into the Goals/Problems/Solutions/Risks/Scope framework used throughout the course
- **codex-course-expansion-plan.html** — Architecture plan for expanding the repo into a multi-subject course platform
- **codex-course-syllabus.html** — Early syllabus for the OpenAI Codex course
- **codex-module-1-index.html** — First Codex module index page
- **codex-module-1-lesson.html** — First Codex module lesson page

### Interactive Learning Resources

Each module includes multiple learning formats:

- **Module Index** (e.g., `module-1-index.html`) — Navigation hub for that module
- **Lesson** (e.g., `module-1-lesson.html`) — Core content as a standalone responsive HTML page
- **Slides** (e.g., `module-1-slides.html`) — Visual presentation format
- **Explorer** (e.g., `module-1-explorer.html`) — Interactive tool for exploring concepts
- **Flashcards** (e.g., `module-1-flashcards.html`) — Spaced-repetition review cards
- **Quiz** (e.g., `module-1-quiz.html`) — Self-assessment questions with feedback
- **Reference** (e.g., `module-1-reference.html`) — Quick lookup for key terms and definitions
- **Diagram** (e.g., `module-1-diagram.svg`) — Visual architecture or workflow diagram
- **Exercise** (e.g., `module-1-exercise.html`) — Hands-on practice with real scenarios
- **Builder** (e.g., `module-2-builder.html`) — Interactive tool to build or configure concepts

### Responsive Versions

- **index.html** — Multi-subject landing page for the whole course library
- **course.html** — Full course experience
- **course-mobile.html** — Mobile-friendly version for learning on the go

### Presentation Direction

Learner-facing course material is moving to a **browser-native HTML/SVG delivery model**.

That means:

- course materials should open directly in a browser without a Markdown extension
- mobile compatibility is a requirement, not an afterthought
- Markdown may still exist as internal drafting or source material, but it is no longer the intended presentation layer
- new subjects and new modules should default to HTML for lessons, exercises, and other learner-facing content

### Tools & Extensions

- **enterprise-search.plugin** — Claude Code plugin for searching across multiple data sources (useful for real-world projects)

### Project Files

- **LICENSE** — Course license and usage terms
- **.git/** — Git repository with full version history

---

## How to Use This Course

### Self-Paced Learning

1. **Start with Module 1** — Read `module-1-lesson.html` or view `module-1-slides.html` to build your mental model
2. **Engage with Interactives** — Use the explorer, flashcards, and quiz to reinforce key concepts
3. **Do the Exercise** — Apply what you learned to a real or practice scenario
4. **Check Your Understanding** — Re-read the "Check" section in the syllabus. If you can do it, move on
5. **Repeat for each module** — Progress sequentially; each module builds on previous ones

### Learning Paths

**Visual Learner?** Start with slides and diagrams, then dive into the lesson.

**Hands-On Learner?** Jump to the exercise first, then read the lesson to understand the why.

**Completionist?** Work through every resource: lesson → slides → flashcards → explorer → quiz → exercise.

### For Instructors

Print or share `course.html` (desktop) or `course-mobile.html` (mobile) as your main delivery mechanism. All content is self-contained — no external dependencies beyond the HTML/SVG files.

### Architecture Direction

The repository started as a flat, single-course structure. It is now moving toward:

- multiple subjects in the same repo
- shared course-shell infrastructure
- subject-specific module manifests or data files
- browser-native delivery for all learner-facing material

The guiding rule is simple: **if a learner is meant to consume it directly, it should work cleanly in the browser on desktop and mobile without extra extensions**.

---

## Key Learning Outcomes

By the end of this course, you'll be able to:

- Build accurate mental models of Claude Code's capabilities and limitations
- Write CLAUDE.md files that give Claude persistent context about your standards and conventions
- Translate loosely-formed ideas into precise prompts that get consistent, high-quality results
- Use Claude Code to think through complex product decisions before building
- Design scalable architectures with Claude Code
- Test-drive your code to specification
- Build reusable Skills and compose them into workflows
- Connect Claude Code to external tools via MCP
- Orchestrate multi-agent workflows at scale
- Automate repetitive work with scheduled tasks
- Ship polished products with great documentation

---

## Framework: Goals, Problems, Solutions, Risks, Scope

This framework appears throughout the course. Internalize it:

- **Goals:** What does success look like?
- **Problems:** What's blocking progress?
- **Solutions:** What actions resolve problems or advance goals?
- **Risks:** What problems might the solution create?
- **Scope:** What's in bounds? What's out?

Use this to align with Claude Code, structure your CLAUDE.md, refine ideas, and design architecture.

---

## Support

For questions, issues, or feedback:

1. Review the **Structured Business Analysis.md** for framework clarification
2. Check the **SESSION-NOTES.md** for implementation context
3. Revisit the syllabus — it may have answers you missed the first time
4. Apply the framework to your own projects; learning happens through doing

---

## Getting Started

### Immediate Next Steps

1. **Read the syllabus** — Get the full bird's-eye view: `claude-code-course-syllabus.md`
2. **Open the library entry point** — Start with `index.html` to choose a subject
3. **Open Claude Code in the subject shell** — Use `course.html?subject=claude-code`
4. **Open Module 1 directly if you want** — Use `module-1-index.html` to navigate the first module's resources
5. **Review the Codex prototype** — Open `course.html?subject=openai-codex` or `codex-module-1-index.html`
6. **Complete the Module 1 exercise** — Confirm your setup works and get hands-on with Claude Code

### Setting Up Your Environment

Ensure you have:
- Claude Code installed (via terminal, VS Code extension, or desktop app)
- A text editor or IDE
- A terminal
- A test project folder where you can safely run Claude Code

---

## Course Philosophy

This is not a software development course. It's a course about using Claude Code as a **thinking and building partner** — from loosely-formed idea through delivery. Every module is grounded in structured thinking, practical exercises, and a clear-eyed assessment of where the tool excels and where it has blind spots.

You'll learn by doing, not by watching. Each module is short enough to complete in 1–2 hours, hands-on exercise included.

---

**Version:** Draft 1.3 — March 2026
**Author:** David (with Claude)
**License:** See LICENSE file
