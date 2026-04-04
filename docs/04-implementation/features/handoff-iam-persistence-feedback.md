# Implementation Handoff: User Identity, Data Persistence, and Learner Feedback

**Date:** 2026-03-31
**Status:** In progress — steps 1–2 of 6 complete

---

## What this is

An enhancement to the course platform that adds user authentication, server-side data persistence, and a learner feedback mechanism. All analysis and design work is complete and approved. Implementation is partially underway.

## Key documents

| Document | Path | Status |
|----------|------|--------|
| GPSR Analysis | `docs/02-analysis/gpsr-iam-persistence-feedback.md` | Approved |
| Design Package | `docs/03-design/design-iam-persistence-feedback.md` | Approved |
| Backlog | `docs/plans/backlog.md` | Updated with deferred items |

Read the design package first — it has the component diagram, interface contracts, database schema, ADRs, implementation order, and traceability matrix.

## Decisions made (not all captured in design docs)

- **Auth is required upfront** on course.html. No progressive auth. Rationale: interrupting a lesson to sign up is worse than a one-time gate. Long-lived session cookie (sign in no more than once per week).
- **index.html and syllabus pages require no auth.** Learners can browse subject descriptions and syllabi before signing up.
- **Flashcard state is deliberately excluded** from persistence. Low-value data — no user-created content at risk.
- **No data migration needed.** David is the only current user and has no data worth preserving.
- **Feedback is append-only.** Learners cannot edit or delete submitted feedback. Author reviews via Supabase dashboard — no custom admin UI.
- **Stable resource IDs** will be added to `course-data.js` to decouple database records from file paths. Subjects already have `slug` as a stable ID.
- **CDN for Supabase SDK.** No build tools. Vanilla JS throughout.
- **Three auth methods:** email+password, magic link, social login (Google, GitHub).

## Implementation progress

| Step | Description | Status | Commit |
|------|-------------|--------|--------|
| 1 | S4: Make course.html responsive, retire course-mobile.html | Done | `8b59e17` |
| 2 | Add stable resource IDs to course-data.js, add data attributes to resource pages | Done | |
| 3 | S1: Supabase project setup, schema, RLS, supabase-client.js, auth gate on course.html | In progress — schema SQL written, supabase-client.js written, auth gate + login UI added to course.html. **Pending:** run schema SQL in Supabase dashboard, configure OAuth providers (Google, GitHub) in Supabase Auth settings, verify auth flow end-to-end. | |
| 4 | S1: Persistence — notes and progress read/write via Supabase | Not started | |
| 5 | S3: Remove all Gist integration code | Not started | |
| 6 | S2: Replace feedback-widget.js with thumbs up/down + optional comment | Not started | |

## Step 2 details: Stable resource IDs

Add an `id` field to every resource object in `course-data.js`. Convention: `m{moduleNum}-{type}`, e.g., `m1-lesson`, `m1-quiz`, `m2-builder`. The `id` must be unique within a subject and must never be reused.

Add `data-subject-id`, `data-module`, and `data-resource-id` attributes to a root element on every resource HTML page. These are how the widgets auto-capture context.

## Step 3 details: Supabase setup

Create a Supabase project. Set up three tables (`user_notes`, `user_progress`, `user_feedback`) per the ERD in the design package. Configure RLS policies. Create `supabase-client.js` as a shared module loaded via CDN `<script>` tag. Add an inline auth gate to course.html (login UI with all three methods).

Supabase config (URL and anon key) will be embedded in `supabase-client.js`. The anon key is designed to be public — RLS is the security boundary.

## Step 4 details: Persistence

Modify `notes-widget.js` to read/write notes via Supabase instead of localStorage. Upsert on save (debounced 600ms). Delete row when content is cleared. Offline fallback: degrade to localStorage if Supabase is unreachable.

Modify course.html progress functions to read/write `user_progress` via Supabase. Same upsert pattern. Progress data structure (`{"m1": true, "r1-0": true, ...}`) stored as JSONB — same shape as current localStorage.

## Step 5 details: Remove Gist

Strip from course.html: `gistFetch()`, `createGist()`, `loadFromGist()`, `saveToGist()`, `disconnectGist()`, `saveToken()`, `showTokenModal()`, `hideTokenModal()`, the token modal HTML, all `gistToken`/`gistId` variables, all `gist*Key()` helper functions, the sync status UI in the sidebar footer, and all related localStorage keys.

Remove `gistDescription` and `progressPrefix` from `course-data.js` subjects if no longer needed (verify first — `progressPrefix` may still be used for localStorage keys during offline fallback).

## Step 6 details: Feedback widget

Replace `feedback-widget.js` entirely. New widget: two thumb buttons (up/down) on every module and resource page. Clicking a thumb reveals an optional text input. On submit, insert into `user_feedback` with auto-captured context: `subject_id`, `module`, `resource_id`, `user_id`, `author_display_name`, `rating` (1 or -1), `comment` (nullable), `created_at`.

Also remove the "Feedback" button and `showFeedbackPanel()` from course.html's sidebar — the old feedback panel shows localStorage-based feedback which will no longer exist.

## Deferred work (in backlog)

- WAF and hardened security posture (Cloudflare, CAPTCHA)
- Published privacy policy (must ship before launching auth to users)
- AI-enabled review of exercises
