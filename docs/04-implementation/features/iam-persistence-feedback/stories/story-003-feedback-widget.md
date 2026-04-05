# Story: Capture thumbs-based learner feedback

**Feature:** Feature: User Identity, Data Persistence, and Learner Feedback
**Status:** Not started

## Traceability
- **Feature:** `docs/04-implementation/features/iam-persistence-feedback/feature.md`
- **GPSR Solutions:** S2

## Description

Replace the current feedback flow with a low-friction thumbs-up/thumbs-down widget that stores optional learner comments with automatic page context in Supabase.

## Acceptance Criteria
- Given a module or resource page exposes `data-subject-id`, `data-module`, and `data-resource-id`, when a learner selects thumbs up or thumbs down, then the widget captures that context together with the selected rating.
- Given a learner optionally enters text after selecting a rating, when the feedback is submitted, then the payload writes `rating` as `1` or `-1` and `comment` as nullable text.
- Given the new widget owns feedback capture, when `course.html` renders, then the old localStorage-based feedback panel affordance is absent from the course shell.

## Test Mapping

| Criterion | Test Layer | Test Location |
|---|---|---|
| Feedback widget captures page context and selected rating | Contract | `tests/feedback-context.contract.test.js` |
| Feedback payload shape is normalized before write | Unit | `tests/feedback-widget.test.js` |
| Legacy feedback panel affordance is removed from the course shell | Unit | `tests/course-shell-ui.test.js` |

## Tasks

- [ ] Add failing smoke test in `tests/smoke/feedback-widget.spec.js`.
- [ ] Replace `feedback-widget.js` with the thumbs-up/thumbs-down interaction and optional comment flow.
- [ ] Remove the old course-shell feedback panel affordance and `showFeedbackPanel()` path.
- [ ] Verify the Supabase payload matches the design package fields before marking the story done.

## Notes

- The author review experience remains the Supabase dashboard; no custom admin UI is part of this story.
- This story depends on the stable page context attributes already added in the completed foundation work.
