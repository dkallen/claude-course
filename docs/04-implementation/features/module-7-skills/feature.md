# Feature: Module 7 — Skills: Reusable Intelligence

**Date:** 2026-04-15
**Status:** Done

## Traceability
- **Syllabus Module:** 7 — Skills: Reusable Intelligence
- **Depends on:** Module 6 (TDD) content patterns; auth guard rollout (complete)

## Background

Skills are the primary "reusable intelligence" mechanism in Claude Code. A skill is a directory containing a `SKILL.md` file (and optional supporting files) that packages a domain-specific playbook for Claude to apply on demand. Skills follow the open [Agent Skills](https://agentskills.io) standard and are available across Claude Code, claude.ai, and the Claude API.

Key facts from the October 2025 launch and subsequent updates that inform this module's scope:

- Skills load on-demand: only the description (~100 tokens) is in context at startup; the full body enters only when the skill is invoked.
- The YAML frontmatter controls invocation (auto vs. manual), tool permissions, model/effort overrides, subagent execution, and path-scoping.
- Dynamic context injection (`` !`command` `` syntax) runs shell commands before the skill content reaches Claude.
- Skills survive compaction: the most recently invoked skills are re-attached after auto-compaction (5,000 tokens each, 25,000 tokens combined budget).
- Bundled skills (`/simplify`, `/debug`, `/loop`, `/batch`, `/claude-api`) ship with Claude Code and are good worked examples.
- Custom commands (`.claude/commands/`) have been merged into skills — same format, skills add more features.

This module teaches learners to write, test, and iterate on skills for their own domain work.

## Acceptance Criteria

- Given a learner completes this module, they can create a working personal skill from scratch without referring to external documentation.
- Given a learner creates a skill with `disable-model-invocation: true`, Claude does not trigger it automatically and only responds to the `/skill-name` slash command.
- Given a learner creates a skill without `disable-model-invocation`, Claude loads it automatically when the learner describes a relevant task.
- Given a learner invokes a skill with arguments (`/skill-name arg1 arg2`), the skill receives those arguments via `$ARGUMENTS` and the output reflects them.
- Given a learner's skill uses the `` !`command` `` syntax, the shell output is visible in Claude's response (i.e., Claude received live data, not the placeholder).
- Given a learner adds `context: fork`, the skill runs in an isolated subagent and the main conversation history is not visible to it.
- Given a learner adds supporting files alongside `SKILL.md`, Claude reads only the files it needs for the specific task rather than loading all of them upfront.

## Test Mapping

| Criterion | Test Layer | Test Location |
|---|---|---|
| Skills section renders correctly with new content | Contract | `tests/resource-check.test.js` |
| Module 7 lesson page loads and is auth-protected | Smoke | `tests/smoke/auth-guard.spec.js` |

## Stories

- [x] [Story 1: Module 7 lesson page](stories/story-001-lesson.md)
- [x] [Story 2: Module 7 reference page](stories/story-002-reference.md)
- [x] [Story 3: Module 7 exercise page](stories/story-003-exercise.md)
- [x] [Story 4: Module 7 quiz](stories/story-004-quiz.md)
- [x] [Story 5: Module 7 flashcards](stories/story-005-flashcards.md)
- [x] [Story 6: Module 7 index and course shell wiring](stories/story-006-index-and-wiring.md)

## Retrospective

- [ ] `retrospective.md` exists inside the feature folder and is based on `retrospective-template.md`

## Release Notes

Module 7 — Skills: Reusable Intelligence is complete. Learners can now study how to create, configure, and iterate on custom skills for Claude Code. The module covers skill anatomy, invocation control, arguments, dynamic context injection, subagent execution, supporting files, and compaction behavior across a lesson, guided exercise, quiz, flashcard deck, reference page, and module index.
