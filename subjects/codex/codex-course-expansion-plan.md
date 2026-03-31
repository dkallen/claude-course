# Plan for Expanding the Course Architecture Beyond Claude Code

**Date:** March 24, 2026
**Target new subject:** OpenAI Codex
**Scope of this pass:** Plan the architecture shift, keep the current Claude course working, and add one Codex module to prove the pattern.

---

## Why the Current Structure Needs a Small Architectural Shift

The current project works well for a single subject, but it is optimized around one course living in a flat file namespace:

- `course.html` and `index.html` embed Claude-specific module metadata directly in page scripts.
- The syllabus, README, session notes, and module pages all repeat course structure in slightly different forms.
- File names such as `module-1-lesson.md` assume there is only one module 1 in the whole repository.
- The course shell currently has no notion of a **subject**, only a list of modules.

That is fine for one course. It becomes fragile as soon as the repo needs:

- multiple subjects
- overlapping module numbers
- different pedagogical shapes per subject
- reusable infrastructure with different content sets

---

## Recommended Direction

Do **not** do a full migration immediately. Use a staged approach:

### Phase 1: Prove the Multi-Subject Shape Additively

Keep the existing Claude course untouched.

Add new subject-specific artifacts with explicit prefixes:

- `codex-course-syllabus.md`
- `codex-module-1-lesson.md`
- `codex-module-1-index.html`

This pass proves:

- the repo can hold more than one subject
- a second course can keep the same overall learning rhythm
- the content voice still works outside Claude Code

### Phase 2: Introduce a Shared Subject Manifest

After the Codex module feels right, extract hardcoded course metadata into data files.

Recommended structure:

```text
courses/
  claude-code/
    course.json
    syllabus.md
    modules/
      01/
        lesson.md
        index.html
        exercise.md
        quiz.html
  openai-codex/
    course.json
    syllabus.md
    modules/
      01/
        lesson.md
        index.html
```

Each `course.json` should define:

- course title
- subtitle
- subject slug
- module list
- module checks
- resource labels and ordering
- phase groupings

This removes duplicated metadata from:

- `course.html`
- `index.html`
- README-style summaries

### Phase 3: Convert the Course Shell Into a Subject Shell

Refactor `course.html` and `index.html` so they load one selected subject rather than assuming Claude.

The shell should support:

- a subject picker on the home page
- subject-specific module lists
- per-subject progress keys in localStorage
- consistent rendering of module phases/resources from manifest data

### Phase 4: Standardize Content Taxonomy

The current material mix is strong, but it should become a taxonomy rather than a hardcoded file expectation.

Recommended resource types:

- `lesson`
- `exercise`
- `reference`
- `quiz`
- `flashcards`
- `diagram`
- `slides`
- `tool`
- `index`

Not every subject or module needs every type. The manifest should decide which appear.

---

## Information That Should Be Rearranged

These are the main content responsibilities that should eventually move:

### 1. Course structure data

Move from embedded JavaScript arrays into a subject manifest.

### 2. Course-level narrative

Keep in subject-specific syllabus files instead of mixing it into the global README.

### 3. Module numbering

Scope module numbers to a subject. Avoid repo-global names like `module-1-*` long term.

### 4. Session notes

Split notes into:

- infra notes
- Claude course notes
- Codex course notes

This will make future authoring less confusing.

---

## Proposed OpenAI Codex Course Shape

The Codex course should not be a clone of the Claude course. It should preserve the same strengths:

- practical
- environment-aware
- exercise-driven
- honest about strengths and failure modes

But it should teach the actual Codex stack:

- Codex app
- Codex IDE extension in VS Code
- Codex CLI where needed for shared mental model
- `AGENTS.md`
- `config.toml`
- approvals and sandboxing
- planning, review, MCP, skills, automations

Recommended initial module sequence:

1. Orientation — What Codex Is and Where It Runs
2. `AGENTS.md` — Durable Guidance for Codex
3. Prompting and Planning
4. Permissions, Sandboxing, and Trust Boundaries
5. Working Inside VS Code
6. Review, Testing, and Git Checkpoints
7. Config and Personal Defaults
8. MCP and External Context
9. Skills and Reusable Workflows
10. Automations and Longer-Running Work
11. Codex Cloud and Remote Delegation
12. Capstone

---

## What This First Codex Module Should Prove

The first module should answer four questions:

1. Does the current course voice still work for a different tool?
2. Does the learning flow still make sense when the environments are Codex app + VS Code instead of Claude Code?
3. Is the course better as a family of subjects rather than one giant Claude-specific structure?
4. What parts of the shell actually need generalization versus staying hand-authored?

If the answer is yes, the next implementation step is not “write all Codex modules.” It is:

- introduce a manifest format
- migrate one subject shell page to use it
- then keep adding Codex modules

---

## Deliverables in This Pass

This pass should include:

- a course-expansion plan
- a Codex course syllabus
- a fully drafted Codex Module 1 lesson
- a lightweight Codex Module 1 index page showing the intended module shape

It should **not** include:

- a full migration of the Claude course
- all Codex modules
- a full data-driven rendering system

---

## Recommended Next Build Step After Review

If this direction feels right, the next implementation pass should:

1. Create a `courses/` directory structure.
2. Move the new Codex files under `courses/openai-codex/`.
3. Define the first `course.json` manifest shape.
4. Update one shell page to render from manifest data.
5. Migrate the existing Claude course only after the manifest shape is stable.
