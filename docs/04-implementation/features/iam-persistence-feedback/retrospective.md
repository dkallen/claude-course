# Retrospective: iam-persistence-feedback

**Date:** 2026-04-05  
**Feature Reference:** [feature.md](./feature.md)  
**Status:** Draft

## Outcome Summary

- Notes are now persisted in Supabase with resource-page editing and read-only grouped notes in the module overview.
- Same-browser note updates now appear in already-open overview tabs through `BroadcastChannel`, reducing manual refresh friction.
- The learner-facing GitHub Gist dependency was removed from the course shell.
- Feedback is now collected through a Supabase-backed widget on resource pages instead of the old local export flow.
- Additional hardening work improved mobile tooltip behavior and automated the frontend version stamp from Git metadata for localhost verification.

## Goals for This Retrospective

- Capture which product simplifications reduced the most risk during implementation.
- Record where automated tests helped and where manual verification still revealed important gaps.
- Improve the feature methodology so future features close with clearer learning and fewer hidden assumptions.

## What Went Well

- Converting feature and story artifacts to the newer methodology created a much clearer path through the work.
- Simplifying notes to a single persistent source of truth in Supabase reduced repeated sync failures.
- Small, checkpointed commits made it easier to separate foundational fixes from later enhancements.
- BroadcastChannel delivered a noticeable UX improvement without requiring premature cross-device realtime infrastructure.

## What Was Hard

- The original hybrid `localStorage` plus Supabase note design created split-brain behavior and made debugging harder than expected.
- Cached localhost JavaScript made it easy to mistake stale browser runtime behavior for current implementation defects.
- The original Story 3 confidence level was too high because mocked browser tests did not prove real hosted persistence.
- Tooling/process confusion around automation browsers created extra friction until Chromium-only testing and verification rules were clarified.

## Key Decisions and Tradeoffs

| Decision | Why We Made It | Tradeoff |
|---|---|---|
| Move notes to Supabase-only persistence | Eliminate dual-store sync bugs and align to web-first product goals | Gave up offline note persistence |
| Make module overview notes read-only | Reduce confusion from multiple editing surfaces | Lost some convenience in overview editing |
| Add BroadcastChannel before Supabase Realtime | Solve the same-browser annoyance with lower complexity | Does not provide cross-device live updates |
| Use Playwright Chromium instead of installed Chrome | Avoid side effects on the daily-driver browser profile | Less direct validation of Chrome-specific behavior |
| Add a visible version stamp and automate it from Git metadata | Speed up localhost verification and stale-cache diagnosis | Adds a small scripting dependency to local start/test workflows |

## Defects, Incidents, and Near Misses

| Item | What Happened | What We Learned | Follow-up |
|---|---|---|---|
| Split-brain notes persistence | Notes diverged between resource pages and module overview because different surfaces effectively used different state sources | Dual persistence paths are expensive unless they are tightly constrained | [bug-001-notes-split-brain.md](./bugs/bug-001-notes-split-brain.md) |
| Stale localhost feedback runtime | Browser cache served an old feedback widget even after the server had the new code | Manual verification needs an explicit version/cache check before diagnosing product behavior | Backlog item: visible version stamp and localhost cache guidance |
| Tooltip clipping on mobile | Notes and feedback helper copy was truncated on smaller screens | Microcopy affordances need mobile verification too, not just core workflow testing | Backlog item completed on 2026-04-05 |

## Testing Reflection

- **What the automated tests caught:** contract drift, notes architecture expectations, Gist removal, read-only overview behavior, same-browser note refresh, and feedback payload behavior.
- **What manual testing caught:** stale-cache feedback confusion, real Supabase verification gaps, and mobile tooltip roughness.
- **What remained hard to verify:** true hosted persistence versus mocked browser flows, and distinguishing stale browser assets from real regressions.
- **Changes we should make to test strategy next time:** keep version/cache verification in the standard manual workflow and be explicit when smoke tests are mocked versus real-hosted.

## Methodology Reflection

- **Analysis/GPSR:** the core analysis was strong, but it did not fully surface the cost of dual persistence early enough.
- **Requirements:** requirements became clearer after simplifying to web-first, Supabase-only notes.
- **Design:** the design benefited from revisiting and pruning complexity instead of defending earlier assumptions.
- **Implementation stories:** breaking the work into Story 1/2/3 created manageable slices once the feature artifact was restructured.
- **Feature artifact quality:** adding stories, bugs, and now a retrospective makes the feature package much more useful for future contributors.

## Follow-up Actions

| Action | Type | Destination | Status |
|---|---|---|---|
| Keep Git-driven version generation in the standard local workflow so frontend verification stays trustworthy | Docs | [backlog.md](../../../plans/backlog.md) | Done |
| Keep BroadcastChannel as the chosen same-browser refresh solution; do not add Supabase Realtime unless a future cross-device need appears | Docs | [feature.md](./feature.md) | Done |
| Refine the retrospective methodology so every feature closes with a similar artifact | Docs | [feature-001-template.md](../feature-001-template.md) and [retrospective-template.md](../retrospective-template.md) | In progress |

## Commit and Artifact References

- **Primary feature doc:** [feature.md](./feature.md)
- **Stories:** [story-001-stale-notes-sync.md](./stories/story-001-stale-notes-sync.md), [story-002-remove-gist-dependency.md](./stories/story-002-remove-gist-dependency.md), [story-003-feedback-widget.md](./stories/story-003-feedback-widget.md)
- **Related bugs/incidents:** [bug-001-notes-split-brain.md](./bugs/bug-001-notes-split-brain.md)
- **Key commits:** `8d4d60c`, `97b40e8`, `f00fee7`, `e888d00`, `04a117b`, `1d46d0a`, `ee056bc`
- **Relevant test files:** `tests/course-notes-refresh.test.js`, `tests/notes-contract.test.js`, `tests/smoke/notes-live-sync.spec.js`, `tests/gist-removal.contract.test.js`, `tests/feedback-widget.test.js`, `tests/smoke/feedback-widget.spec.js`

## Closeout Check

- [ ] Outcome summary reflects the final shipped state.
- [ ] Major decisions and tradeoffs are recorded.
- [ ] Important defects or near misses are linked.
- [ ] Follow-up actions are pushed to backlog/incidents/docs as needed.
- [ ] A future contributor could understand what this feature taught us.
