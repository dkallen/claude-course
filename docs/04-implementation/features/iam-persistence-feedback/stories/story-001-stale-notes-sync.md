# Story: Simplify notes to Supabase-only persistence and read-only module overview

**Feature:** Feature: User Identity, Data Persistence, and Learner Feedback
**Status:** Done

## Traceability
- **Feature:** `docs/04-implementation/features/iam-persistence-feedback/feature.md`
- **GPSR Solutions:** S1, S5

## Description

Replace the earlier dual-surface, dual-storage notes model with a simpler architecture: resource pages remain the only editable notes surface, the module overview becomes a grouped read-only notes view, Supabase becomes the only persistent store for notes, and same-browser open tabs stay aligned through a small `BroadcastChannel` refresh hint.

## Acceptance Criteria
- Given an authenticated learner opens the module overview notes surface, notes for that module are shown as read-only notes grouped by resource in module order.
- Given an authenticated learner opens the module overview notes surface, any resource in that module that does not yet have a note shows the text `No notes available` in the read-only display of notes.
- Given an authenticated learner opens a resource page, they can edit that page's note there and save it to Supabase.
- Given a learner edits notes on a resource page, reopening that resource page or the module overview shows the latest saved note from Supabase.
- Given an authenticated learner has the module overview open in one tab and saves a note on a resource page in another tab of the same browser profile, the already-open overview updates without a manual page refresh.
- Given a learner is offline, signed out, or cannot reach Supabase, the UI explains that notes are unavailable or unsaved instead of silently falling back to note-related `localStorage` persistence.

## Verification Notes
- The module overview should render notes as grouped read-only content, not editable textareas.
- The module overview should preserve module resource order whether or not every resource has a saved note.
- Resources without saved notes should show the exact read-only text `No notes available`.
- Resource pages remain the only note editor and should load and save through Supabase.
- Same-browser live refresh should be treated as a UX enhancement layered on top of Supabase persistence, not as an alternative source of truth.
- The course shell should refresh from Supabase after receiving a matching `BroadcastChannel` message rather than trusting the message payload itself as canonical data.
- Note-related `localStorage` persistence paths should be removed rather than left as a silent fallback.
- Technical selectors, target pages, and test flows belong in the Concrete Test Design section below.

## Test Mapping

| Criterion | Test Layer | Test Location |
|---|---|---|
| Module overview groups notes by resource and renders them read-only | Smoke | `tests/smoke/module-overview-notes-readonly.spec.js` |
| Module overview shows explicit empty states for resources without notes | Smoke | `tests/smoke/module-overview-notes-readonly.spec.js` |
| Resource-page note editor writes directly to Supabase | Smoke | `tests/smoke/resource-note-editor.spec.js` |
| Notes load from Supabase on both surfaces after reopen/reload | Smoke | `tests/smoke/resource-note-editor.spec.js` |
| Already-open overview tabs reflect successful resource-page note saves without manual refresh | Smoke | `tests/smoke/notes-live-sync.spec.js` |
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

### Smoke test design: same-browser live note refresh

**File:** `tests/smoke/notes-live-sync.spec.js`

**Purpose:**
Prove that the already-open module overview reflects a successful resource-page note save in another tab of the same browser profile without requiring a manual refresh.

**Suggested browser interactions:**
1. Open `course.html?subject=claude-code`
2. Navigate to Module 4 and open the module overview notes surface
3. In a second tab in the same browser context, open `subjects/claude-code/module-4-exercise.html`
4. Enter a unique note string and wait for a successful save indicator
5. Return focus to the course-shell tab without reloading it
6. Assert that the `Guided Exercise` note in the open overview updates to the newly saved text
7. Verify that the overview remains read-only after the live update

### Unit / contract design

**Unit focus:**
- Transform Supabase note rows plus module resource metadata into a grouped read-only view model
- Preserve module resource order while associating each resource with either note text or an explicit empty state

**Contract focus:**
- Ensure note persistence code no longer uses note-related `localStorage` key conventions
- Ensure module overview markup/configuration does not expose editable note textareas for overview notes

## Tasks

- [x] Replace Story 1's old stale-tab assumptions with the simplified note architecture in code and tests.
- [x] Make the module overview note surface grouped and read-only by resource.
- [x] Keep note editing only on resource pages.
- [x] Remove note-related `localStorage` persistence and fallback logic.
- [x] Add smoke coverage for grouped read-only overview notes and resource-page editing.
- [x] Add unit/contract coverage for grouped note rendering and absence of note-related `localStorage` persistence.
- [x] Add same-browser `BroadcastChannel` live refresh between resource-page saves and the already-open module overview.
- [x] Add smoke coverage for same-browser live note refresh without manual reload.
- [x] Update feature status after the new smoke tests pass.

## Notes

- This story supersedes the earlier attempt to make dual-surface note editing synchronize cleanly across tabs and storage layers.
- The architectural lesson from the bug investigation is that dual editable surfaces plus dual persistence layers created more complexity than this project needs.
- The module overview remains valuable, but as a review surface rather than a second editing surface.
- `BroadcastChannel` is intentionally a small same-browser enhancement. It should not blur the architectural rule that Supabase is the only persistent source of truth for notes.
- Run the smoke suite against Playwright's bundled Chromium, not the installed `Google Chrome.app`. Using automation-controlled Chrome can surface a stripped-down browser window, disable normal Google sign-in, and confuse profile behavior outside the test run.
- Mobile and small-panel usability should favor readable grouped notes over cramped inline editing controls in the module overview.
