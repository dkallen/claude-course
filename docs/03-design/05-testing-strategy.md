# Testing Strategy: Claude Course Platform

**Date:** 2026-04-05
**Status:** Draft — awaiting approval
**Design Package Reference:** [design-iam-persistence-feedback.md](design-iam-persistence-feedback.md)

---

## Test Layers

This project uses three test layers. It does not use performance testing (low traffic, < 50 users) or full end-to-end testing against a live production deployment (deferred until deployment — see Constraints).

### Layer: Unit

- **Purpose:** Verify pure functions and data transformations in isolation. Covers logic in `course-logic.js`, data integrity in `course-data.js`, grouped notes view-model generation, and resource page structure validation.
- **Tool:** `node --test` (Node.js built-in test runner, no dependencies).
- **Runs when:** Inner-loop TDD — every Red-Green-Refactor cycle during development. Also runs on `npm test`.
- **Does not cover:** DOM behavior, cross-component interactions, browser state, Supabase calls.

### Layer: Contract

- **Purpose:** Verify that two or more components agree on shared conventions — data attribute names, resource ID formats, module/resource relationships, and architectural constraints such as keeping note editing off the module overview and removing note-related `localStorage` persistence paths.
- **Tool:** `node --test` (same runner, CJS modules that read source files).
- **Runs when:** Before commit. Also runs on `npm test`.
- **Does not cover:** Runtime behavior. Contract tests confirm that the code *says* the same thing in two places — not that it *works* at runtime. That's the smoke layer's job.

### Layer: Smoke (End-to-End)

- **Purpose:** Verify user-facing workflows in a real browser against the local dev server. This is the layer that catches integration bugs like auth flow problems, Supabase read/write failures, grouped module-overview note rendering, and resource-page note editing.
- **Tool:** Playwright (headless Chromium). First Node dev dependency in the project.
- **Runs when:** Outer-loop TDD — a failing smoke test is written from an acceptance criterion before inner-loop unit/contract TDD begins. Run before merge and on `npm test`. Requires `npm start` (local dev server on port 8080).
- **Does not cover:** Performance, visual/layout polish, real OAuth flows (tests use email/password or mock auth).
- **Operational note:** Run smoke tests against Playwright's bundled Chromium, not the installed `Google Chrome.app`. Automation-controlled Chrome can surface a stripped-down browser window, disable normal Google sign-in, and confuse profile behavior outside the test run.

---

## Test Execution Workflow

1. **Inner-loop TDD:** Run unit tests on each Red-Green-Refactor cycle (`node --test tests/<file>`).
2. **Before commit:** Run full suite — `npm test` (unit + contract + smoke).
3. **Smoke tests require local dev server:** `npm start` must be running on port 8080. Playwright launches headless Chromium against it.

---

## Constraints and Tradeoffs

- **Playwright is the first Node dev dependency.** This is a deliberate tradeoff — without it, Claude has no way to verify browser behavior, and the human becomes the test runner.
- **Browser choice matters.** Even when smoke coverage is local-only, using an installed daily-driver browser for automation can leak confusing side effects into normal browsing sessions. This project standardizes on Playwright's bundled Chromium for smoke coverage.
- **Supabase is the note source of truth.** Notes are intentionally tested as an online, Supabase-backed workflow rather than an offline-capable dual-store workflow.
- **No note-related `localStorage` fallback.** This is an explicit product simplification. The project is web-first, not offline-first, and the testing strategy should reinforce that by validating database-backed behavior rather than local fallback behavior.
- **No live production deployment in tests.** Smoke tests run against the local dev server with Supabase configured for localhost. Tests that write data use a test user account. This means we are testing the real Supabase client SDK but not a production deployment.
- **OAuth flows are not smoke-tested.** Google and GitHub OAuth require real credentials and redirect flows that don't work in headless browsers without mocking the provider. Email/password auth is tested; OAuth is manual. This is acceptable because OAuth is a Supabase-managed flow, not custom code.
