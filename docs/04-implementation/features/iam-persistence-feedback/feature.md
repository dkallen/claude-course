# Feature: User Identity, Data Persistence, and Learner Feedback

**Date:** 2026-04-05
**Status:** In progress

## Traceability
- **GPSR Solutions:** S1, S2, S3, S4
- **Requirements:** This project does not maintain separate `REQ-###` IDs for this feature. Scope is derived from the GPSR goal/problem/solution set and the design package's interface definitions, schema, traceability matrix, and implementation order.

## Acceptance Criteria
- Given an unauthenticated learner tries to open the course, they are prompted to sign in and cannot view course content until sign-in succeeds.
- Given an authenticated learner opens the course on another browser or device, their notes and progress are available there without any GitHub token or Gist setup.
- Given an authenticated learner opens a module overview, they can review notes for that module grouped under the relevant resource headings.
- Given an authenticated learner wants to change a note, they do so on the resource page itself, and the module overview remains a read-only review surface.
- Given the notes experience has been simplified, learners rely on the web app's live Supabase-backed data rather than a separate note-specific local fallback.
- Given the remaining Gist code is removed, learners are never asked for Gist setup and do not depend on any Gist-specific sync UI or storage behavior.
- Given an authenticated learner submits thumbs-up or thumbs-down feedback from a module or resource page, the author can review the resulting feedback record with learner identity, context, rating, optional comment, and timestamp in Supabase.

## Test Mapping

| Criterion | Test Layer | Test Location |
|---|---|---|
| Auth gate keeps course content behind sign-in | Smoke | `tests/smoke/auth-gate.spec.js` |
| Notes and progress load across browsers/devices without GitHub setup | Smoke | `tests/smoke/persistence-cross-session.spec.js` |
| Module overview notes render as grouped read-only notes pulled from Supabase | Smoke | `tests/smoke/module-overview-notes-readonly.spec.js` |
| Resource pages are the only editable note surface and save directly to Supabase | Smoke | `tests/smoke/resource-note-editor.spec.js` |
| Learner flow has no remaining Gist dependency | Smoke | `tests/smoke/no-gist-dependency.spec.js` |
| Feedback submission stores full context in Supabase | Smoke | `tests/smoke/feedback-widget.spec.js` |

## Stories
- [ ] [Story 1: Simplify notes to Supabase-only persistence and read-only module overview](stories/story-001-stale-notes-sync.md)
- [ ] [Story 2: Remove remaining GitHub Gist dependency](stories/story-002-remove-gist-dependency.md)
- [ ] [Story 3: Capture thumbs-based learner feedback](stories/story-003-feedback-widget.md)

## Foundation Already Completed

| Step | Scope | Status | Notes |
|---|---|---|---|
| 1 | S4: Responsive shell, retire `course-mobile.html` | Done | Completed in commit `8b59e17`. |
| 2 | Stable resource IDs + page data attributes | Done | Added stable resource context for persistence and feedback. |
| 3 | S1: Supabase project setup, schema, RLS, `supabase-client.js`, auth gate | Done | Completed in commit `1dec92c`. Google/GitHub OAuth remain deferred. |
| 4 | S1: Notes and progress persistence via Supabase | In progress | Core persistence exists, but the original dual-storage implementation created note-consistency and usability problems that now need simplification. |

## Carry-Forward Decisions
- Auth is required up front on `course.html`; `index.html` and syllabus pages remain public.
- Flashcard state is intentionally excluded from persistence.
- No Gist data migration is needed; there is no user data worth preserving from the legacy approach.
- Feedback is append-only; learners do not edit or delete submitted entries.
- The author reviews feedback in the Supabase dashboard rather than a custom admin UI.
- Supabase is loaded by CDN script tag, and the feature remains vanilla JS throughout.
- Google and GitHub OAuth stay in design scope even though provider setup is deferred during current implementation.
- Notes use Supabase as the single persistent source of truth; note-related `localStorage` fallback is intentionally removed.
- Module overview notes are read-only; note editing happens only on the resource page itself.

## Current Risk / Known Gap
- The current notes implementation still carries transitional dual-surface and dual-storage behavior from the earlier approach. Story 1 now intentionally replaces that with a simpler model: Supabase-only note persistence plus grouped read-only notes in the module overview.

## Release Notes

_In progress_
