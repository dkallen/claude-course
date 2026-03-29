# Working Effectively with OpenAI Codex
### A Practitioner's Course

**Author:** David (with Codex)
**Version:** Draft 0.1 — March 2026
**Format:** Self-paced, exercise-driven, interactive

---

## Course Philosophy

This course teaches you how to use OpenAI Codex as a practical software partner, not as a magic box. The focus is not just "what buttons exist" but how to build a reliable working relationship with Codex across the surfaces that matter most for day-to-day development:

- the **Codex app**
- the **Codex extension in VS Code**
- the shared mental model that also applies to the **CLI**

The course is built around a simple principle: Codex is most useful when you treat it like a configured teammate. That means understanding where it runs, what it can access, how approvals and sandboxing constrain it, how durable guidance works, and how to structure work so the results are easy to verify.

---

## Prerequisites

- Access to OpenAI Codex through ChatGPT or an OpenAI API key
- Basic comfort with Git and a code editor
- A small project folder you can safely experiment in
- No prior Codex experience required

---

## Table of Contents

| # | Module | Focus |
|---|--------|-------|
| 1 | Orientation — What Codex Is and Where It Runs | App, VS Code extension, CLI, local vs cloud, approvals |
| 2 | `AGENTS.md` — Teaching Codex How You Work | Durable instructions, repo conventions, verification |
| 3 | Prompting and Planning | Goal/context/constraints/done-when, Plan mode |
| 4 | Permissions and Sandboxing | Trust boundaries, approval modes, safe autonomy |
| 5 | VS Code Workflows | Editor-native loops, checkpoints, review habits |
| 6 | Testing, Review, and Git Discipline | Verification, `/review`, diff-first habits |
| 7 | `config.toml` and Personal Defaults | Shared settings across app, IDE, and CLI |
| 8 | MCP — Giving Codex External Context | Tools, systems, and live information |
| 9 | Skills — Reusable Workflows | Packaging recurring work into durable instructions |
| 10 | Automations and Longer-Running Work | Scheduled work, background execution, stable loops |
| 11 | Codex Cloud and Delegated Tasks | Browser-based tasks, environments, PR workflows |
| 12 | Capstone | Use Codex end to end on a real project |

---

## Module 1: Orientation — What Codex Is and Where It Runs

**Goal:** Build a correct mental model of Codex before you start trusting it with real work.

### Key Concepts

- Codex runs across multiple surfaces: app, IDE extension, CLI, and cloud
- The app, VS Code extension, and CLI share a common local agent model
- Sandboxing and approvals define the trust boundary for local work
- `AGENTS.md` and `config.toml` are how Codex becomes consistent over time
- Git checkpoints and verification matter because Codex can make real changes

### Exercise

Use either the Codex app or the VS Code extension on a small project. Ask Codex to explain the project, then ask it to make a small low-risk change. Observe what it can do automatically, where it pauses for approval, and how the experience differs from a normal chat assistant.

### Check

Can you explain the difference between:

- local Codex and cloud Codex
- sandboxing and approvals
- durable guidance (`AGENTS.md`, config) and one-off prompting

If yes, move on.

---

## Build Notes

This syllabus is intentionally lighter than the Claude course syllabus. It exists to define the shape of the second subject without prematurely drafting every module in full. Module 1 is the only module that should be fully written in this pass.
