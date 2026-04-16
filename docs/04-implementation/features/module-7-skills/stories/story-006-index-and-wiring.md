# Story 6: Module 7 index and course shell wiring

**Feature:** Module 7 — Skills: Reusable Intelligence
**Status:** Done

## Traceability
- **Feature:** `docs/04-implementation/features/module-7-skills/feature.md`
- **Syllabus section:** Module 7

## Description

Create the Module 7 index page and wire all Module 7 resources into the course shell (course data, sidebar, navigation). This story makes Module 7 a first-class module alongside Modules 1–6: it appears in the sidebar, learners can navigate to it, and progress tracking works.

## Acceptance Criteria

- Given a learner opens the course shell and selects Module 7, the module overview shows the correct title, goal, and resource list.
- Given a learner has completed at least one Module 7 resource, module progress reflects that in the sidebar.
- Given a learner opens the Module 7 index page directly, it lists all Module 7 resources with correct links.
- Given all Module 7 resource pages exist, they all appear as navigable resources in the course shell sidebar.
- Given the course data is updated, `tests/resource-check.test.js` passes for all new Module 7 pages.
- Given all new pages are added to the auth protection contract test, `tests/auth-protection.contract.test.js` passes.

## Test Mapping

| Criterion | Test Layer | Test Location |
|---|---|---|
| All Module 7 resources appear in course data | Contract | `tests/resource-check.test.js` |
| All Module 7 pages are auth-protected | Contract | `tests/auth-protection.contract.test.js` |
| Module 7 appears correctly in course shell sidebar | Smoke | manual verification (course shell smoke suite) |

## Tasks

- [ ] Create `subjects/claude-code/module-7-index.html` following module-6-index.html as the structural template.
- [ ] Add all Module 7 resources (lesson, reference, exercise, quiz, flashcards, index) to the course data file with correct resource IDs (`m7-lesson`, `m7-reference`, `m7-exercise`, `m7-quiz`, `m7-flashcards`, `m7-index`).
- [ ] Confirm Module 7 appears in the sidebar with the correct module number, title, and resource links.
- [ ] Wire in `auth-guard.js`, `auth-account.js`, `notes-widget.js`, `feedback-widget.js`, and `version.js` on the index page.
- [ ] Add all Module 7 pages to `tests/auth-protection.contract.test.js`.
- [ ] Run `npm run test:node` and confirm all contract tests pass.
- [ ] Manually verify module navigation and progress tracking in the course shell.

## Notes

- Resource IDs must follow the existing `m<number>-<type>` convention used in Modules 1–6.
- The index page is both a navigation page and a light module overview — include the module goal statement from the syllabus.
- Complete this story last, after Stories 1–5 have created all the resource pages it links to.
