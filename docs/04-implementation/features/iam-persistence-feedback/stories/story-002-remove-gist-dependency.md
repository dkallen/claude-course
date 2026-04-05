# Story: Remove remaining GitHub Gist dependency

**Feature:** Feature: User Identity, Data Persistence, and Learner Feedback
**Status:** Not started

## Traceability
- **Feature:** `docs/04-implementation/features/iam-persistence-feedback/feature.md`
- **GPSR Solutions:** S3

## Description

Remove the remaining GitHub Gist persistence path and UI so learner progress depends on Supabase or intentional offline fallback rather than GitHub credentials.

## Acceptance Criteria
- Given `course.html` loads or saves learner progress, when persistence code runs, then it uses Supabase or the documented offline fallback and never requires Gist APIs, Gist IDs, or GitHub personal access tokens.
- Given the course shell renders for a learner, when navigation and sidebar UI are shown, then no Gist sync status, token modal, or connect/disconnect affordance is present.
- Given the cleanup removes legacy persistence helpers, when the source is inspected, then Gist-specific helper functions and Gist-related localStorage keys are absent while any remaining offline fallback keys stay aligned to current storage conventions.

## Test Mapping

| Criterion | Test Layer | Test Location |
|---|---|---|
| Course persistence path has no remaining Gist dependency | Contract | `tests/gist-removal.contract.test.js` |
| Legacy Gist UI affordances are absent from the course shell | Unit | `tests/course-shell-ui.test.js` |
| Offline fallback keys remain aligned after Gist cleanup | Contract | `tests/persistence-contract.test.js` |

## Tasks

- [ ] Add failing smoke test in `tests/smoke/no-gist-dependency.spec.js`.
- [ ] Remove Gist functions, modal markup, sync status UI, and Gist-specific localStorage usage from `course.html`.
- [ ] Verify whether `progressPrefix` is still required for offline fallback before removing it from `course-data.js`.
- [ ] Update release notes once learner flow no longer references GitHub.

## Notes

- No data migration is required.
- This cleanup is primarily about eliminating leftover complexity after Supabase persistence replaced the old approach.
