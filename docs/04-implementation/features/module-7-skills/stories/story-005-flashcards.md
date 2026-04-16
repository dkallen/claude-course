# Story 5: Module 7 flashcards

**Feature:** Module 7 — Skills: Reusable Intelligence
**Status:** Done

## Traceability
- **Feature:** `docs/04-implementation/features/module-7-skills/feature.md`
- **Syllabus section:** Module 7 (retention)

## Description

Build the flashcard deck for Module 7. Flashcards cover vocabulary and key distinctions that learners need to recall when authoring skills in the wild.

## Acceptance Criteria

- Given a learner opens the Module 7 flashcard page, there are at least 12 flashcard pairs covering key terms and distinctions from the lesson.
- Given a learner flips a card, the back provides a clear, concise answer that reinforces understanding rather than just a definition.
- Given the deck includes a card on `disable-model-invocation`, the back explains when to use it (side-effect tasks you want to control manually).
- Given the deck includes a card on `context: fork`, the back explains what it does (isolated subagent, no access to conversation history).
- Given the deck includes a card on the description field, the back explains its dual role (discovery by Claude AND what the learner sees in autocomplete).
- Given the page loads, it is auth-protected and has the account widget and feedback widget.

## Test Mapping

| Criterion | Test Layer | Test Location |
|---|---|---|
| Flashcard page is listed as a resource for module 7 in course data | Contract | `tests/resource-check.test.js` |
| Flashcard page is auth-protected | Contract | `tests/auth-protection.contract.test.js` |

## Tasks

- [ ] Create `subjects/claude-code/module-7-flashcards.html` following module-6-flashcards.html as the structural template.
- [ ] Write at least 12 front/back pairs covering: skill, SKILL.md, description field, disable-model-invocation, user-invocable, allowed-tools, $ARGUMENTS, dynamic context injection, context: fork, supporting files, skill compaction behavior, personal vs. project skill location, bundled skills.
- [ ] Wire in `auth-guard.js`, `auth-account.js`, `feedback-widget.js`, and `version.js`.
- [ ] Add the resource entry to the course data file.
- [ ] Add the page to `tests/auth-protection.contract.test.js`.

## Notes

- Flashcard backs should be 1–3 sentences max. If it needs more, the concept is better explained in the lesson.
- Prioritize distinctions that trip learners up: skills vs. CLAUDE.md, disable-model-invocation vs. user-invocable, description (always loaded) vs. body (on-demand).
