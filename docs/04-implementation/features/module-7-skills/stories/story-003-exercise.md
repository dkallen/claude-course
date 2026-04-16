# Story 3: Module 7 exercise page

**Feature:** Module 7 — Skills: Reusable Intelligence
**Status:** Done

## Traceability
- **Feature:** `docs/04-implementation/features/module-7-skills/feature.md`
- **Syllabus section:** Module 7 exercise

## Description

Build the guided exercise page for Module 7. This page walks the learner through the full skill-authoring loop: identify a repeated task, write the SKILL.md, test manual invocation, test auto-invocation, and iterate. The exercise mirrors the syllabus exercise description.

## Acceptance Criteria

- Given a learner opens the Module 7 exercise page, the exercise is broken into clearly numbered steps that match the syllabus exercise description.
- Given the exercise includes a step to write SKILL.md, that step includes a starter template with placeholder values the learner fills in.
- Given the exercise includes a step to test auto-invocation, it explains what the learner should observe in the Claude Code session to confirm the skill triggered automatically.
- Given the exercise includes a step on `disable-model-invocation`, it explains the rationale (side-effect tasks the learner controls, not Claude).
- Given the exercise includes a completion check, it matches the syllabus check: consistent output across inputs, and reliable auto-trigger behavior.
- Given the page loads, it is auth-protected and has the account widget, notes widget, and feedback widget.

## Test Mapping

| Criterion | Test Layer | Test Location |
|---|---|---|
| Exercise page is listed as a resource for module 7 in course data | Contract | `tests/resource-check.test.js` |
| Exercise page is auth-protected | Contract | `tests/auth-protection.contract.test.js` |

## Tasks

- [ ] Create `subjects/claude-code/module-7-exercise.html` following module-6-exercise.html as the structural template.
- [ ] Write the step-by-step exercise following the syllabus description.
- [ ] Include a starter SKILL.md template (frontmatter + body) as a copyable code block.
- [ ] Include the syllabus completion check verbatim as the final element.
- [ ] Wire in `auth-guard.js`, `auth-account.js`, `notes-widget.js`, `feedback-widget.js`, and `version.js`.
- [ ] Add the resource entry to the course data file.
- [ ] Add the page to `tests/auth-protection.contract.test.js`.

## Notes

- The starter template should show a meaningful real-world example, not a toy "hello world" skill. Something like a commit-message writer or a PR summary skill.
- Steps should be action-oriented ("Create the directory", "Write the frontmatter", "Run the slash command") not concept-heavy. Save explanation for the lesson page.
