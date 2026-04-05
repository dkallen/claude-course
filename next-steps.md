# Next Steps

**Date:** 2026-04-05
**Context:** Paused after clarifying the deeper notes-persistence bug and choosing a simpler architecture for Story 1. The IAM/persistence/feedback feature still has the same overall scope, but the notes implementation direction has changed: Supabase is the single source of truth, resource pages are the only editing surface, and the module overview becomes a grouped read-only notes view.

---

## What was accomplished recently

### Methodology improvements (in `ai-development`)

All committed to `ai-development/main`.

1. **Testing Strategy is now a first-class Design Package artifact** (`ai-development` commit `1b9eabe`).
   - New template: `docs-template/03-design/05-testing-strategy.md`
   - Testing Strategy added to the Design Package artifact list in both lifecycle docs
   - Stage 4 now includes multi-layer TDD guidance
   - Definition of Done now points to the project Testing Strategy instead of hardcoded test types

2. **Feature/story templates now support two levels of acceptance criteria** (`ai-development` commit `d7ec09a`).
   - Feature docs own cross-story, integration-level acceptance criteria
   - Story docs own single-component acceptance criteria
   - Feature criteria map to smoke/e2e tests
   - Story criteria map to unit/contract tests

3. **Claude Course now has the matching project Testing Strategy** (`claude-course` commit `e5b48a3`).
   - New file: `docs/03-design/05-testing-strategy.md`
   - Test layers defined: Unit, Contract, Smoke
   - Acceptance criteria now live in feature/story docs rather than the Testing Strategy

4. **The IAM/persistence/feedback implementation artifact was reorganized into a proper feature package.**
   - Feature doc: `docs/04-implementation/features/iam-persistence-feedback/feature.md`
   - Story 1: `docs/04-implementation/features/iam-persistence-feedback/stories/story-001-stale-notes-sync.md`
   - Story 2: `docs/04-implementation/features/iam-persistence-feedback/stories/story-002-remove-gist-dependency.md`
   - Story 3: `docs/04-implementation/features/iam-persistence-feedback/stories/story-003-feedback-widget.md`

5. **The notes bug was investigated deeply enough to expose the real architectural problem.**
   - The earlier implementation mixed Supabase persistence with note-related `localStorage` fallback.
   - Resource pages and module overview notes could diverge.
   - The feature is now intentionally shifting toward a simpler Supabase-only notes model.

---

## Where we are in the feature

### Completed foundation

| Step | Status |
|------|--------|
| 1. Responsive shell | Done |
| 2. Stable resource IDs + data attributes | Done |
| 3. Supabase project, schema, RLS, auth gate | Done (OAuth providers deferred) |
| 4. Notes + progress persistence via Supabase | Partially implemented, now being simplified |

### Remaining stories

| Story | Status |
|------|--------|
| Story 1. Simplify notes to Supabase-only persistence and read-only module overview | In progress |
| Story 2. Remove remaining GitHub Gist dependency | Not started |
| Story 3. Capture thumbs-based learner feedback | Not started |

## Current known gap

**Story 1 gap:** the notes experience still reflects the older dual-surface, dual-storage model. That model produced synchronization problems and added unnecessary complexity, especially for mobile/small-screen use.

Chosen direction:
- resource pages remain the only editable notes surface
- the module overview becomes a grouped read-only notes view
- Supabase becomes the only persistent store for notes
- note-related `localStorage` fallback is removed

---

## Next steps (in order)

### 1. Re-scope Story 1 implementation around the simplified notes model

The acceptance criteria and test direction now live in:
- Feature-level smoke criteria: `docs/04-implementation/features/iam-persistence-feedback/feature.md`
- Story-level criteria and concrete test design: `docs/04-implementation/features/iam-persistence-feedback/stories/story-001-stale-notes-sync.md`

The next implementation pass should target this simpler behavior rather than continuing to patch the older sync model.

### 2. Replace dual-storage notes behavior in code and tests

Implementation focus:
- remove note-related `localStorage` persistence/fallback
- keep note editing on resource pages only
- render grouped read-only notes in the module overview
- add clear load/save failure states when Supabase is unavailable

Test focus:
- smoke test for grouped read-only overview notes
- smoke test for resource-page note editing and reload behavior
- unit/contract coverage for grouped rendering and absence of note-related `localStorage` persistence

### 3. Update Story 1 docs/status after the simplified model is green

Once the new code and tests pass:
- mark Story 1 done in the story doc
- update feature status in the feature doc
- close or supersede bug notes tied only to the old dual-storage approach

### 4. Move to Story 2: remove remaining Gist dependency

Use:
- Feature smoke criterion in `docs/04-implementation/features/iam-persistence-feedback/feature.md`
- Story doc in `docs/04-implementation/features/iam-persistence-feedback/stories/story-002-remove-gist-dependency.md`

### 5. Move to Story 3: feedback widget

Use:
- Feature smoke criterion in `docs/04-implementation/features/iam-persistence-feedback/feature.md`
- Story doc in `docs/04-implementation/features/iam-persistence-feedback/stories/story-003-feedback-widget.md`

---

## Key files to read for context

| File | Location | What it tells you |
|------|----------|-------------------|
| GPSR analysis | `docs/02-analysis/gpsr-iam-persistence-feedback.md` | Goals, problems, solutions, risks |
| Design package | `docs/03-design/design-iam-persistence-feedback.md` | Interfaces, schema, ADRs, implementation order, traceability matrix |
| Testing Strategy | `docs/03-design/05-testing-strategy.md` | Test layers, workflow, constraints |
| Feature doc | `docs/04-implementation/features/iam-persistence-feedback/feature.md` | Feature-level acceptance criteria, smoke test mapping, current status |
| Story 1 | `docs/04-implementation/features/iam-persistence-feedback/stories/story-001-stale-notes-sync.md` | Story-level criteria and tasks for simplified Supabase-only notes |
| Story 2 | `docs/04-implementation/features/iam-persistence-feedback/stories/story-002-remove-gist-dependency.md` | Story-level criteria and tasks for Gist removal |
| Story 3 | `docs/04-implementation/features/iam-persistence-feedback/stories/story-003-feedback-widget.md` | Story-level criteria and tasks for the feedback widget |
| Bug RCA | `docs/04-implementation/features/iam-persistence-feedback/bugs/bug-001-notes-split-brain.md` | Root cause analysis for the old dual-storage notes bug |
| Feature template | `docs/04-implementation/features/feature-001-template.md` | Current feature artifact structure |
| Story template | `docs/04-implementation/features/stories/story-template.md` | Current story artifact structure |
| Methodology (short) | `../ai-development/architecture/CLAUDE.md` | Process rules including two-level acceptance criteria and multi-layer TDD |
| Methodology (full) | `../ai-development/architecture/The_Adaptive_Software_Engineering_Lifecycle.md` | Full lifecycle guidance |

## Infrastructure notes

- **Local dev server:** `npm start` runs on port 8080 (`bin/serve.sh`). Required for Supabase auth and smoke tests.
- **Tests:** `npm test` runs node tests plus Playwright smoke tests. `npm run test:smoke` runs the browser layer directly.
- **Playwright browser choice:** smoke tests should run against Playwright's bundled Chromium, not the installed `Google Chrome.app`. The config explicitly sets `browserName: "chromium"` in `playwright.config.js` to avoid surfacing automation-controlled Chrome windows that can block normal Google sign-in and confuse profile behavior.
- **Supabase:** URL is configured for `http://localhost:8080`. The anon key lives in `supabase-client.js`.
