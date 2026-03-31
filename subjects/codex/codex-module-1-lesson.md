# Module 1: Orientation — What Codex Is and Where It Runs

**Working Effectively with OpenAI Codex — A Practitioner's Course**

---

## Why This Module Matters

Before you can use Codex well, you need a clean mental model of what exactly you're using. Most early frustration with coding agents comes from mixing up three different things:

- where the agent is running
- what it can access
- how much freedom you've given it

If those stay blurry, every surprising behavior feels mysterious. This module fixes that.

By the end, you should be able to explain what Codex is across the app and the VS Code extension, what the local agent can do on your machine, where sandboxing and approvals fit, and why setup quality matters as much as prompt quality.

---

## 1. Codex Is Not One Surface

Codex is one product family with multiple ways to work:

- the **Codex app**
- the **Codex IDE extension** in VS Code
- the **Codex CLI**
- **Codex cloud** in the browser

These are related, but they are not identical experiences.

The most important distinction is this:

- **Codex local** means the agent runs on your machine.
- **Codex cloud** means the agent runs remotely in a hosted environment.

OpenAI's Codex docs explicitly group the app, CLI, and IDE extension together as **Codex local**. That matters because the same basic trust model applies across those surfaces: the agent is operating against your local project under local permissions and sandbox rules.

So when you use the **Codex app** or the **VS Code extension**, you're not just chatting in a prettier wrapper. You're using a local coding agent that can inspect files, run commands, and make changes within the boundary you've allowed.

---

## 2. The Two Surfaces That Matter Most for This Course

This course centers on:

- the **Codex app**
- the **Codex extension in VS Code**

Why those two?

Because they cover the two most common working styles.

### The Codex App

The app is the cleanest way to understand Codex as a standalone coding environment. You pick a project, choose whether you're working locally, and start assigning tasks. It is good for focused work because the agent has a strong identity: this is the project, this is the thread, this is the task.

The app also makes some concepts easier to see:

- permission mode
- diffs and review flow
- project selection
- automations and worktrees later in the course

### The VS Code Extension

The VS Code extension matters because this is where coding agents either become part of your real workflow or stay a novelty. In the editor, the distance between "ask" and "inspect" is much shorter. You can see the files, the diff, the terminal, and the results without context-switching away from your normal work.

According to the current OpenAI docs, the IDE extension uses the Codex CLI under the hood. That is important because it means the extension is not some unrelated product. It is another surface over the same underlying local Codex behavior, and some important defaults are shared through `~/.codex/config.toml`.

### Why We Still Mention the CLI

Even though this course is centered on the app and VS Code, you need a basic CLI mental model because:

- the extension relies on the CLI
- many settings are shared across surfaces
- the CLI gives you the clearest view of what the agent is actually doing

You do not need to become a terminal maximalist. But you do need to know the CLI exists and that it anchors a lot of the local behavior.

---

## 3. Local Codex Means Real Action, Not Draft Suggestions

One of the biggest mindset shifts is this: Codex is not limited to generating code snippets for you to copy around.

In local mode, Codex can:

- read your repository
- edit files
- run commands
- use configured tools
- review diffs

That is why OpenAI's quickstart examples for the app, IDE, and CLI all look like real project work: "Tell me about this project," "Build a classic Snake game in this repo," "Find and fix bugs in my codebase with minimal, high-confidence changes."

This is also why Git discipline matters immediately. When the agent can make real changes, you need a clean habit of creating checkpoints before and after meaningful tasks. Not because Codex is uniquely reckless, but because any tool with write access deserves a reversible workflow.

---

## 4. Sandboxing and Approvals: The Real Trust Model

When people say they "trust" a coding agent, that can mean two very different things:

- trust in the model's judgment
- trust in the system's boundaries

Those are not the same.

OpenAI's sandboxing docs make the distinction clear:

- the **sandbox** defines the technical boundary
- the **approval policy** decides when Codex must stop and ask

This is one of the most important concepts in the whole course.

### What Sandboxing Does

Sandboxing is the enforced limit around what Codex can do on its own when it runs local commands in the app, IDE extension, or CLI.

That limit applies not just to file edits, but also to spawned commands like:

- `git`
- test runners
- package managers
- local scripts

If a command runs, it inherits the same boundary.

### Common Sandbox Modes

OpenAI currently documents three common sandbox modes:

- `read-only`
- `workspace-write`
- `danger-full-access`

The practical meaning is straightforward:

- `read-only`: inspect, but don't change
- `workspace-write`: do normal local work inside the project boundary
- `danger-full-access`: remove the protective boundary

For most learning and normal development, `workspace-write` is the sane default.

