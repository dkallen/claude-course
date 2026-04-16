# Story 2: Module 7 reference page

**Feature:** Module 7 — Skills: Reusable Intelligence
**Status:** Done

## Traceability
- **Feature:** `docs/04-implementation/features/module-7-skills/feature.md`
- **Syllabus section:** Module 7 (reference material)

## Description

Build the reference page for Module 7. This is the lookup surface: complete frontmatter field table, string substitution reference, invocation control decision table, skill directory structure, and bundled skills list. Learners will return to this page when authoring skills, not read it linearly.

## Acceptance Criteria

- Given a learner opens the Module 7 reference page, they can find the complete frontmatter field table (name, description, when_to_use, argument-hint, disable-model-invocation, user-invocable, allowed-tools, model, effort, context, agent, hooks, paths, shell) with type and description for each.
- Given a learner opens the reference page, they can find the string substitution table (`$ARGUMENTS`, `$ARGUMENTS[N]`, `$N`, `${CLAUDE_SESSION_ID}`, `${CLAUDE_SKILL_DIR}`).
- Given a learner opens the reference page, they can find the invocation control decision table showing the combinations of `disable-model-invocation` and `user-invocable` and what each means.
- Given a learner opens the reference page, they can find the canonical skill directory structure showing `SKILL.md` plus optional supporting files.
- Given a learner opens the reference page, they can find the list of bundled skills with a one-line description of each.
- Given a learner opens the reference page, they can find the skill location precedence table (enterprise > personal > project > plugin).
- Given the page loads, it is auth-protected and has the account widget, notes widget, and feedback widget.

## Test Mapping

| Criterion | Test Layer | Test Location |
|---|---|---|
| Reference page is listed as a resource for module 7 in course data | Contract | `tests/resource-check.test.js` |
| Reference page is auth-protected | Contract | `tests/auth-protection.contract.test.js` |

## Tasks

- [ ] Create `subjects/claude-code/module-7-reference.html` following module-6-reference.html as the structural template.
- [ ] Include complete frontmatter field table sourced from the current Claude Code docs.
- [ ] Include string substitution reference.
- [ ] Include invocation control decision table (the 3-row table from the docs).
- [ ] Include skill directory structure diagram.
- [ ] Include bundled skills list.
- [ ] Include skill location precedence table.
- [ ] Wire in `auth-guard.js`, `auth-account.js`, `notes-widget.js`, `feedback-widget.js`, and `version.js`.
- [ ] Add the resource entry to the course data file.
- [ ] Add the page to `tests/auth-protection.contract.test.js`.

## Notes

- Source of truth for the frontmatter table is `code.claude.com/docs/en/skills` — verify all fields before writing.
- Keep prose minimal. This page is for scanning, not reading.
- The three-row invocation control table (default / disable-model-invocation / user-invocable) is the single most practically useful table in the docs — make it prominent.
