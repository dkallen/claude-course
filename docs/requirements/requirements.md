# LMS Platform Requirements

This document captures the functional and non-functional requirements for delivering the existing course content and supporting planned expansion (new topics, multiple users). Requirements are inferred from the current custom-built platform's capabilities and the stated goal of scaling beyond personal use.

**Status:** Draft for review — refine before platform comparison.

---

## 1. Content Structure & Organization

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| C1 | Support multiple independent subjects (e.g., Claude Code, OpenAI Codex) with separate progress tracking per subject | Must | Currently 2 subjects; expect growth |
| C2 | Organize modules into named sections (e.g., "Working at Your Desk", "Working When You're Away", "Shipping") | Must | 3 sections per subject currently |
| C3 | Support 10-15+ modules per subject, each with a title, section assignment, and ordering | Must | Currently 14 modules per subject |
| C4 | Each module contains a variable number of resources (1-9 per module currently) | Must | |
| C5 | Resources are typed: lesson (read), visual (diagram/slides), interactive (quiz/explorer/builder), exercise, reference | Must | Type drives UI labeling and presentation |
| C6 | Modules have a structured phase system that groups resources into a recommended learning sequence (e.g., Learn → Explore → Practice → Test → Bookmark) | Should | Non-linear; learners can access any phase |
| C7 | Each module has a self-assessment "check" — a qualitative readiness statement, not a scored gate | Must | No gating or pass/fail — advisory only |
| C8 | Landing page showing all available subjects with module counts and entry points | Should | |

## 2. Content Types & Delivery

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| D1 | Long-form lesson content (~2,000-4,000 words) with formatted text, headings, lists, code blocks | Must | Standard HTML content |
| D2 | SVG diagrams and concept maps viewable inline or in a new tab | Must | Custom-drawn, not generated |
| D3 | Slide-style presentations (HTML-based, not PowerPoint) | Should | Currently self-contained HTML |
| D4 | Multiple-choice quizzes with per-option explanations (not just correct/incorrect) | Must | Explanation text is pedagogically central |
| D5 | Flashcard system with flip interaction and three states: unseen, review, known | Should | Spaced-repetition-style study aid |
| D6 | Flashcard filtering by status (all, review, known, new) with count display | Should | |
| D7 | Custom interactive tools embedded in the course (e.g., CLAUDE.md Builder, Prompt Calibrator, Spec-to-Tests Workbench) | Must | These are bespoke React apps, not standard assessment types |
| D8 | Interactive concept explorers with click-through deep-dive on individual concepts | Should | |
| D9 | Reference cards — condensed, quick-lookup summaries per module | Nice | |
| D10 | Resources open in a new tab / separate view, not replacing the navigation shell | Should | Current behavior: target="_blank" |

## 3. Progress Tracking

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| P1 | Module-level completion checkbox (manual, learner-controlled) | Must | Not auto-calculated from resource completion |
| P2 | Resource-level completion checkbox per resource within a module | Must | |
| P3 | Visual progress bar showing modules completed out of total | Must | |
| P4 | Progress persists across sessions | Must | |
| P5 | Progress is per-subject (switching subjects shows independent progress) | Must | |
| P6 | No automated gating — learner decides when they're done, not the system | Must | Philosophical: self-directed learning |

## 4. Notes & Annotation

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| N1 | Per-resource note-taking (free-text attached to each individual resource) | Must | Not just per-module — per-resource granularity |
| N2 | Inline note editing from within the module view (expand/collapse per resource) | Should | |
| N3 | Centralized notes view aggregating all notes across all modules with resource links | Should | |
| N4 | Auto-save with debounce (no explicit save button) | Should | |

## 5. Navigation & UX

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| U1 | Sidebar navigation showing all modules grouped by section with expand/collapse | Must | |
| U2 | Module detail panel showing phases and resources when a module is selected | Must | |
| U3 | Subject switcher without leaving the course shell | Should | |
| U4 | Mobile-responsive layout (sidebar collapses, touch-friendly targets) | Must | |
| U5 | Clean, minimal visual design — no clutter, muted palette, clear typography | Should | Aesthetic preference, not just functional |
| U6 | Fast page loads — no spinner, no server round-trips for navigation | Should | Current: instant because everything is static |

## 6. Multi-User & Access (New — Required for Offering to Others)

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| M1 | User accounts with authentication (email/password or SSO) | Must | Currently absent — blocks multi-user |
| M2 | Each user has independent progress and notes per subject | Must | |
| M3 | Server-side progress storage (not browser localStorage) | Must | localStorage is device-bound and fragile |
| M4 | Enrollment / access control (who can access which subjects) | Should | |
| M5 | Admin view: see which users have enrolled and their progress | Should | |
| M6 | Payment integration (one-time or subscription) if offering commercially | Conditional | Only if monetizing |
| M7 | Self-service registration or invitation-based onboarding | Should | |

## 7. Content Authoring & Maintenance

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| A1 | Adding a new module should not require hand-coding HTML navigation, shell, or sidebar entries | Should | Currently: add to course-data.js + create HTML files |
| A2 | Standard content (lessons, quizzes, flashcards, references) should be authorable without writing raw HTML | Should | Currently: all content is hand-coded HTML |
| A3 | Custom interactive tools (builders, calibrators, workbenches) must remain embeddable even if standard content moves to a CMS | Must | These are the differentiators |
| A4 | Course structure (sections, modules, phases, resource ordering) should be editable without touching code | Should | |
| A5 | Content updates should be deployable without a full rebuild/deploy cycle | Nice | |

## 8. Sync & Portability

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| S1 | Progress accessible from any device (desktop, tablet, phone) | Must | Currently: GitHub Gist workaround |
| S2 | No dependency on GitHub account or personal access tokens for end users | Must | Current sync mechanism is too technical for non-developers |
| S3 | Offline access or graceful degradation when disconnected | Nice | Current: fully offline-capable as static files |

## 9. Analytics & Insights (New — Valuable for Scaling)

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| I1 | Which modules/resources are most and least completed | Should | |
| I2 | Where learners drop off or stall | Should | |
| I3 | Time-on-task or engagement proxies | Nice | |
| I4 | Aggregate completion rates across cohorts | Nice | Only relevant if offering to groups |

## 10. Deployment & Operations

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| O1 | Hostable without managing servers (static hosting or managed platform) | Should | Currently: static files, deployable anywhere |
| O2 | No ongoing infrastructure maintenance burden | Should | Goal: spend time on content, not ops |
| O3 | Custom domain support | Nice | |
| O4 | SSL/HTTPS | Must | |

---

*Architectural decision: [ADR-001 — Custom Platform over LMS](docs/adr/001-custom-platform-over-lms.md)*
