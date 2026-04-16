# Story 1: Module 7 lesson page

**Feature:** Module 7 — Skills: Reusable Intelligence
**Status:** Done

## Traceability
- **Feature:** `docs/04-implementation/features/module-7-skills/feature.md`
- **Syllabus section:** Module 7 key concepts

## Description

Build the primary lesson page for Module 7. This is the main reading surface that explains what skills are, how they work, and how to author them. It follows the same page structure as other module lesson pages.

## Acceptance Criteria

- Given a learner opens the Module 7 lesson page, all key concepts from the syllabus are covered: skill anatomy, SKILL.md structure, frontmatter fields, invocation control, arguments, dynamic context injection, subagent execution (`context: fork`), supporting files, context lifecycle/compaction behavior, bundled skills, and the skills-vs-CLAUDE.md-vs-prompts distinction.
- Given the lesson page loads, it is protected by `auth-guard.js` and shows the account widget via `auth-account.js`.
- Given a learner is on the lesson page, the notes widget and feedback widget are present and functional.
- Given the lesson page includes code examples, they use `<code>` and `<pre>` elements consistent with other lesson pages.
- Given a learner views the page on mobile, the layout is readable without horizontal scrolling.

## Test Mapping

| Criterion | Test Layer | Test Location |
|---|---|---|
| Lesson page is listed as a resource for module 7 in course data | Contract | `tests/resource-check.test.js` |
| Lesson page is auth-protected | Contract | `tests/auth-protection.contract.test.js` |

## Tasks

- [ ] Create `subjects/claude-code/module-7-lesson.html` following module-6-lesson.html as the structural template.
- [ ] Cover all key concepts from the updated syllabus Module 7 entry.
- [ ] Include worked SKILL.md examples: a simple reference skill, a task skill with `disable-model-invocation: true`, a skill using `$ARGUMENTS`, and a skill using `context: fork`.
- [ ] Wire in `auth-guard.js`, `auth-account.js`, `notes-widget.js`, `feedback-widget.js`, and `version.js`.
- [ ] Add the resource entry to the course data file so `resource-check.test.js` picks it up.
- [ ] Add the page to `tests/auth-protection.contract.test.js`.

## Notes

- Model the page structure on `subjects/claude-code/module-6-lesson.html` — same script stack, same CSS patterns.
- Frontmatter field reference table belongs in the reference page (Story 2), not here. The lesson should explain concepts and show representative examples, not exhaustively document every field.
- The Agent Skills open standard (agentskills.io) should be mentioned once as context but the lesson should stay focused on the Claude Code implementation.
