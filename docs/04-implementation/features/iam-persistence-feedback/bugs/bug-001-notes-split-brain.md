# Bug: Notes Split-Brain Between Course Shell and Resource Pages

**Date:** 2026-04-05
**Feature:** [iam-persistence-feedback](../feature.md)
**Status:** In progress

## Summary

An authenticated learner can see different note content for the same resource depending on where they view it:
- `course.html` module overview / Notes panel
- the resource page note widget

This is a split-brain persistence bug, not just a stale-tab-refresh bug.

## Symptoms

- Editing a note in the resource-page widget does not reliably show the same value in `course.html`.
- Editing a note in `course.html` does not reliably show the same value back on the resource page.
- After closing and reopening the browser, the divergence can persist.
- Supabase and localStorage can hold different values for the same logical note.

## Confirmed Evidence

### Module 4 example

Resource:
- `subject_id = claude-code`
- `resource_id = m4-exercise`

Observed values:
- Supabase `user_notes` row matched the Module 4 overview version:

```text
i'm using a project in github called air-quality as my exercise.
It can be used for other exercises.
this should now be preserved
```

- Local storage `course-notes-claude-code["m4-exercise"]` matched the resource-page widget version:

```json
{"m4-exercise":"i'm using a project in github called air-quality as my exercise.\nIt can be used for other exercises.\nthis should now be preserved even when entered from any point."}
```

## Root Cause Analysis

### 1. Design root cause

The design intentionally kept `localStorage` as a fallback even after adopting Supabase.

Evidence:
- GPSR identifies `localStorage-only` persistence as a problem to eliminate: `docs/02-analysis/gpsr-iam-persistence-feedback.md`
- Design defines Supabase as primary for notes, but keeps localStorage as degraded fallback: `docs/03-design/design-iam-persistence-feedback.md`
- Design explicitly says there is **no sync-back mechanism in v1**.

Implication:
- The system was not designed as direct-to-database-only persistence.
- It was designed as dual-mode persistence with explicit tolerance for divergence risk.

### 2. Implementation root cause

The resource-page runtime never actually got the Supabase bootstrap that the design assumes.

Evidence:
- `notes-widget.js` only uses Supabase if `window.supabaseClient` exists.
- Resource pages load `notes-widget.js` and `feedback-widget.js`, but not the Supabase CDN script or `supabase-client.js`.
- `course.html` does load Supabase.

Implication:
- `course.html` is Supabase-aware.
- Resource pages are effectively localStorage-only.
- The offline fallback became the default write path on resource pages instead of an exceptional degraded path.

### 3. Reconciliation root cause

Even when `course.html` reads the authoritative Supabase value, it does not heal the stale local copy that resource pages continue to use.

Evidence:
- `course.html` merges remote note state into in-memory note state.
- It does not persist the reconciled result back into localStorage after the merge.

Implication:
- Shell and resource pages can continue reading different values across restarts.

### 4. Testing root cause

The tests validated local tab-sync behavior, not shared-source-of-truth persistence.

Evidence:
- Smoke coverage focused on “save in one tab, return focus to another tab, note appears”.
- Tests did not verify that resource pages actually participate in the Supabase-backed persistence model.
- Tests did not verify convergence between localStorage and Supabase after divergence.

Implication:
- Story 1 tests proved a narrower behavior than the feature promise.

## Fix Direction

A correct fix needs to do all of the following:
- ensure pages with note widgets participate in the Supabase bootstrap path
- reconcile divergent local and remote note values instead of blindly preferring one forever
- heal localStorage after reconciliation so all note surfaces read the same value
- add tests that guard the bootstrap and reconciliation behavior, not just tab refresh

## Notes

This bug reframes Story 1. The issue is broader than a stale in-memory `notes` object in `course.html`; it is a mismatch between the intended persistence architecture and the actual runtime architecture on resource pages.
