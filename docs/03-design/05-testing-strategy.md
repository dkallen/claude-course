# Testing Strategy: Claude Course Platform

**Date:** 2026-04-04
**Status:** Draft — awaiting approval
**Design Package Reference:** [design-iam-persistence-feedback.md](design-iam-persistence-feedback.md)

---

## Test Layers

This project uses three test layers. It does not use performance testing (low traffic, < 50 users) or full end-to-end testing against a live Supabase instance (deferred until deployment — see Constraints).

### Layer: Unit

- **Purpose:** Verify pure functions and data transformations in isolation. Covers logic in `course-logic.js`, data integrity in `course-data.js`, and resource page structure validation.
- **Tool:** `node --test` (Node.js built-in test runner, no dependencies).
- **Runs when:** Inner-loop TDD — every Red-Green-Refactor cycle during development. Also runs on `npm test`.
- **Does not cover:** DOM behavior, cross-component interactions, browser state, Supabase calls.

### Layer: Contract

- **Purpose:** Verify that two or more components agree on shared conventions — localStorage key patterns, data attribute names, resource ID formats, sub-key naming. These tests parse source code to detect agreement without needing a browser.
- **Tool:** `node --test` (same runner, CJS modules that read source files).
- **Runs when:** Before commit. Also runs on `npm test`.
- **Does not cover:** Runtime behavior. Contract tests confirm that the code *says* the same thing in two places — not that it *works* at runtime. That's the smoke layer's job.

### Layer: Smoke (End-to-End)

- **Purpose:** Verify user-facing workflows in a real browser against the local dev server. This is the only layer that catches integration bugs like stale state across tabs, DOM rendering issues, auth flow problems, and Supabase read/write failures.
- **Tool:** Playwright (headless Chromium). First Node dev dependency in the project.
- **Runs when:** Outer-loop TDD — a failing smoke test is written from an acceptance criterion before inner-loop unit/contract TDD begins. Run before merge and on `npm test`. Requires `npm start` (local dev server on port 8080).
- **Does not cover:** Performance, visual/layout correctness, real OAuth flows (tests use email/password or mock auth).

---

## Test Execution Workflow

1. **Inner-loop TDD:** Run unit tests on each Red-Green-Refactor cycle (`node --test tests/<file>`).
2. **Before commit:** Run full suite — `npm test` (unit + contract + smoke).
3. **Smoke tests require local dev server:** `npm start` must be running on port 8080. Playwright launches headless Chromium against it.

---

## Constraints and Tradeoffs

- **Playwright is the first Node dev dependency.** This is a deliberate tradeoff — without it, Claude has no way to verify browser behavior, and the human becomes the test runner. The alternative (no smoke tests) was tried and produced the stale-notes bug that went undetected through 285 passing unit/contract tests.
- **No live Supabase in tests.** Smoke tests run against the local dev server with Supabase configured for localhost. Tests that write data use a test user account. This means we are testing the real Supabase client SDK but against the actual Supabase project (free tier). If this becomes a problem (rate limits, data pollution), we'll add a test-specific Supabase project.
- **Offline fallback is manual.** Simulating network failure in Playwright is possible but adds complexity. For v1, offline localStorage fallback is verified by contract tests (key agreement) and manual testing. Recorded as intentional technical debt.
- **OAuth flows are not smoke-tested.** Google and GitHub OAuth require real credentials and redirect flows that don't work in headless browsers without mocking the provider. Email/password auth is tested; OAuth is manual. This is acceptable because OAuth is a Supabase-managed flow, not custom code.
