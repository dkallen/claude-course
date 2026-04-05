# Story: Simplify notes to Supabase-only persistence and read-only module overview

**Feature:** Feature: User Identity, Data Persistence, and Learner Feedback
**Status:** In progress

## Traceability
- **Feature:** `docs/04-implementation/features/iam-persistence-feedback/feature.md`
- **GPSR Solutions:** S1

## Description

Replace the earlier dual-surface, dual-storage notes model with a simpler architecture: resource pages remain the only editable notes surface, the module overview becomes a grouped read-only notes view, and Supabase becomes the only persistent store for notes.

## Acceptance Criteria
- Given an authenticated learner opens the module overview notes surface, notes for that module are shown as read-only notes grouped by resource in module order.
- Given an authenticated learner opens the module overview notes surface, any resource in that module that does not yet have a note shows the text `No notes available` in the read-only display of notes.
- Given an authenticated learner opens a resource page, they can edit that page's note there and save it to Supabase.
- Given a learner edits notes on a resource page, reopening that resource page or the module overview shows the latest saved note from Supabase.
- Given a learner is offline, signed out, or cannot reach Supabase, the UI explains that notes are unavailable or unsaved instead of silently falling back to note-related `localStorage` persistence.

## Verification Notes
- The module overview should render notes as grouped read-only content, not editable textareas.
- The module overview should preserve module resource order whether or not every resource has a saved note.
- Resources without saved notes should show the exact read-only text `No notes available`.
- Resource pages remain the only note editor and should load and save through Supabase.
- Note-related `localStorage` persistence paths should be removed rather than left as a silent fallback.
- Technical selectors, target pages, and test flows belong in the Concrete Test Design section below.

## Test Mapping

| Criterion | Test Layer | Test Location |
|---|---|---|
| Module overview groups notes by resource and renders them read-only | Smoke | `tests/smoke/module-overview-notes-readonly.spec.js` |
| Module overview shows explicit empty states for resources without notes | Smoke | `tests/smoke/module-overview-notes-readonly.spec.js` |
| Resource-page note editor writes directly to Supabase | Smoke | `tests/smoke/resource-note-editor.spec.js` |
| Notes load from Supabase on both surfaces after reopen/reload | Smoke | `tests/smoke/resource-note-editor.spec.js` |
| Note persistence code no longer depends on note-related `localStorage` read/write paths | Contract | `tests/notes-contract.test.js` |
| Grouped module-overview notes rendering transforms module resources and note rows consistently | Unit | `tests/course-notes-refresh.test.js` |

## Concrete Test Design

### Smoke test design: module overview read-only notes

**File:** `tests/smoke/module-overview-notes-readonly.spec.js`

**Purpose:**
Prove that the module overview is a read-only aggregation surface for notes, not a second editor.

**Recommended fixed target:**
- Subject: `claude-code`
- Module: `module-4`
- Resource IDs in order:
  - `m4-lesson`
  - `m4-framework-map`
  - `m4-exercise`
  - `m4-quiz`
  - `m4-reference`

**Suggested browser interactions:**
1. Open the guided exercise resource page and save a unique note for `m4-exercise`
2. Open `course.html?subject=claude-code`
3. Navigate to Module 4 and open the module overview notes surface
4. Assert that notes are grouped under resource headings in module resource order
5. Assert that the `Guided Exercise` section shows the saved note text
6. Assert that the overview note display is not editable
7. Assert that resources with no note show the exact text `No notes available` instead of an editor

### Smoke test design: resource page as sole editor

**File:** `tests/smoke/resource-note-editor.spec.js`

**Purpose:**
Prove that resource pages are the canonical editing surface and that note persistence is Supabase-backed.

**Suggested browser interactions:**
1. Open a resource page such as `subjects/claude-code/module-4-exercise.html`
2. Open the notes widget
3. Enter a unique note string and wait for a successful save indicator
4. Reload the resource page and verify the same text loads back
5. Open `course.html?subject=claude-code` and verify the grouped read-only overview shows the same text for `Guided Exercise`
6. Verify the overview surface does not allow editing that note

### Unit / contract design

**Unit focus:**
- Transform Supabase note rows plus module resource metadata into a grouped read-only view model
- Preserve module resource order while associating each resource with either note text or an explicit empty state

**Contract focus:**
- Ensure note persistence code no longer uses note-related `localStorage` key conventions
- Ensure module overview markup/configuration does not expose editable note textareas for overview notes

## Tasks

- [ ] Replace Story 1's old stale-tab assumptions with the simplified note architecture in code and tests.
- [ ] Make the module overview note surface grouped and read-only by resource.
- [ ] Keep note editing only on resource pages.
- [ ] Remove note-related `localStorage` persistence and fallback logic.
- [ ] Add smoke coverage for grouped read-only overview notes and resource-page editing.
- [ ] Add unit/contract coverage for grouped note rendering and absence of note-related `localStorage` persistence.
- [ ] Update feature status after the new smoke tests pass.

## Notes

- This story supersedes the earlier attempt to make dual-surface note editing synchronize cleanly across tabs and storage layers.
- The architectural lesson from the bug investigation is that dual editable surfaces plus dual persistence layers created more complexity than this project needs.
- The module overview remains valuable, but as a review surface rather than a second editing surface.
- Run the smoke suite against Playwright's bundled Chromium, not the installed `Google Chrome.app`. Using automation-controlled Chrome can surface a stripped-down browser window, disable normal Google sign-in, and confuse profile behavior outside the test run.
- Mobile and small-panel usability should favor readable grouped notes over cramped inline editing controls in the module overview.