### Approval Policies

OpenAI currently documents these common approval policies:

- `untrusted`
- `on-request`
- `never`

This answers a different question: when should Codex interrupt and ask?

That means you should stop thinking in fuzzy terms like "safe mode" and start thinking in operational terms:

- What can Codex touch?
- What commands can it run?
- When does it need me to approve?

That is the real trust model.

---

## 5. Setup Quality Is Part of Prompt Quality

OpenAI's best-practices guide makes a point that is easy to underestimate: many apparent "AI quality" problems are actually setup problems.

Wrong project directory. Missing write access. Bad defaults. Missing tools. Missing guidance. Poor verification instructions. All of these can make Codex look worse than it is.

This is why the course should teach setup early, not as an advanced topic.

The major durable setup layers are:

- `AGENTS.md`
- `~/.codex/config.toml`
- optional project-level `.codex/config.toml`

### `AGENTS.md`

`AGENTS.md` is where you tell Codex how to work in a repository: layout, commands, conventions, constraints, and what "done" means.

If Claude Code's equivalent concept was "teach Claude who you are," the Codex version is "teach Codex how this repository works."

OpenAI's docs recommend putting practical information there:

- repo layout
- build, test, and lint commands
- engineering conventions
- constraints
- verification expectations

This matters because a coding agent without durable guidance keeps forcing you to restate your standards in every prompt.

### `config.toml`

The shared `~/.codex/config.toml` file is where stable behavior lives across the app, IDE extension, and CLI.

This is where Codex becomes consistent:

- model defaults
- reasoning effort
- sandbox mode
- approval policy
- MCP setup
- profiles

That last part matters a lot for VS Code users. Some behavior that looks like an "editor setting" is actually governed by shared Codex config instead.

---

## 6. Prompting Still Matters, But Not the Way Beginners Think

Beginners often assume the main challenge is learning special magic wording. That is not the real unlock.

OpenAI's best-practices guidance is more grounded. A strong default prompt has four parts:

- Goal
- Context
- Constraints
- Done when

That is already enough to get materially better results.

So the first lesson is not "become a prompt poet." It is:

1. pick the right surface
2. make sure Codex is in the right project
3. give it durable repo guidance
4. set sane permissions
5. then prompt clearly

Good prompting matters. But good prompting sitting on top of a bad setup is still bad.

---

## 7. The App and VS Code Have Different Workflow Advantages

If the underlying local model is shared, why use one surface over the other?

Because workflow shape matters.

### Use the App When

- you want a more deliberate, task-oriented environment
- you want to think in project/thread/task terms
- you want a clean place to inspect progress and diffs
- you plan to use app-specific features later, like automations

### Use VS Code When

- you are already deep in implementation
- you want the shortest path between prompt, code, terminal, and diff
- you care about staying inside your editor loop
- you want Codex embedded in normal development flow

The right question is not "which one is better?" It is "which one creates less friction for this kind of work?"

---

## 8. A Good Beginner Mental Model

Here is the mental model I want you to keep:

Codex is a coding agent that can work across multiple surfaces. In the app and VS Code extension, you are usually working with **Codex local**, which means the agent is operating on your machine under sandbox and approval constraints. Its quality depends not just on prompts, but on project context, durable instructions, configuration, and verification habits.

If you keep that model in your head, a lot of later topics stop feeling like random features:

- `AGENTS.md` is durable guidance
- `config.toml` is durable behavior
- permissions are your trust boundary
- Git checkpoints are your recovery plan
- prompts are how you aim the agent at a specific task

That is the foundation.

---

## Tying It Together

The goal of Module 1 is not mastery. It is orientation.

You should leave this module understanding:

- Codex is a multi-surface product, not a single chat box
- the app and VS Code extension are both local-agent workflows
- sandboxing and approvals are separate controls
- setup quality strongly affects outcome quality
- durable guidance and configuration matter before advanced prompting does

Once that is solid, Module 2 can tackle `AGENTS.md`, which is where Codex starts becoming a tool shaped to your workflow instead of a generic assistant.

---

## Check

Can you explain, in your own words:

- the difference between Codex local and Codex cloud
- the difference between sandboxing and approvals
- why `AGENTS.md` and `config.toml` matter even before advanced prompting

If yes, you're ready for Module 2.

---

## Source Notes

This module is grounded in current OpenAI Codex docs, especially:

- Quickstart: app, IDE, CLI, and cloud setup
- Best practices: goal/context/constraints/done-when, `AGENTS.md`, config, review habits
- Sandboxing: the boundary model and approval relationship
- IDE settings: shared CLI/config behavior for the VS Code extension
