# Story 4: Module 7 quiz

**Feature:** Module 7 — Skills: Reusable Intelligence
**Status:** Done

## Traceability
- **Feature:** `docs/04-implementation/features/module-7-skills/feature.md`
- **Syllabus section:** Module 7 (assessment)

## Description

Build the quiz page for Module 7. The quiz tests understanding of skill concepts: anatomy, invocation control, when to use skills vs. other mechanisms, and key behaviors like compaction survival and supporting file loading.

## Acceptance Criteria

- Given a learner opens the Module 7 quiz, there are at least 8 questions covering the key concepts from the lesson.
- Given a learner answers a question, they receive immediate feedback with an explanation (not just "correct" or "incorrect").
- Given the quiz includes a question about invocation control, it tests the difference between `disable-model-invocation` and `user-invocable: false`.
- Given the quiz includes a question about context, it tests the correct understanding that skill descriptions are always in context but the body loads only on invocation.
- Given the quiz includes a question about compaction, it tests that invoked skills are re-attached after auto-compaction up to a token budget.
- Given the page loads, it is auth-protected and has the account widget and feedback widget.

## Test Mapping

| Criterion | Test Layer | Test Location |
|---|---|---|
| Quiz page is listed as a resource for module 7 in course data | Contract | `tests/resource-check.test.js` |
| Quiz page is auth-protected | Contract | `tests/auth-protection.contract.test.js` |

## Tasks

- [ ] Create `subjects/claude-code/module-7-quiz.html` following module-6-quiz.html as the structural template.
- [ ] Write at least 8 questions with multiple-choice answers and explanations.
- [ ] Ensure at least one question covers each of: skill anatomy, invocation control, skills vs. CLAUDE.md vs. prompts, `$ARGUMENTS`, dynamic context injection, subagent execution, supporting file loading, and compaction behavior.
- [ ] Wire in `auth-guard.js`, `auth-account.js`, `feedback-widget.js`, and `version.js`.
- [ ] Add the resource entry to the course data file.
- [ ] Add the page to `tests/auth-protection.contract.test.js`.

## Notes

- Keep questions practical and scenario-based where possible ("You want Claude to automatically suggest using your skill whenever someone asks how code works. Which frontmatter setting do you rely on?") rather than definitional.
- The explanation for each answer is as important as the question itself — learners who get it wrong need to understand why.
