---
name: tdd-implementation
description: Apply strict Test-Driven Development (TDD) and Design by Contract principles to build or extend software. Use this for all Stage 4 Implementation tasks.
---
# TDD & Implementation Skill

## Core Workflow: Red-Green-Refactor
Follow this cycle strictly. Do NOT write implementation before a failing test exists.

1. **Red:** Write a minimal failing test for the next requirement. Confirm it fails before proceeding.
2. **Green:** Write the absolute simplest code to make the test pass.
3. **Refactor:** Clean up duplication and structure. Behavior must remain unchanged, and all tests must remain green.

## Rules of Engagement
- **One Behavior Per Test:** Keep cycles small and focused.
- **Design by Contract:** Use strong preconditions at module boundaries and clear postconditions.
- **Fail Fast:** Implement guard clauses and assertions to catch contract violations immediately.
- **Minimalist Implementation:** Only satisfy the current test; avoid "anticipatory" coding.

## Technical Standards
- **Dependencies:** Justify every new library. Prefer well-maintained, standard-compliant options.
- **Technical Debt:** If a shortcut is taken, record it immediately in the debt log with a repayment trigger.
- **Version Control:** Work in feature branches. Commit frequently. Squash merge for a clean, unit-of-work history.

## Definition of Done (DoD)
A feature is complete only when:
1. All tests pass (Unit, Integration, Contract).
2. Code passes automated review for style and syntax.
3. Feature traces directly back to a solution in the GPSR analysis.
4. Technical debt is intentionally logged.

## Artifact: Implementation Checkpoint
Present these findings to the human at each milestone:
- Summary of built features vs. GPSR solutions.
- Test coverage summary.
- Updated Technical Debt log.